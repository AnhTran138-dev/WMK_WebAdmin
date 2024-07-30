import React from "react";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AlertDialogFooter,
  AlertDialogCancel,
  useToast,
} from "../../components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "../../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRequest } from "../../models/requests/user_request";
import { UserApi } from "../../features";

interface UserFormProps {
  reFresh: () => void;
  user: UserRequest;
  onClose: () => void;
}

const roleList = [
  { id: 0, name: "Admin" },
  { id: 1, name: "Manager" },
  { id: 2, name: "Staff" },
  { id: 3, name: "Shipper" },
  { id: 4, name: "Customer" },
];

const UserForm: React.FC<UserFormProps> = ({ reFresh, onClose, user }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: 0,
      role: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const newUser: UserRequest = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      role: parseInt(values.role),
      phone: values.phone,
      gender: values.gender,
    };

    try {
      if (user) {
        await UserApi.updateUser(user.id ?? "", newUser);
      } else {
        await UserApi.createUser(newUser);
      }
      reFresh();
      onClose();
      toast({
        title: "Success",
        description: user ? "User updated" : "User created",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center">
            {user ? "Edit User" : "Create New User"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="mt-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mt-5 space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mt-5 space-x-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleList.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className="mb-3">Gender</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === 1}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 1 : 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{user ? "Update" : "Submit"}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default UserForm;
