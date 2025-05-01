import { Col, Row } from "react-bootstrap";
import LogoutButton from "./controls/LogoutButton";
import { useLoginContext } from "../contexts/login-context";

const Header = () => {
  const { loginData } = useLoginContext();

  return (
    <>
      <Row>
        <Col>
          <h1>Tyche</h1>
        </Col>
        <Col>
          <LogoutButton hidden={loginData == null} style={{ float: "right" }} />
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default Header;
