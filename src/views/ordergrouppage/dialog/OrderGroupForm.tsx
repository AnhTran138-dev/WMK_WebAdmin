import React from "react";
import { OrderGroupRequest } from "../../../models/requests";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderGroupSchema } from "../../../schemas/order_group";
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
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui";
import useFetch from "../../../hooks/useFetch";
import { Response, User } from "../../../models/responses";
import Show from "../../../lib/show";
import { OrderGroupApi } from "../../../features/order_group";

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
  const { data: user } = useFetch<Response<User[]>>("/api/user/get-all");
  const form = useForm<z.infer<typeof OrderGroupSchema>>({
    defaultValues: {
      shipperId: orderGroup?.shipperId || "",
      location: orderGroup?.location || "",
      longitude: orderGroup?.longitude || 0,
      latitude: orderGroup?.latitude || 0,
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
          <FormField
            control={form.control}
            name="shipperId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipper</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipper" />
                    </SelectTrigger>
                    <SelectContent>
                      {user?.data.map((user) => (
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
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Location"
                    className="input"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-6 mt-2">
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Longitude"
                      className="input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Latitude"
                      className="input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{orderGroup ? "Update" : "Submit"}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default OrderGroupForm;
