import { Button } from "react-bootstrap";
import { useLoginContext } from "../../contexts/login-context";
import { useMemo } from "react";
import { LoginService } from "../../services/LoginService";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface LogoutButtonProps {
  className?: string | undefined;
  hidden?: boolean | undefined;
  style?: React.CSSProperties | undefined;
  variant?: ButtonVariant;
}

const LogoutButton = ({
  className,
  hidden,
  style,
  variant,
}: LogoutButtonProps) => {
  const { axios, setLoginData } = useLoginContext();
  const loginService = useMemo(() => new LoginService(axios), [axios]);

  const handleClick = async () => {
    try {
      await loginService.logout();
    } catch (error) {
      console.log(error);
    } finally {
      setLoginData(null);
    }
  };

  return (
    <Button
      className={className}
      hidden={hidden}
      style={style}
      onClick={handleClick}
      variant={variant ?? "primary"}
    >
      <i className="bi bi-box-arrow-right me-2" />
      Logout
    </Button>
  );
};

export default LogoutButton;
