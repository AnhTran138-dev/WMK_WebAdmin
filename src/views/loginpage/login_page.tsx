import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import LoginForm from "./login_form";
import assert from "../../asserts";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen size-full bg-custom-blue">
      <img
        src={assert.logo}
        alt="WeMealKit"
        className="rounded-lg shadow-2xl"
      />
      <Card className="w-2/6 p-8">
        <CardHeader>
          <CardTitle>Welcome to WeMealKit</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
