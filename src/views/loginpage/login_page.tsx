import { Card, CardTitle } from "@/components/ui";
import LoginForm from "./login_form";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen size-full">
      <Card className="w-2/6 p-8">
        <CardTitle>Login</CardTitle>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
