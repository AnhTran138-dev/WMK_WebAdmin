import React from "react";
import { OrderGroupRequest } from "../../../models/requests";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderGroupSchema } from "../../../schemas/order_group";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
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
} from "../../../components/ui";
import useFetch from "../../../hooks/useFetch";
import { Response, User } from "../../../models/responses";
import Show from "../../../lib/show";

interface OrderGroupFormProps {
  onClose: () => void;
  refetch: () => void;
  onToast: (success: boolean, description: string) => void;
  orderGroup: OrderGroupRequest | null;
}

const OrderGroupForm: React.FC<OrderGroupFormProps> = ({
  orderGroup,
  // onClose,
  // refetch,
  // onToast,
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
    console.log(values);
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
                  <Select>
                    <SelectTrigger
                      value={field.value}
                      onChange={field.onChange}
                    >
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
        </AlertDialogDescription>
      </form>
    </Form>
  );
};

export default OrderGroupForm;
