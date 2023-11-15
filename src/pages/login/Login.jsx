import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {  
      await login(inputs);
    } catch (err) {
      setErr(err.response.data)
    }
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
              <input type="text" placeholder="Nome" name="username" onChange={handleChange}/>
              <input type="password" placeholder="Senha" name="password" onChange={handleChange}/>
              {err && err}
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
