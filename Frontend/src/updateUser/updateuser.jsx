import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./updateuser.css";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to show success toast
  const showSuccessToast = () => {
    toast.success(
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <CheckCircleIcon color="success" />
        User Updated Successfully!
      </motion.div>,
      { icon: null }
    );
  };

  // Function to show error toast
  const showErrorToast = () => {
    toast.error("Error creating user");
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

    useEffect (()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    },[id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
      showSuccessToast();

      // Navigate after delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <div className="addUser">
      <Toaster position="top-right" reverseOrder={false} />

      <Link to="/" type="button" className="btn btn-success">
        <i className="fa-solid fa-backward"></i>
      </Link>

      <h3 className="heading">Update User</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.name}
            name="name"
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            name="email"
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Enter address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={user.address}
            name="address"
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
