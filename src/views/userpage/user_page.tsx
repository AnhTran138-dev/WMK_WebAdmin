import { DataTable } from "../../components/common/data_table";
import DataRender from "../../components/data_render";
import useFetch from "../../hooks/useFetch";
import { Response } from "../../models/responses";
import { UserList } from "../../models/responses/user_list";
import UserColumn from "./user_column";

const UserPage = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetch<Response<UserList[]>>("/api/user/get-all");

  return (
    <div>
      <DataRender className="my-4 h-fit" isLoading={loading} error={error}>
        <DataTable
          columns={UserColumn()}
          data={user?.data ?? []}
          searchColumn="userName"
        />
      </DataRender>
    </div>
  );
};

export default UserPage;
