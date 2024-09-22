import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "@/components/ui";
import { authApi } from "@/features";
import { setItem } from "@/lib";
import { LoginSchema } from "@/schemas/auth";
import { useUserState } from "@/states/global/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserRole } from "../../models/requests";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setData } = useUserState();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailOrUserName: "",
      password: "",
    },
  });

  

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await authApi
      .login(values)
      .then((response) => {
        if (response.data.statusCode === 200) {
          setData(response.data.data);
          if (
            response.data.data?.role === UserRole.Shipper ||
            response.data.data?.role === UserRole.Customer
          ) {
            navigate("/sign-in");
            toast({
              title: "Error",
              description: "You are not allowed to access this page",
            });
          } else {
            setItem("token", response.data.message);

            navigate("/");
            toast({
              title: "Success",
              description: "Login successfully",
              duration: 5000,
            });
          }
        } else {
          toast({
            title: "Error",
            description: response.data.message,
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          duration: 5000,
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="emailOrUserName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="block w-full  border-0 py-1.5 shadow-sm ">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 "
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex w-full justify-center rounded-md bg-custom-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-blue-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
