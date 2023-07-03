import { useState } from "react";
import { authenticate, signin } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "nayan@gmail.com",
    password: "12345678",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // console.log(data);
        // redirect user to home page
        authenticate(data, () => {
          Router.push("/");
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group pb-4">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control mb-3"
            placeholder="Type your email"
          />

          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control mb-3"
            placeholder="Type your password"
          />
        </div>
        <div className="offset-md-6">
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {signinForm()}
    </>
  );
};

export default SigninComponent;
