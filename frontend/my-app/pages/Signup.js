import Link from "next/link";
import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => (
  <>
    <Layout>
      <h1 className="text-center pt-4 pb-4">Signup</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  </>
);

export default Signup;
