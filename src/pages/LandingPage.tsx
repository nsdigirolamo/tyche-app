import { Row } from "react-bootstrap";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <Row>
        <Link to="/register">Register</Link>
      </Row>
      <Row>
        <Link to="/posts">Posts</Link>
      </Row>
    </>
  );
};

export default LandingPage;
