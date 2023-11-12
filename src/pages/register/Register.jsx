import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <div className="left_register_header">
            <h3>
            Bem Vindo(a) ao 
            </h3>
            <h1>Uni4Life</h1>
          </div>
          <div className="frm_Cadastro">
            <h1>Cadastro</h1>
            <form>
              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Senha" />
              <input type="password" placeholder="Confirmar a senha" />
              <button>Registrar-se</button>
            </form>
          </div>
          <div className="left_register_footer">
            <p>Você já possui uma conta?</p>
            <Link to="/login">
            <button>Login</button>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Register;
