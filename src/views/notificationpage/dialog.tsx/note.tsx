import React, { useState } from "react";
import { SelectType } from "../notification_page";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  useToast,
} from "@/components/ui";
import { Response } from "@/models/responses";
import { recipeApi } from "@/features";
import { weeklyPlanApi } from "@/features/weekly_plan.api";

interface NoteProps {
  chooseNotification: SelectType;
  refetch: () => void;
  onClose: () => void;
}

const Note: React.FC<NoteProps> = ({
  chooseNotification,
  refetch,
  onClose,
}) => {
  const { toast } = useToast();
  const [note, setNote] = useState<string>("");

  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {chooseNotification.type === "recipe"
            ? "Recipe Request"
            : "Weekly Plan Request"}
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        {chooseNotification.author === "access" ? (
          `Make sure to approved this ${chooseNotification.type} request`
        ) : (
          <Input
            type="text"
            placeholder="Note"
            className="w-full"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            let response: Response<null>;
            if (chooseNotification.type === "recipe") {
              response = await recipeApi.changeStatusRecipe(
                chooseNotification.id,
                chooseNotification.status,
                note
              );
            } else {
              response = await weeklyPlanApi.changeStatusWeeklyPlan(
                chooseNotification.id,
                chooseNotification.status,
                note
              );
            }

            if (response.statusCode === 200) {
              toast({
                title: "Success",
                description: response.message,
                duration: 5000,
              });
              onClose();
              refetch();
            } else {
              toast({
                title: "Error",
                description: response.message,
                duration: 5000,
              });
            }
          }}
        >
          Save
        </Button>
      </AlertDialogFooter>
    </div>
  );
};

export default Note;
