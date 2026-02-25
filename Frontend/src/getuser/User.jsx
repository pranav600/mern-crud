import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteModal from "../component/DeleteModal";

//rerte
const User = () => {
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/allusers");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/delete/user/${userToDelete}`,
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete),
      );
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="userTable">
      <Toaster position="top-right" reverseOrder={false} />

      <Link to="/add" type="button" className="btn btn-success">
        <i className="fa-solid fa-user-plus"></i> Add User
      </Link>

      <DeleteModal
        open={deleteModalOpen}
        itemName="user"
        onConfirm={confirmDeleteUser}
        onCancel={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
      />

      {users.length === 0 ? (
        <div className="noData">
          <h2>No Users Found</h2>
          <p>Please add New User</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/${user._id}`}
                    type="button"
                    className="btn btn-primary">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    type="button"
                    className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
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

export default User;
