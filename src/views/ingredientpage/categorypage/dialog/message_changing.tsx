import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from "@/components/ui";

interface MessageChangingProps {
  type: string;
  onConfirm: () => void;
}

const MessageChanging: React.FC<MessageChangingProps> = ({
  type,
  onConfirm,
}) => {
  return (
    <div>
      <AlertDialogHeader>
        <h1 className="text-lg font-bold">
          {type === "update" ? "Change Status" : "Delete Category"}
        </h1>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to{" "}
        {type === "update" ? "change the status" : "delete this category"}?
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={onConfirm}>Save Change</Button>
      </AlertDialogFooter>
    </div>
  );
};

export default MessageChanging;
