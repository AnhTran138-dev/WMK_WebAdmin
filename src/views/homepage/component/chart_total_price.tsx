import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import isBetween from "dayjs/plugin/isBetween";
import { Response, Order } from "../../../models/responses";
import DataRender from "../../../components/data_render";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { Button } from "@/components/ui";
import ChartAlertDialog from "./chart_modal";
import ChangeDisplay from "./change_display";
import dayjs from "dayjs";

dayjs.extend(isBetween);

interface ChartData {
  xAxis: string[];
  series: { data: number[]; area: boolean }[];
}

const ChartTotalPrice = () => {
  const [chartData, setChartData] = useState<ChartData>({
    xAxis: [],
    series: [],
  });

  const [currentWeekTotal, setCurrentWeekTotal] = useState(0);
  const [previousWeekData, setPreviousWeekData] = useState<
    { day: string; value: number }[]
  >([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const {
    data: ordersResponse,
    loading,
    error,
  } = useFetch<Response<Order[]>>("/api/order/get-all");

  useEffect(() => {
    if (!ordersResponse?.data) return;
    if (ordersResponse.data.length === 0) return;
    if (ordersResponse === null || ordersResponse === undefined) return;

    if (ordersResponse) {
      const filteredOrders = ordersResponse?.data.filter(
        (order) => order.status === "Shipped" || order.status === "Delivered"
      );

      const currentWeekStart = dayjs().startOf("week").add(1, "day"); // Thứ Hai
      const currentWeekEnd = dayjs().endOf("week").subtract(1, "day"); // Chủ Nhật

      const previousWeekStart = currentWeekStart.subtract(1, "week");
      const previousWeekEnd = currentWeekEnd.subtract(1, "week");

      // Tạo một đối tượng để lưu tổng giá trị của mỗi ngày trong tuần
      const totalPerDay = Array(7).fill(0);
      const totalPerDayPrevWeek = Array(7).fill(0);

      let currentWeekTotalValue = 0;
      let previousWeekTotalValue = 0;

      filteredOrders.forEach((order) => {
        const orderDate = dayjs(order.orderDate);

        if (
          orderDate.isBetween(currentWeekStart, currentWeekEnd, "day", "[]")
        ) {
          const dayIndex = orderDate.day() - 1;
          totalPerDay[dayIndex] += order.totalPrice;
          currentWeekTotalValue += order.totalPrice;
        }

        if (
          orderDate.isBetween(previousWeekStart, previousWeekEnd, "day", "[]")
        ) {
          const dayIndex = orderDate.day() - 1;
          totalPerDayPrevWeek[dayIndex] += order.totalPrice;
          previousWeekTotalValue += order.totalPrice;
        }
      });

      setChartData({
        xAxis: Array(7)
          .fill(0)
          .map((_, index) =>
            dayjs().startOf("week").add(index, "day").format("ddd\nMMM D")
          ),
        series: [
          {
            data: totalPerDay,
            area: true,
          },
        ],
      });

      setCurrentWeekTotal(currentWeekTotalValue);
      setPreviousWeekData(
        totalPerDayPrevWeek.map((value, index) => ({
          day: dayjs()
            .startOf("week")
            .subtract(1, "week")
            .add(index, "day")
            .format("ddd, MMM D"),
          value,
        }))
      );
    }
  }, [ordersResponse]);

  const chartSeries = chartData.series[0];

  const previousWeekTotal = previousWeekData.reduce(
    (sum, entry) => sum + entry.value,
    0
  );

  const percentChange =
    previousWeekTotal === 0
      ? 100
      : ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  // const xAxisData = Array(7)
  //   .fill(0)
  //   .map((_, index) =>
  //     dayjs().startOf("week").add(index, "day").format("ddd, MMM D")
  //   );

  return (
    <DataRender isLoading={loading} error={error}>
      <div className="container flex flex-col flex-wrap items-center p-4 mx-auto lg:flex-row">
        <div className="flex-1 min-w-0 lg:w-[40%] p-2 mx-auto">
          <div className="p-4 rounded-md shadow-md">
            <h2 className="mb-2 text-lg font-semibold uppercase">
              Revenue Summary:
            </h2>
            <p>
              <strong className="mr-4"> All Total Revenue:</strong>{" "}
              {ordersResponse?.data
                ?.reduce((sum, order) => sum + order.totalPrice, 0)
                .toFixed(2)}
            </p>
            <p>
              <strong className="mr-4">Current Week Total:</strong>{" "}
              {currentWeekTotal?.toFixed(2)}
            </p>
            <p>
              <strong className="mr-4">Previous Week Total:</strong>
              {previousWeekTotal.toFixed(2)}
              <Button
                onClick={() => setIsAlertDialogOpen(true)}
                className="ml-4"
              >
                View Chart
              </Button>
            </p>
            <ChangeDisplay
              previousWeekTotal={previousWeekTotal}
              percentChange={percentChange}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 lg:w-[60%] p-2 mx-auto">
          <h1 className="mb-6 text-xl font-semibold text-center uppercase">
            Total Income Chart for the Current Week
          </h1>
          <div className="overflow-x-auto">
            <LineChart
              width={700}
              height={300}
              data={chartSeries?.data?.map((value, index) => ({
                day: chartData.xAxis[index],
                value,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={(tickItem) =>
                  dayjs(tickItem).format("ddd, MMM D")
                }
                tick={{ fontSize: 11 }}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="url(#gradientColor)"
                fillOpacity={0.3}
              />
              <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </div>
        </div>
      </div>
      <ChartAlertDialog
        open={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        data={previousWeekData}
      />
    </DataRender>
  );
};

export default ChartTotalPrice;
