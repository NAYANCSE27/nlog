import { useEffect, useState } from "react";
import { isAuth, signup } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "nayan",
    email: "nayan@gmail.com",
    password: "12345678",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // console.log(data);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group pb-4">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control mb-3"
            placeholder="Type your name"
          />

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
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {signupForm()}
    </>
  );
};

export default SignupComponent;
