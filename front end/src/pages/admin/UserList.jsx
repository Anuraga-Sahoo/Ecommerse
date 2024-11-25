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

function UserList() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [editableUserId, setEditbleUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toogleEdit = (id, username, email) => {
    setEditbleUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditbleUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are You sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className=" p-4">
      <div className=" w-full flex flex-row justify-center">
        <button className=" text-2xl font-semibold mb-4  flex justify-center border  border-blue-200 py-1 pl-2 pr-2 rounded-lg bg-purple-100 hover:bg-pink-200  hover:scale-105 transition-all ease-in-out duration-300">
          Users List
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className=" px-4 py-2">{user._id}</td>
                  <td className=" px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className=" flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className=" w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className=" ml-2 bg-blue-500 text-black py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className=" flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toogleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className=" ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className=" px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className=" flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className=" w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className=" ml-2 bg-blue-500 text-black py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        <button
                          onClick={() =>
                            toogleEdit(user._id, user.name, user.email)
                          }
                        >
                          <FaEdit className=" ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className=" px-4 py-2">
                    {user.isadmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className=" px-4 py-2">
                    {!user.isadmin && (
                      <div>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
