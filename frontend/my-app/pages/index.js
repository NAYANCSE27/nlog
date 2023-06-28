import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => (
  <>
    <Layout>
      <h1>Index Page</h1>
      <Link href="/signup">
        Signup
      </Link>
    </Layout>
  </>
);

export default Index;
