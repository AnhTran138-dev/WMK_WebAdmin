import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import DataRender from "@/components/data_render";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { UserRequest } from "@/models/requests/user_request";
import { Response } from "@/models/responses";
import { UserList } from "@/models/responses/user_list";
import { useState } from "react";
import UserColumn from "./user_column";
import UserForm from "./user_form";

const UserPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<UserRequest | null>(null);

  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<Response<UserList[]>>("/api/user/get-all");

  const handleCreate = () => {
    setIsDialogOpen(true);
    setUserEdit(null);
  };

  const handleEdit = (user: UserRequest) => {
    setIsDialogOpen(true);
    setUserEdit(user);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleToast = (success: boolean, description: string) => {
    if (success) {
      toast({
        title: "success",
        description: description,
      });
      refetch();
    } else {
      toast({
        title: "error",
        description: description,
      });
    }
  };

  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={UserColumn(handleEdit, handleToast)}
          data={user?.data ?? []}
          searchColumn="userName"
          handleCreate={handleCreate}
        />
      </DataRender>
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <UserForm
            reFresh={refetch}
            onClose={handleCloseDialog}
            user={userEdit}
          />
        }
      />
    </div>
  );
};

export default UserPage;
