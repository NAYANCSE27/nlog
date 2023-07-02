import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";

const Signin = () => (
  <>
    <Layout>
      <h1 className="text-center pt-4 pb-4">Signin</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  </>
);

export default Signin;
