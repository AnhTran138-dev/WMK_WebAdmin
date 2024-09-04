import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { formatFromISOString, FormatType } from "@/lib";
import Show from "@/lib/show";
import { RecipeList } from "@/models/responses";
import { ProcessStatus } from "@/models/responses/weekly_plan_list";
import {
  Calendar,
  CheckCircle,
  CircleDollarSign,
  NotepadText,
  Pencil,
  User,
  XCircle,
} from "lucide-react";
import React from "react";

interface RecipeItemProps {
  recipe: RecipeList;
  onApprove: () => void;
  onDeny: () => void;
  onEdit: () => void;
  onDetail: (id: string) => void;
  isStaff: boolean;
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
  onApprove,
  onDeny,
  onEdit,
  onDetail,
  isStaff,
}) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case ProcessStatus.Denied:
        return <Badge variant="destructive">{status}</Badge>;
      case ProcessStatus.Processing:
        return <Badge className="bg-blue-400">{status}</Badge>;
      default:
        return (
          <Badge className="text-3xl" variant="success">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card
      className="flex flex-col overflow-hidden transition-transform duration-300 bg-white shadow-md rounded-xl hover:shadow-lg hover:cursor-pointer"
      onClick={() => onDetail(recipe.id)}
    >
      <img
        src={recipe.img}
        alt={recipe.name}
        className="object-cover w-full h-48 rounded-t-xl"
      />
      <CardHeader className="px-4 pt-4">
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-2xl">
              <CircleDollarSign /> {recipe.price}
            </span>
            {renderStatus(recipe.processStatus)}
          </div>
          <span className="mt-4 text-xl">{recipe.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Show>
          <Show.When isTrue={isStaff}>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <NotepadText className="w-4 h-4 text-gray-500" />
              <span>{recipe.description}</span>
            </div>
          </Show.When>
        </Show>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4 text-gray-500" />
          <span>{recipe.createdBy}</span>
        </div>
        <div className="flex items-center mt-1 space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{formatFromISOString(recipe.createdAt, FormatType.DATE)}</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 mt-auto">
        <Show>
          <Show.When isTrue={isStaff}>
            <Button
              className="flex items-center justify-center w-full space-x-2"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="w-5 h-5" />
              <span>Edit</span>
            </Button>
          </Show.When>
          <Show.Else>
            <div className="flex items-center justify-between w-full space-x-2">
              <Button
                variant="outline"
                className="flex items-center justify-center w-full space-x-1 text-green-600 transition-colors duration-200 border-green-600 hover:text-green-700 hover:border-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove();
                }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Approve</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center w-full space-x-1 text-red-600 transition-colors duration-200 border-red-600 hover:text-red-700 hover:border-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeny();
                }}
              >
                <XCircle className="w-5 h-5" />
                <span>Deny</span>
              </Button>
            </div>
          </Show.Else>
        </Show>
      </CardFooter>
    </Card>
  );
};

export default RecipeItem;
