import ChartPopularRecipe from "./component/chartPopularRecipe";
import ChartTotalPrice from "./component/chartTotalPrice";

const HomePage = () => {
  return (
    <div>
      <h3 className="font-bold mt-4 mb-10 text-center uppercase">Dashboard</h3>
      <ChartTotalPrice />
      <ChartPopularRecipe />
    </div>
  );
};

export default HomePage;
