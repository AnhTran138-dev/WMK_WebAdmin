import { useState } from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  useToast,
} from "../../../components/ui";
import { OrderGroupApi } from "../../../features/order_group";
import { Response } from "../../../models/responses";

const ClusterForm = () => {
  const { toast } = useToast();
  const [radius, setRadius] = useState<number>(0);
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Cluster</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to cluster this order group?
        <Input
          value={radius}
          placeholder="Input Radius"
          onChange={(e) => setRadius(parseInt(e.target.value))}
          type="number"
        />
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            const response: Response<null> =
              await OrderGroupApi.clusterOrderGroup(radius);

            if (response.statusCode === 200) {
              toast({
                title: "Clustered",
                description: response.message,
                duration: 5000,
              });
            } else {
              toast({
                title: "Error",
                description: response.message,
                duration: 5000,
              });
            }
          }}
        >
          Save Changes
        </Button>
      </AlertDialogFooter>
    </div>
  );
};

export default ClusterForm;
