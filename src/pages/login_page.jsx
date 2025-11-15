import React, { useState } from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";

const Login_Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Błąd logowania');
        return;
      }

      console.log('Zalogowano:', data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Błąd połączenia z serwerem');
      console.error(err);
    }
  };

  return (
    <div className="loginBackground">
      <div className="loginContent">
        <Link to="/" className="logoLink">
          <img src="/images/logo.png" alt="TEMPLE OF GAINS" className="loginLogo" />
        </Link>
        <div className="loginBox">
          <h2>LOGOWANIE</h2>
          <form className="loginForm" onSubmit={handleLogin} autoComplete="off">
            <label htmlFor="username">Nazwa użytkownika</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="login"
            />
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="haslo"
            />

            <button type="submit" className="logRegGoToBtn">Zaloguj!</button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>Nie posiadasz konta? <Link to="/register">Zarejestruj się!</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login_Page;
