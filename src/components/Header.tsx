import { Button, Col, Row } from "react-bootstrap";
import LogoutButton from "./controls/LogoutButton";
import { useLoginContext } from "../contexts/login-context";
import { useNavigate } from "react-router";

const Header = () => {
  const { loginData } = useLoginContext();
  const navigate = useNavigate();

  const handleHomeClick = async () => {
    await navigate("/posts");
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Tyche</h1>
        </Col>
        <Col>
          <div style={{ float: "right" }}>
            <Button
              className="me-2"
              onClick={handleHomeClick}
              variant="primary"
            >
              <i className="bi bi-house-fill me-2" />
              Home
            </Button>
            <LogoutButton
              hidden={loginData == null}
              variant="outline-secondary"
            />
          </div>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default Header;
