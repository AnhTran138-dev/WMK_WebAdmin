import React from "react";
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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { OrderGroupApi } from "@/features/order_group";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import { OrderGroupRequest } from "@/models/requests";
import { Response, User } from "@/models/responses";
import { OrderGroupSchema } from "@/schemas/order_group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Map } from "@vis.gl/react-google-maps";

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
  const { data: users } = useFetch<Response<User[]>>("/api/user/get-all");

  const form = useForm<z.infer<typeof OrderGroupSchema>>({
    defaultValues: {
      shipperId: orderGroup?.shipperId || "",
      location: orderGroup?.location || "",
      longitude: orderGroup?.longitude || 10.762622,
      latitude: orderGroup?.latitude || 106.660172,
    },
  });

  const onSubmit = async (values: z.infer<typeof OrderGroupSchema>) => {
    let response: Response<null>;

    if (orderGroup) {
      response = await OrderGroupApi.updateOrderGroup(
        orderGroup.id ?? "",
        values
      );
    } else {
      response = await OrderGroupApi.createOrderGroup(values);
    }

    if (response.statusCode === 200) {
      onToast(true, response.message);
      refetch();
      onClose();
    } else {
      onToast(false, response.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {orderGroup ? "Edit Order Group" : "Create Order Group"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col gap-4 mb-6">
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
                                isTrue={user.role.toLowerCase() === "shipper"}
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
              <div className="flex-1 space-y-2">
                <Label>Location</Label>
              </div>
            </div>
            <div className="mt-4 h-72">
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
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
