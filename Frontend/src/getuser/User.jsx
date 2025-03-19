import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const showSuccessToast = () => {
  toast.success(
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      <CheckCircleIcon color="success" />
      User Deleted Successfully!
    </motion.div>,
    { icon: null }
  );
};

const User = () => {
  const [users, setUsers] = useState([]);

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

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      // Show success toast
      showSuccessToast();
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
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    type="button"
                    className="btn btn-danger"
                  >
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
