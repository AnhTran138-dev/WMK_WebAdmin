import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui";
import { cn } from "../../lib";

interface DialogCustomProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  className?: string;
}

const DialogCustom: React.FC<DialogCustomProps> = ({
  children,
  isOpen,
  onClose,
  title,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogTrigger asChild>{title}</AlertDialogTrigger>
        <AlertDialogContent className={cn(className)}>
          {children}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DialogCustom;
