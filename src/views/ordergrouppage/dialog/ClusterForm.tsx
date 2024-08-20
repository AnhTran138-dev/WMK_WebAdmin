import React from "react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  useToast,
} from "../../../components/ui";
import { OrderGroupApi } from "../../../features/order_group";
import { Response } from "../../../models/responses";

interface ClusterFormProps {
  onClose: () => void;
  refetch: () => void;
}

const ClusterForm: React.FC<ClusterFormProps> = ({ onClose, refetch }) => {
  const { toast } = useToast();
  // const [radius, setRadius] = useState<number>(0);
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to cluster this order group?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        {/* <Input
          value={radius}
          placeholder="Input Radius"
          onChange={(e) => setRadius(parseInt(e.target.value))}
          type="number"
        /> */}
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          onClick={async () => {
            const response: Response<null> =
              await OrderGroupApi.clusterOrderGroup();

            if (response.statusCode === 200) {
              toast({
                title: "Clustered",
                description: response.message,
                duration: 5000,
              });

              refetch();
              onClose();
            } else {
              toast({
                title: "Error",
                description: response.message,
                duration: 5000,
              });
            }
          }}
        >
          Confirm
        </Button>
      </AlertDialogFooter>
    </div>
  );
};

export default ClusterForm;
