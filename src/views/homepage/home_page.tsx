import { useEffect, useState } from "react";
import ChartPopularRecipe from "./component/chart_popular_recipe";
import ChartTotalPrice from "./component/chart_total_price";
import { jwtDecode } from "jwt-decode";
import { getItem } from "../../lib";
import { TokenResponse } from "../../models/responses";
import Show from "../../lib/show";

const HomePage = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token: TokenResponse = jwtDecode(getItem("token"));
    setRole(
      token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    );
  }, []);

  return (
    <div>
      <h3 className="mt-4 mb-10 font-bold text-center uppercase">Dashboard</h3>
      <Show>
        <Show.When isTrue={role === "Admin" || role === "Manager"}>
          <ChartTotalPrice />
        </Show.When>
      </Show>
      <ChartPopularRecipe />
    </div>
  );
};

export default HomePage;
