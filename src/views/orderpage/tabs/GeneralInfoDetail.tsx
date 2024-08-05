import React from "react";

interface GeneralInfoDetailProps {
  data: {
    receiveName: string;
    receivePhone: string;
    note: string;
    address: string;
    img: string;
    shipDate: Date;
    orderDate: Date;
    totalPrice: number;
    status: string;
    weeklyPlan: string | null;
  };
}

const GeneralInfoDetail: React.FC<GeneralInfoDetailProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {/* Image Section */}
      <div className="flex items-center justify-center">
        <img
          src={data.img}
          alt="Order Image"
          className="object-cover w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-bold">Order Details</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-semibold">Receive Name:</div>
          <div className="font-normal">{data.receiveName}</div>

          <div className="font-semibold">Receive Phone:</div>
          <div className="font-normal">{data.receivePhone}</div>

          <div className="font-semibold">Note:</div>
          <div className="font-normal">{data.note}</div>

          <div className="font-semibold">Address:</div>
          <div className="font-normal">{data.address}</div>

          <div className="font-semibold">Ship Date:</div>
          <div className="font-normal">
            {new Date(data.shipDate).toLocaleDateString()}
          </div>

          <div className="font-semibold">Order Date:</div>
          <div className="font-normal">
            {new Date(data.orderDate).toLocaleDateString()}
          </div>

          <div className="font-semibold">Total Price:</div>
          <div className="font-normal">
            {data.totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>

          <div className="font-semibold">Status:</div>
          <div className="font-normal">{data.status}</div>

          {data.weeklyPlan && (
            <>
              <div className="font-semibold">Weekly Plan:</div>
              <div className="font-normal">{data.weeklyPlan}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoDetail;
