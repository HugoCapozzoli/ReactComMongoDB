import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [email, setEmail] = useState({ value: '', dirty: false });
  const [password, setPassword] = useState({ value: '', dirty: false });

  const handleEmail = (e) => {
    setEmail({ value: e.target.value, dirty: true });
  };

  const handlePassword = (e) => {
    setPassword({ value: e.target.value, dirty: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do form (recarregar a página)

    // Simulação de login
    if (email.value && password.value) {
      // Se o email e senha estiverem preenchidos
      navigate('/cadastrar'); // Redireciona para a página de cadastro
    } else {
      alert('Preencha todos os campos!'); // Mensagem de erro se os campos estiverem vazios
    }
  };

  const handleErrorEmail = () => {
    return email.dirty && email.value === '';
  };

  const handleRequiredError = () => {
    return password.dirty && password.value === '';
  };

  return (
    <div className="login-container">
      <div className="square">
        <i style={{ '--clr': '#00f0ff' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>
      </div>
      <div className="login-form">
        <h1>Seja Bem-Vindo!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="emailInput">Email</label>
            <input
              value={email.value}
              onChange={handleEmail}
              id="emailInput"
              type="email"
              placeholder="Digite seu email"
            />
            {handleErrorEmail() && <h5 className="error">Email inválido</h5>}
          </div>

          <div className="input-box">
            <label htmlFor="passwordInput">Senha</label>
            <input
              value={password.value}
              onChange={handlePassword}
              id="passwordInput"
              type="password"
              placeholder="Digite sua senha"
            />
            {handleRequiredError() && <h5 className="error">Campo obrigatório</h5>}
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
