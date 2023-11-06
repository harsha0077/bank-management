import { useSelector } from "react-redux";

import { useState } from "react";

import { toast } from "./sweet-alert";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./store/users/users-slice";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    country: "",
    state: "",
    email: "",
    contactNumber: "",
    dob: "",
    account: "",
    branch: "",
    initialDeposit: "",
    proofId: "",
    idNumber: "",
  });

  const [countryOptions, setCountryOptions] = useState([
    "Select Country",
    "America",
    "UK",
    "India",
  ]);

  const [stateOptions, setStateOptions] = useState(["Select State"]);

  const [accountType, setAccountType] = useState([
    "Select Account Type",
    "Savings Account",
    "Salary Account",
  ]);

  const [idType, setIdType] = useState([
    "Select ID Type",
    "Adhar Card",
    "PAN Card",
    "Driving Lisence",
  ]);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeduserslist = useSelector((store) => store.userSlice.users);

  console.log("storeuserslist", storeduserslist);

  const sameNumber = storeduserslist?.find(
    (x) => x.idNumber === formData.idNumber
  );

  const sameUsername = storeduserslist?.find(
    (x) => x.username === formData.username
  );

  console.log("sameNumber", sameNumber);
  console.log("sameUsername", sameUsername);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;

    if (selectedCountry === "America") {
      setStateOptions(["Select State", "California", "Texas", "Florida"]);
    } else if (selectedCountry === "UK") {
      setStateOptions(["Select State", "London", "Cambridge", "Oxford"]);
    } else if (selectedCountry === "India") {
      setStateOptions([
        "Select State",
        "Andhra pradesh",
        "Telangana",
        "Karnataka",
        "Tamil Nadu",
        "Maharastra",
        "Madhya Pradesh",
        "Uttar Pradesh",
      ]);
    } else {
      setStateOptions([]);
    }

    setFormData({ ...formData, country: selectedCountry });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = {};
    const currentDate = new Date();
    console.log("currentDate", currentDate);

    if (formData.name.length === 0) {
      validateErrors.name = "name is required";
    } //else if (!/^[*A-Z][a-z][a-z\s]*$/.test(formData.name)) {
    else if (!/^[A-Za-z\s]*$/.test(formData.name)) {
      validateErrors.name = "Only alphabets and spaces are allowed";
    }
    if (sameUsername) {
      validateErrors.username = "username is already registered";
    } else if (formData.username.length === 0) {
      validateErrors.username = "username is required";
    }
    if (
      formData.contactNumber.length !== 10 ||
      formData.contactNumber.length === 0
    ) {
      validateErrors.contactNumber = "Contact number must be 10 digits";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      validateErrors.email = "Email should contain @and. symbols";
    }
    if (formData.country.length === 0) {
      validateErrors.country = "Country is not selected";
    }
    if (formData.state.length === 0) {
      validateErrors.state = "State is not selected";
    }
    if (formData.proofId.length === 0) {
      validateErrors.proofId = "ID proof is not selected";
    }
    if (formData.account.length === 0) {
      validateErrors.account = "Account Type is not selected";
    }

    if (formData.branch.length === 0) {
      validateErrors.branch = "Branch is not selected";
    }
    if (formData.idNumber.length === 0) {
      validateErrors.idNumber = "ID Number is not selected";
    } else if (sameNumber) {
      validateErrors.idNumber = "ID Number is already enrolled";
    }

    if (formData.password.length === 0) {
      validateErrors.password = "Password is not entered";
    }
    if (formData.address.length === 0) {
      validateErrors.address = "Address is not entered";
    }
    if (formData.dob.length === 0) {
      validateErrors.dob = "DOB is not selected";
    } else if (new Date(formData.dob) > currentDate) {
      validateErrors.dob = "DOB should be lesser than today";
    }

    if (formData.initialDeposit.length === 0) {
      validateErrors.initialDeposit = "Intial Deposit is not entered";
    } else if (formData.initialDeposit <= 0) {
      validateErrors.initialDeposit = "Deposit should not be zero or negative";
    }

    setErrors(validateErrors);
    console.log("setcheseka vache errors", errors);
    if (Object.keys(validateErrors).length === 0) {
      fetch("http://localhost:3200/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          toast("success", "Registartion is successful");
          console.log("data", resp);
          dispatch(getUserDetails(resp));
          navigate("/");
          setFormData({
            name: "",
            username: "",
            password: "",
            address: "",
            country: "",
            state: setStateOptions(["Select State"]),
            email: "",
            contactNumber: "",
            dob: "",
            account: "",
            branch: "",
            initialDeposit: "",
            proofId: "",
            idNumber: "",
          });
        })
        .catch((error) => {
          toast("error", error.message);
        });
      // toast("success", "Registartion is successful");
    }

    console.log("before formdata", formData);
    console.log("selected date", new Date(formData.dob));

    console.log("after formdata", formData);
    console.log("errors data", errors);
    console.log("validate errors", validateErrors);
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <h4 className="personal-details">Personal Details:</h4>
      <form
        className="row g-3"
        style={{ margin: "10px", float: "left" }}
        onSubmit={handleSubmit}
      >
        <div className="col-md-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="err-message">*{errors.name}</span>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="err-message">*{errors.username}</span>
          )}
        </div>
        <div className="col-md-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="err-message">*{errors.password}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="err-message">*{errors.email}</span>}
        </div>
        <div className="col-auto">
          <label className="form-label">contactNumber</label>
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && (
            <span className="err-message">*{errors.contactNumber}</span>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="err-message">*{errors.address}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">Country</label>
          <select
            data-testid="inputCountry"
            className="form-select"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
          >
            {countryOptions.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="err-message">*{errors.country}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">State</label>
          <select
            id="inputState"
            className="form-select"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            {stateOptions.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <span className="err-message">*{errors.state}</span>}
        </div>

        <div className="col-md-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="inputAddress"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className="err-message">*{errors.dob}</span>}
        </div>

        <hr className="line-separator"></hr>
        <h4 className="account-details row">Account Details:</h4>

        <div className="col-md-3">
          <label className="form-label">Account</label>
          <select
            id="inputState"
            className="form-select"
            name="account"
            value={formData.account}
            onChange={handleChange}
          >
            {accountType.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
          {errors.account && (
            <span className="err-message">*{errors.account}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">Branch</label>
          <input
            type="text"
            className="form-control"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
          {errors.branch && (
            <span className="err-message">*{errors.branch}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">Initial Deposit</label>
          <input
            type="number"
            className="form-control"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
          />
          {errors.initialDeposit && (
            <span className="err-message">*{errors.initialDeposit}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">ID Type</label>
          <select
            id="inputState"
            className="form-select"
            name="proofId"
            value={formData.proofId}
            onChange={handleChange}
          >
            {idType.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))}
          </select>
          {errors.proofId && (
            <span className="err-message">*{errors.proofId}</span>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">ID Number</label>
          <input
            type="text"
            className="form-control"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          {errors.idNumber && (
            <span className="err-message">*{errors.idNumber}</span>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            data-testid="signin-button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
