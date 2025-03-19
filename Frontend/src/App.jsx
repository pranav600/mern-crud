import AddUser from "./addUser/AddUser";
import "./App.css";
import User from "./getuser/User";
import UpdateUser from "./updateUser/updateuser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    }
  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
