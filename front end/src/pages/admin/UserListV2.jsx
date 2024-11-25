import React, { useEffect, useState } from "react";
import Message from "../../components/Message.jsx";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice.js";
import Loader from "../../components/Loader.jsx";
import AdminMenu from "./AdminMenu.jsx";
import Swal from "sweetalert2";

const UserListV2 = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [editableUserId, setEditbleUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toogleEdit = (id, username, email) => {
    setEditbleUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this user.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await updateUser({
          userId: id,
          username: editableUserName,
          email: editableUserEmail,
        });
        await Swal.fire({
          title: "Updated!",
          text: "User has been updated.",
          icon: "success",
        });
        // toast.success("User has been updated.");
        setEditbleUserId(null);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "User update cancelled.",
        icon: "error",
      });
    }
  };

  const deleteHandler = async (id, username) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        await Swal.fire({
          title: "Deleted!",
          text: `${username} has been deleted.`,
          icon: "success",
        });
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "this User data is safe :)",
        icon: "error",
      });
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg pl-[4%]">
      {isLoading ? (
        <div class="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <table class="w-full relative text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 sticky">
                ID
              </th>
              <th scope="col" class="px-6 py-3 sticky">
                NAME
              </th>
              <th scope="col" class="px-6 py-3 sticky">
                EMAIL
              </th>
              <th scope="col" class="px-6 py-3 sticky">
                ADMIN
              </th>
              <th scope="col" class="px-6 py-3 sticky">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user._id}
                </th>
                <td class="px-6 py-4">
                  {editableUserId === user._id && toggleUpdate ? (
                    <input
                      type="text"
                      value={editableUserName}
                      onChange={(e) => setEditableUserName(e.target.value)}
                      class="w-full border border-b rounded-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={user.username}
                      disabled={true}
                      onChange={() => {}}
                      class="w-full border border-none rounded-sm active:focus-outline"
                    />
                  )}
                </td>
                <td class="px-6 py-4">
                  {editableUserId === user._id && toggleUpdate ? (
                    <input
                      type="text"
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      class="w-full border border-b rounded-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={user.email}
                      disabled={true}
                      onChange={() => {}}
                      class="w-full border border-none rounded-sm"
                    />
                  )}
                </td>
                <td class="px-6 py-4">{user.isadmin ? "admin" : "user"}</td>
                <td class="px-6 py-4 flex gap-2 items-center justify-center">
                  <button
                    onClick={() => {
                      toogleEdit(user._id, user.username, user.email);
                      setToggleUpdate((value) => !value);
                      if (toggleUpdate) {
                        updateHandler(user._id);
                      }
                    }}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {editableUserId === user._id && toggleUpdate ? (
                      <button className=" bg-green-400 rounded-md px-3 py-2 text-white">
                        Update
                      </button>
                    ) : (
                      <FaEdit size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      deleteHandler(user._id, user.username);
                    }}
                  >
                    <FaTrash className=" text-red-600 text-[16px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListV2;
