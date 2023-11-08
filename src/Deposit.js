import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "./store/users/users-slice";
import { updateactiveUserDetails } from "./store/users/active-user-slice";
import { toast } from "./sweet-alert";
import "./Deposit.css";
import Home from "./Home";

const Depositamount = () => {
  const [account, setaccount] = useState("");
  const [mainamount, setMainAmount] = useState("");
  const [accountoptions, setAccountoptions] = useState([
    "Select Account Type",
    "Savings Account",
    "Salary Account",
  ]);

  const activeuserdetails = useSelector(
    (store) => store.activeUserSlice.activeUsers
  );

  // const [amount, setAmount] = useState({
  //   initialDeposit: "",
  // });
  const [updateamount, setUpdateAmount] = useState({
    initialDeposit: "",
  });

  const [amount, setAmount] = useState("");
  const [depositerror, setDepositerror] = useState({});

  console.log("activeuserdetails", activeuserdetails);

  const idnumber = activeuserdetails[0].id;
  console.log("idnumber", idnumber);

  const dispatch = useDispatch();
  // let mainamount = useSelector((store) => store.userSlice.users);
  // let totalusers = useSelector((store) => store.userSlice.users);
  // console.log("mainamount", mainamount[0].initialDeposit);

  // const deposithandleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("hi");

  //   let totalbalance = parseInt(mainamount[0].initialDeposit) + parseInt(value);
  //   setAmount({ [name]: totalbalance });
  // };

  const calculate = () => {
    fetch(`http://localhost:3200/users/${idnumber}`)
      .then((resp) => resp.json())
      .then((res) => setMainAmount(res));
    // console.log("main amount response", mainamount);
    let totalbalance = parseInt(mainamount.initialDeposit) + amount;
    setUpdateAmount({ initialDeposit: totalbalance });
    console.log("updated deposit amount after submit", updateamount);
  };

  console.log("updated deposit amount before submit", updateamount);

  const deposithandleChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  useEffect(() => {
    calculate();
  }, [amount]);

  console.log("amount", amount);
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = {};

    if (amount.length === 0) {
      validateErrors.amount = "Intial Deposit is not entered";
    } else if (amount <= 0) {
      validateErrors.amount = "Deposit should not be zero or negative";
    }

    if (account.length === 0) {
      validateErrors.account = "Account is not selected";
    }

    setDepositerror(validateErrors);

    // console.log("validate errors in deposit", validateErrors);
    // console.log("errors in deposit", depositerror);

    if (Object.keys(validateErrors).length === 0) {
      fetch(`http://localhost:3200/users/${idnumber}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify(amount),
        body: JSON.stringify(updateamount),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("response of patch", resp);
          dispatch(updateUserDetails(resp));
          dispatch(updateactiveUserDetails(resp));
          toast("success", "Amount is deposited successfully");
        })
        .catch((err) => {
          toast("error", "Amount is not deposited ");
        });
      console.log("submitted");
      setAmount("");
    }
  };

  return (
    <>
      <Home />
      <div style={{ paddingTop: "20px" }}>
        <form className="row gy-2 gx-3 " onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label>Account Type:</label>
            <select
              className="form-select"
              id="autoSizingSelect"
              style={{ marginTop: "8px" }}
              value={account}
              onChange={(e) => {
                setaccount(e.target.value);
              }}
            >
              {accountoptions.map((account, index) => (
                <option key={index} value={account}>
                  {account}
                </option>
              ))}
            </select>
            {depositerror.account && (
              <span className="err-message">*{depositerror.account}</span>
            )}
          </div>

          <div className="col-md-4 ">
            <label className="form-label">Deposit</label>
            <input
              type="number"
              className="form-control"
              name="initialDeposit"
              value={amount}
              // value={amount.initialDeposit}
              onChange={deposithandleChange}
            />
            {depositerror.amount && (
              <span className="err-message">*{depositerror.amount}</span>
            )}
          </div>

          <div className="col-md-4" style={{ paddingTop: "30px" }}>
            <b>AVAILABLE BALANCE: {activeuserdetails[0].initialDeposit}</b>
          </div>

          <div className="col-12 pt-5">
            <button
              type="submit"
              className="btn btn-primary"
              data-testid="deposit-button"
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Depositamount;
