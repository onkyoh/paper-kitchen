import Button from "@/components/Elements/Button";
import Spinner from "@/components/Elements/Spinner";
import Form from "@/components/Form/Form";
import Header from "@/components/Elements/Header";

import { usePermissionsList } from "../../api/permissions/getPermissionsList";
import { useUpdatePermissions } from "../../api/permissions/updatePermissions";
import usePermissions from "../../hooks/usePermissions";

interface IPermissionsProps {
  path: string;
  id: number;
}
const Permissions = ({ path, id }: IPermissionsProps) => {
  const permissionsList = usePermissionsList(path, id);
  const permissions = useUpdatePermissions();

  const { editingIds, handleEdit, deletingIds, handleDelete } =
    usePermissions();

  if (permissionsList.isPending) return <Spinner />;

  return (
    <Form
      className="text-center"
      onSubmit={async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await permissions.mutateAsync({ path, id, editingIds, deletingIds });
      }}
    >
      <Header>Permissions List</Header>
      <ul className="w-full">
        {permissionsList.data && permissionsList.data?.length > 0 ? (
          permissionsList.data.map((user) => (
            <li className="flex w-full items-center gap-2" key={user.userId}>
              <p
                key={user.userId}
                className={`flex-grow ${
                  deletingIds.includes(user.userId) ? "line-through" : ""
                }`}
              >
                {user.name}
              </p>
              <select
                name="permissions"
                id="permissions"
                value={
                  user.canEdit || editingIds.includes(user.userId)
                    ? "editor"
                    : "viewer"
                }
                onChange={() => handleEdit(user.userId)}
              >
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>

              <Button onClick={() => handleDelete(user.userId)} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </Button>
            </li>
          ))
        ) : (
          <p className="text-center">You haven't shared yet!</p>
        )}
      </ul>
      <Button
        type="submit"
        className="w-full border-2 border-black bg-teal-400"
        disabled={
          (editingIds.length === 0 && deletingIds.length === 0) ||
          permissionsList.data?.length === 0
        }
      >
        Submit
      </Button>
    </Form>
  );
};

export default Permissions;
