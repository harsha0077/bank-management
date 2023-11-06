import { useEffect, useState } from "react";
import "./Login.css";

import { toast } from "./sweet-alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./store/users/users-slice";
import { useNavigate } from "react-router-dom";
import {
  clearactiveUserDetails,
  getactiveUserDetails,
} from "./store/users/active-user-slice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userdetails, setUserDetails] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    dispatch(clearactiveUserDetails());
    navigate("/");
  }, []);
  const usersList = useSelector((store) => store.userSlice.users);
  console.log("usersList in redux", usersList);
  console.log("usersList in not redux", userdetails);
  console.log("username in userlist", usersList.username);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // if (usersList.length === 0) {
      //   toast("error", "Invalid username or password");
      // }
      const useravilable = usersList?.filter(
        (x) => x.username === username && x.password === password
      );
      console.log("userslist", usersList);
      console.log("useravailable", useravilable);
      const activeuserslist = dispatch(getactiveUserDetails(useravilable));
      if (activeuserslist.length !== 0) {
        console.log("user details", useravilable);
        toast("success", "Login is successful");
        sessionStorage.setItem("username", username);
        navigate("/Home");
      } else {
        console.log("user not available");
        toast("error", "Invalid username or password");
      }
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast("error", "Please enter username");
    }
    if (password === "" || password === null) {
      result = false;
      toast("error", "Please Enter Password");
    }
    let validateusername = usersList?.filter((x) => x.username === username);
    if (validateusername.length === 0) {
      result = false;
      toast("error", " username is not registered");
    }
    let validatepassword = usersList?.filter((x) => x.password === password);
    if (validatepassword.length === 0) {
      result = false;
      toast("error", "Please Enter correct password");
    }
    return result;
  };
  return (
    <div>
      <h3>Login</h3>
      <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="col-md-12 " style={{ paddingTop: "15px" }}>
              <label style={{ float: "left" }}>Username:</label>
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="form-control"
                value={username}
                data-testid="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-12 " style={{ paddingTop: "15px" }}>
              <label style={{ float: "left" }}>Password:</label>
              <input
                type="password"
                name="name"
                placeholder="Password"
                className="form-control"
                value={password}
                data-testid="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12" style={{ paddingTop: "15px" }}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          <span className="account-yet">
            Don't have an account yet ?<Link to={"/register"}>Register</Link>
          </span>
        </form>
      </div>
    </div>
    // <div>
    //   <h3>Login</h3>
    //   <form className="container-form" onSubmit={handleSubmit}>
    //     <div className="input-form">
    //       <input
    //         type="text"
    //         name="name"
    //         placeholder="Username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </div>
    //     <div className="password-form">
    //       <input
    //         type="password"
    //         name="name"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit" className="login-button">
    //       Login
    //     </button>

    //     <span className="account-yet">Don't have an account yet ?</span>
    //   </form>
    // </div>
  );
};

export default Login;
