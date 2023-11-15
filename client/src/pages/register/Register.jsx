import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const clearForm = () => {
    setInputs({
      username: "",
      email: "",
      password: "",
      name: "",
    });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccessMessage("Cadastro criado com sucesso!");
      setErr(null);
      clearForm();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <div className="left_register_header">
            <h3>Bem Vindo(a) ao</h3>
            <h1>Uni4Life</h1>
          </div>
          <div className="frm_Cadastro">
            <h1>Cadastro</h1>
            <form>
              <input
                type="text"
                placeholder="Usuario"
                name="username"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Senha"
                name="password"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Nome"
                name="name"
                onChange={handleChange}
              />
              {err && err}
              {successMessage && (
                <div style={{ color: "white" }}>{successMessage}</div>
              )}
              
              <button onClick={handleClick}>Registrar-se</button>
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
