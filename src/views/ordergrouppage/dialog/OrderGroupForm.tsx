import Map from "@/components/common/map";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { OrderGroupApi } from "@/features/order_group";
import useFetch from "@/hooks/useFetch";
import useFetchAddress from "@/hooks/useFetchAddress";
import Show from "@/lib/show";
import { OrderGroupRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { UserList } from "@/models/responses/user_list";
import { OrderGroupSchema } from "@/schemas/order_group";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const area = [
  { id: 1, name: "Quận 1", value: "Quận 1" },
  { id: 3, name: "Quận 3", value: "Quận 3" },
  { id: 4, name: "Quận 4", value: "Quận 4" },
  { id: 5, name: "Quận 5", value: "Quận 5" },
  { id: 6, name: "Quận 6", value: "Quận 6" },
  { id: 7, name: "Quận 7", value: "Quận 7" },
  { id: 8, name: "Quận 8", value: "Quận 8" },
  { id: 10, name: "Quận 10", value: "Quận 10" },
  { id: 11, name: "Quận 11", value: "Quận 11" },
  { id: 12, name: "Quận 12", value: "quan 12" },
  { id: 13, name: "Quận Bình Thạnh", value: "Bình Thạnh District" },
  { id: 14, name: "Quận Bình Tân", value: "binh tan district" },
  { id: 15, name: "Quận Gò Vấp", value: "go vap district" },
  { id: 16, name: "Quận Phú Nhuận", value: "Quận Phú Nhuận" },
  { id: 17, name: "Quận Tân Bình", value: "tan binh district" },
  { id: 18, name: "Quận Tân Phú", value: "tan phu dis" },
  { id: 19, name: "Quận Thủ Đức", value: "Thủ Đức" },
  { id: 20, name: "Huyện Bình Chánh", value: "Huyện Bình Chánh " },
  { id: 21, name: "Huyện Cần Giờ", value: "Can Gio District, ho" },
  { id: 22, name: "Huyện Củ Chi", value: "Huyện Củ Chi" },
  { id: 23, name: "Huyện Hóc Môn", value: "Huyện Hóc Môn" },
  { id: 24, name: "Huyện Nhà Bè", value: "Huyện Nhà Bè" },
];

interface OrderGroupFormProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
  orderGroup: OrderGroupRequest | null;
}

const OrderGroupForm: React.FC<OrderGroupFormProps> = ({
  orderGroup,
  onClose,
  refetch,
  onToast,
}) => {
  const [location, setLocation] = useState<string>("");

  const { data: users } = useFetch<Response<UserList[]>>("/api/user/get-all");
  const { data: options } = useFetchAddress(location);

  const form = useForm<z.infer<typeof OrderGroupSchema>>({
    defaultValues: {
      shipperId: orderGroup?.shipperId || "",
      location: orderGroup?.location || "",
      longitude: orderGroup?.longitude || 10.762622,
      latitude: orderGroup?.latitude || 106.660172,
    },
  });

  useEffect(() => {
    if (location.length > 0 && options.length > 0 && location === undefined) {
      form.setValue("longitude", options[0].properties.lon);
      form.setValue("latitude", options[0].properties.lat);
    }
  }, [location, options, form]);

  const onSubmit = async (values: z.infer<typeof OrderGroupSchema>) => {
    const response: Response<null> = orderGroup
      ? await OrderGroupApi.updateOrderGroup(orderGroup.id ?? "", values)
      : await OrderGroupApi.createOrderGroup(values);

    if (response.statusCode === 200) {
      onToast(true, response.message);
      refetch();
      onClose();
    } else {
      onToast(false, response.message);
    }
  };

  const handleChangeLocation = (location: string) => {
    const selectedLocation = area.find((area) => area.name === location)?.value;

    setLocation(selectedLocation || "");
    form.setValue("location", location);
  };

  useEffect(() => {
    if (orderGroup) {
      const selectdLocation = area.find(
        (area) => area.value === orderGroup.location
      )?.value;
      setLocation(selectdLocation || "");
    }
  }, [orderGroup]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {orderGroup ? "Edit Order Group" : "Create Order Group"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="relative flex flex-col gap-4 mb-6">
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="shipperId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Shipper</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipper" />
                        </SelectTrigger>
                        <SelectContent>
                          {users?.data.map((user) => (
                            <Show key={user.id}>
                              <Show.When
                                isTrue={
                                  user.role.toLowerCase() === "shipper" &&
                                  user.status === "Available"
                                }
                              >
                                <SelectItem value={user.id}>
                                  {user.userName}
                                </SelectItem>
                              </Show.When>
                            </Show>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="relative z-10 flex-1 space-y-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Regional location</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={handleChangeLocation}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select regional location" />
                          </SelectTrigger>
                          <SelectContent>
                            {area.map((area) => (
                              <SelectItem key={area.id} value={area.name}>
                                {area.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="z-0 mt-4 h-72">
              <Map
                id={options.length === 0 ? "" : options[0].properties.place_id}
              />
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-end gap-4 mt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{orderGroup ? "Update" : "Submit"}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default OrderGroupForm;
