import { DataTable } from "@/components/common/data_table";
import DialogCustom from "@/components/common/dialog";
import { useToast } from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { UserRequest } from "@/models/requests/user_request";
import { Response, TokenResponse } from "@/models/responses";
import { UserList } from "@/models/responses/user_list";
import { useEffect, useState } from "react";
import UserColumn from "./user_column";
import UserForm from "./user_form";
import { jwtDecode } from "jwt-decode";
import { getItem } from "../../lib";

const UserPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<UserRequest | null>(null);
  const [userList, setUserList] = useState<UserList[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");

  const { data: user, refetch } =
    useFetch<Response<UserList[]>>("/api/user/get-all");

  useEffect(() => {
    if (user?.data) {
      const allRoles = ["Shipper", "Customer", "Staff", "Manager"];
      setSelectedRoles(allRoles);
      setUserList(
        allRoles.length === 0
          ? user.data
          : user.data.filter((user) => allRoles.includes(user.role))
      );
    }
  }, [user]);

  useEffect(() => {
    const token: TokenResponse = jwtDecode(getItem("token"));

    if (token) {
      setRole(
        token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }, []);

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
        title: "Success",
        description: description,
      });
      refetch();
    } else {
      toast({
        title: "Error",
        description: description,
      });
    }
  };

  const sortUser = (role: string, selected: boolean) => {
    setSelectedRoles((prev) => {
      const updatedRoles = selected
        ? [...prev, role]
        : prev.filter((r) => r !== role);

      setUserList(
        updatedRoles.length === 0
          ? user?.data ?? []
          : user?.data?.filter((user) => updatedRoles.includes(user.role)) ?? []
      );

      return updatedRoles;
    });
  };

  return (
    <div>
      {/* <DataRender className="my-4 h-fit" isLoading={loading} error={error}> */}
      <DataTable
        columns={UserColumn(handleEdit, handleToast, refetch, role)}
        data={userList.length === 0 ? user?.data ?? [] : userList}
        searchColumn="userName"
        handleCreate={
          role === "Manager" || role === "Admin" ? handleCreate : undefined
        }
        sortUser={sortUser}
        selectedRoles={selectedRoles}
      />
      {/* </DataRender> */}
      <DialogCustom
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        children={
          <UserForm
            role={role}
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
