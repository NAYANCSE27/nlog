import Link from "next/link";
import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => (
  <>
    <Layout>
      <h1>Signup Page</h1>
      <SignupComponent />
    </Layout>
  </>
);

export default Signup;
