import DataRender from "../../../components/data_render";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "../../../components/ui";
import useFetch from "../../../hooks/useFetch";
import { formatFromISOString, FormatType } from "../../../lib";
import Show from "../../../lib/show";
import { RecipeList, Response } from "../../../models/responses";

const RecipeRequest = () => {
  const {
    data: recipes,
    loading,
    error,
  } = useFetch<Response<RecipeList[]>>("/api/recipes/get-all");

  return (
    <DataRender className="flex-1" isLoading={loading} error={error}>
      <ScrollArea className="h-full p-4 bg-background">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recipes?.data.map((recipe) => (
            <Show key={recipe.id}>
              <Show.When
                isTrue={recipe.processStatus.toLowerCase() === "processing"}
              >
                <Card className="flex flex-col overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="flex flex-col flex-1 p-4">
                    <CardHeader className="mb-2">
                      <CardTitle className="text-lg font-bold text-primary">
                        {recipe.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {recipe.createdBy} -{" "}
                        {formatFromISOString(recipe.createdAt, FormatType.DATE)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col mt-auto sm:flex-row sm:gap-2">
                      <Button className="w-full mb-2 bg-primary text-primary-foreground hover:bg-primary-darker sm:w-auto sm:mb-0">
                        Access
                      </Button>
                      <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive-foreground sm:w-auto">
                        Deny
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </Show.When>
            </Show>
          ))}
        </div>
      </ScrollArea>
    </DataRender>
  );
};

export default RecipeRequest;
