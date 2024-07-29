import { Link } from "react-router-dom";
import { Button } from "./ui";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
