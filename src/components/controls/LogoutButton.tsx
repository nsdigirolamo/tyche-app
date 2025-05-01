import { Button } from "react-bootstrap";
import { useLoginContext } from "../../contexts/login-context";
import { useMemo } from "react";
import { LoginService } from "../../services/LoginService";

interface LogoutButtonProps {
  className?: string | undefined;
  hidden?: boolean | undefined;
  style?: React.CSSProperties | undefined;
}

const LogoutButton = ({ className, hidden, style }: LogoutButtonProps) => {
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
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
