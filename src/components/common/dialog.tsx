import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui";
import { cn } from "@/lib";
import React, { useCallback, useEffect, useRef } from "react";

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
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>{title}</AlertDialogTrigger>
      <AlertDialogContent ref={dialogRef} className={cn(className)}>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCustom;
