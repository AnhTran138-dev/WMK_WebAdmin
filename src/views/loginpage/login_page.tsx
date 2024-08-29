import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import LoginForm from "./login_form";
import assert from "../../asserts";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-custom-blue">
      <div className="overflow-hidden shadow-md w-md rounded-xl md:max-w-4xl lg:w-screen">
        <div className="w-full md:flex">
          <div className="md:shrink-0">
            <img
              src={assert.logo}
              alt="WeMealKit"
              className="object-cover size-full md:size-full "
            />
          </div>
          <Card className="flex flex-col justify-center w-full md:max-w-md">
            <CardHeader>
              <CardTitle>Welcome to WeMealKit</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
