import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidBank } from "react-icons/bi";
import "./Home.css";
import Depositamount from "./Deposit";

import Applyloan from "./applyloan";

const Home = () => {
  const navigate = useNavigate();

  const activeUser = useSelector((store) => store.activeUserSlice.activeUsers);

  useEffect(() => {
    let usersession = sessionStorage.getItem("username");
    if (usersession === "" || usersession === null) {
      navigate("/");
    }
  }, []);
  console.log("activeusers in console", activeUser);
  // console.log("activeusername", activeUser[0].name);
  return (
    <div>
      {activeUser && (
        <div>
          <nav
            className="navbar"
            style={{ background: "#e3f2fd", textDecoration: "none" }}
          >
            <Link to={"/Home"} className="nav-item">
              <div className="nav-home">
                <BiSolidBank /> <br />
                <b>Hi {activeUser[0].name}</b>
              </div>
            </Link>

            <Link to={"/applyloan"} className="nav-item">
              <span className="nav-loan">Apply Loan</span>
            </Link>
            <Link to={"/depositamount"} className="nav-item">
              <span className="nav-update">Update</span>
            </Link>
            <Link style={{ float: "right" }} to={"/"} className="nav-item">
              <span className="nav-logout">Logout</span>
            </Link>
          </nav>

          {/* <img src="https://t4.ftcdn.net/jpg/02/67/21/53/360_F_267215381_GP8fNosJ79IKChWrX4Msz4iF5kk9Rr8Y.jpg" /> */}
          {/* <Depositamount /> */}
          {/* <Applyloan /> */}
        </div>
      )}
    </div>
  );
};

export default Home;
