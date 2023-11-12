import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left"></div>
        <div className="right">
          <div className="right_login_header">
            <h3>
            Bem Vindo(a) ao 
            </h3>
            <h1>Uni4Life</h1>
            <p>Feliz que você voltou! 😃</p>
          </div>
          <div className="frm_login">
            <h1>Login</h1>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
          <div className="right_login_footer">
            <p>Não tem uma conta?</p>
            <Link to="/register">
              <button>Registre-se</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
