import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => (
  <>
    <Layout>
      <h1>Index Page</h1>
      <Link href="/Signup">
        Signup
      </Link>
    </Layout>
  </>
);

export default Index;
