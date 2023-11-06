import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "./store/users/users-slice";
import { updateactiveUserDetails } from "./store/users/active-user-slice";
import { toast } from "./sweet-alert";
import Home from "./Home";

const Applyloan = () => {
  const [loantype, setLoantype] = useState("");
  const [mainloanamount, setMainLoanAmount] = useState("");
  const [updateloanamount, setUpdateLoanamount] = useState({
    initialDeposit: "",
  });
  const [loanamount, setLoanamount] = useState("");
  // const [loanamount,setLoanamount] = useState("")
  const [ROI, setROI] = useState("");
  // const [roi, setroi] = useState("");
  const [loandetails, setLoandetails] = useState({
    loanapplieddate: "",
    loanduration: "",
  });
  const [educationloandetails, setEducationloandetails] = useState({
    coursefee: "",
    coursename: "",
    fathername: "",
    fatheroccupation: "",
    fatherannualincome: "",
  });
  const [otherloandetails, setOtherloandetails] = useState({
    annualincome: "",
    companyname: "",
    designation: "",
    totalexperience: "",
    currentcompanyexperience: "",
  });
  const [loantypeoptions, setLoantypeoptions] = useState([
    "Select loan type",
    "Education Loan",
    "Personal Loan",
    "Home Loan",
  ]);
  const [loanduration, setLoanduration] = useState([
    "Select loan duration",
    "5 years",
    "10 years",
    "15 years",
    "20 years",
  ]);

  const [applyerors, setApplyErrors] = useState("");

  const loantypeHandlechange = (e) => {
    setLoantype(e.target.value);
  };

  const loandetailshandleChange = (e) => {
    const { name, value } = e.target;
    setLoandetails({ ...loandetails, [name]: value });
    // setLoanamount({ initialDeposit: parseInt(loandetails.loanamount) });
  };

  const educationhandlechange = (e) => {
    const { name, value } = e.target;
    setEducationloandetails({ ...educationloandetails, [name]: value });
  };

  const otherloanhandlechange = (e) => {
    const { name, value } = e.target;
    setOtherloandetails({ ...otherloandetails, [name]: value });
  };

  // let mainamount = useSelector((store) => store.userSlice.users);
  // console.log("mainamount", mainamount[0].initialDeposit);

  const calculateloanamount = () => {
    fetch(`http://localhost:3200/users/${idnumber}`)
      .then((resp) => resp.json())
      .then((res) => setMainLoanAmount(res));
    let totalbalance = parseInt(mainloanamount.initialDeposit) + loanamount;
    setUpdateLoanamount({ initialDeposit: totalbalance });
  };
  const loanamounthandleChange = (e) => {
    setLoanamount(parseFloat(e.target.value));
  };

  const activeuserdetails = useSelector(
    (store) => store.activeUserSlice.activeUsers
  );
  const dispatch = useDispatch();
  // let mainamount = useSelector((store) => store.userSlice.users);
  // console.log("mainamount", mainamount[0].initialDeposit);

  const idnumber = activeuserdetails[0].id;
  console.log("idnumber", idnumber);

  console.log("intialdeposit in apply loan before submit", updateloanamount);

  useEffect(() => {
    if (loantype === "Education Loan") {
      setROI("10%");
    } else if (loantype === "Personal Loan" || loantype === "Home Loan") {
      setROI("15%");
    }

    calculateloanamount();
  }, [loantype, loanamount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("loandetails", loandetails);
    console.log("submitted apply loan");

    const validateErrors = {};
    const currentDate = new Date();
    const datestring =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();
    console.log("currentDate", currentDate);
    console.log("dateString ", new Date(datestring));

    if (loantype.length === 0) {
      validateErrors.loantype = "select loan type";
    }
    if (loanamount.length === 0) {
      validateErrors.loanamount = "Loan amount should not be zero or negative";
    }
    if (loandetails.loanapplieddate.length === 0) {
      validateErrors.loanapplieddate = "Loan applied is not selected";
    } else if (new Date(loandetails.loanapplieddate) < new Date(datestring)) {
      validateErrors.loanapplieddate =
        "Loan applied date should be greater than today";
    }
    if (loandetails.loanduration.length === 0) {
      validateErrors.loanduration = "Loan duration is not selected";
    }

    if (loantype === "Education Loan") {
      if (educationloandetails.coursefee.length === 0) {
        validateErrors.coursefee = "Enter course fee";
      }
      if (educationloandetails.coursename.length === 0) {
        validateErrors.coursename = "Enter course name";
      }
      if (educationloandetails.fathername.length === 0) {
        validateErrors.fathername = "Enter Father name";
      }
      if (educationloandetails.fatheroccupation.length === 0) {
        validateErrors.fatheroccupation = "Enter Father occupation";
      }
      if (educationloandetails.fatherannualincome.length === 0) {
        validateErrors.fatherannualincome = "Enter Annual income";
      }
    }

    if (loantype === "Personal Loan" || loantype === "Home Loan") {
      if (otherloandetails.annualincome.length === 0) {
        validateErrors.annualincome = "Enter Annual income";
      }
      if (otherloandetails.companyname.length === 0) {
        validateErrors.companyname = "Enter company name";
      }
      if (otherloandetails.designation.length === 0) {
        validateErrors.designation = "Enter designation";
      }
      if (otherloandetails.totalexperience.length === 0) {
        validateErrors.totalexperience = "Enter total experience";
      }
      if (otherloandetails.currentcompanyexperience.length === 0) {
        validateErrors.currentcompanyexperience =
          "Enter current company experience";
      }
    }

    setApplyErrors(validateErrors);

    console.log("errors in loanapply", validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      fetch(`http://localhost:3200/users/${idnumber}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updateloanamount),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("response of patch", resp);
          dispatch(updateUserDetails(resp));
          dispatch(updateactiveUserDetails(resp));
          toast("success", "Loan is applied successfully");
          setLoantype("");
          setLoanamount("");
          setROI("");
          setLoandetails({
            loanapplieddate: "",
            loanduration: "",
          });
          setEducationloandetails({
            coursefee: "",
            coursename: "",
            fathername: "",
            fatheroccupation: "",
            fatherannualincome: "",
          });

          setOtherloandetails({
            annualincome: "",
            companyname: "",
            designation: "",
            totalexperience: "",
            currentcompanyexperience: "",
          });
        })
        .catch((error) => {
          toast("error", error.message);
        });
    }
  };
  // console.log("userloandetails", userloandetails);
  console.log("intialdeposit in apply loan after submit", updateloanamount);
  console.log("default loan type", loantype);
  return (
    <div>
      <Home />
      <div>
        <form
          className="row g-3"
          style={{ margin: "10px", float: "left" }}
          onSubmit={handleSubmit}
        >
          <div className="col-md-3">
            <label className="form-label">Loan Type</label>
            <select
              className="form-select"
              name="loantype"
              value={loantype}
              onChange={loantypeHandlechange}
              data-testid="loantype"
            >
              {loantypeoptions.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {applyerors.loantype && (
              <span className="err-message">*{applyerors.loantype}</span>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label">Loan amount</label>
            <input
              type="number"
              className="form-control"
              name="initialDeposit"
              value={loanamount}
              onChange={loanamounthandleChange}
            />
            {applyerors.loanamount && (
              <span className="err-message">*{applyerors.loanamount}</span>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label">Loan Applied Date</label>
            <input
              type="date"
              className="form-control"
              id="inputAddress"
              name="loanapplieddate"
              value={loandetails.loanapplieddate}
              onChange={loandetailshandleChange}
            />
            {applyerors.loanapplieddate && (
              <span className="err-message">*{applyerors.loanapplieddate}</span>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label">Rate of Interest</label>
            <input
              type="text"
              className="form-control"
              name="rateofinterest"
              value={ROI}
              // onChange={(e) => setROI(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Loan Duration</label>
            <select
              id="inputState"
              className="form-select"
              name="loanduration"
              value={loandetails.loanduration}
              onChange={loandetailshandleChange}
            >
              {loanduration.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
            {applyerors.loanduration && (
              <span className="err-message">*{applyerors.loanduration}</span>
            )}
          </div>

          {loantype === "Education Loan" && (
            <div
              className="education loan row pt-5"
              data-testid="educationloan"
            >
              <div className="col-auto">
                <label className="form-label">Course Fee</label>
                <input
                  type="number"
                  className="form-control"
                  name="coursefee"
                  value={educationloandetails.coursefee}
                  onChange={educationhandlechange}
                />
                {applyerors.coursefee && (
                  <span className="err-message">*{applyerors.coursefee}</span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="coursename"
                  value={educationloandetails.coursename}
                  onChange={educationhandlechange}
                />
                {applyerors.coursename && (
                  <span className="err-message">*{applyerors.coursename}</span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Father name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fathername"
                  value={educationloandetails.fathername}
                  onChange={educationhandlechange}
                />
                {applyerors.fathername && (
                  <span className="err-message">*{applyerors.fathername}</span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Father occupation</label>
                <input
                  type="text"
                  className="form-control"
                  name="fatheroccupation"
                  value={educationloandetails.fatheroccupation}
                  onChange={educationhandlechange}
                />
                {applyerors.fatheroccupation && (
                  <span className="err-message">
                    *{applyerors.fatheroccupation}
                  </span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Annual income</label>
                <input
                  type="number"
                  className="form-control"
                  name="fatherannualincome"
                  value={educationloandetails.fatherannualincome}
                  onChange={educationhandlechange}
                />
                {applyerors.fatherannualincome && (
                  <span className="err-message">
                    *{applyerors.fatherannualincome}
                  </span>
                )}
              </div>
            </div>
          )}
          {(loantype === "Personal Loan" || loantype === "Home Loan") && (
            <div className="personal loan row pt-5" data-testid="personalloan">
              <div className="col-auto">
                <label className="form-label">Annual income</label>
                <input
                  type="number"
                  className="form-control"
                  name="annualincome"
                  value={otherloandetails.annualincome}
                  onChange={otherloanhandlechange}
                />
                {applyerors.annualincome && (
                  <span className="err-message">
                    *{applyerors.annualincome}
                  </span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Company name</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyname"
                  value={otherloandetails.companyname}
                  onChange={otherloanhandlechange}
                />
                {applyerors.companyname && (
                  <span className="err-message">*{applyerors.companyname}</span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={otherloandetails.designation}
                  onChange={otherloanhandlechange}
                />
                {applyerors.designation && (
                  <span className="err-message">*{applyerors.designation}</span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Total Experience</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalexperience"
                  value={otherloandetails.totalexperience}
                  onChange={otherloanhandlechange}
                />
                {applyerors.totalexperience && (
                  <span className="err-message">
                    *{applyerors.totalexperience}
                  </span>
                )}
              </div>
              <div className="col-auto">
                <label className="form-label">Exp with curreny company</label>
                <input
                  type="number"
                  className="form-control"
                  name="currentcompanyexperience"
                  value={otherloandetails.currentcompanyexperience}
                  onChange={otherloanhandlechange}
                />
                {applyerors.currentcompanyexperience && (
                  <span className="err-message">
                    *{applyerors.currentcompanyexperience}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              data-testid="loan-button"
            >
              Apply Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Applyloan;
