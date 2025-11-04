import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Login_Page = () =>{
    return(
        <div className="loginBackground">
            <div className="loginContent">
            <Link to="/start_page" className="logoLink">
                <img src="/images/logo.png" alt="TEMPLE OF GAINS" className="loginLogo" />
            </Link>
            <div className="loginBox">
                <h2>LOGOWANIE</h2>
                <form className="loginForm" autoComplete="off">
                    <label htmlFor ="username">Nazwa użytkownika</label>
                    <input id="username" type="text" placeholder="login"></input>
                    <label htmlFor ="password">Hasło</label>
                    <input id="password" type="password" placeholder="haslo"></input>
                </form>

                <Link to="/dashboard" className="logRegGoToBtn" onClick={testFn}>Zaloguj!</Link>
                <p>Nie posiadasz konta? <Link to="/register">Zarejestruj się!</Link></p>
            </div>
            </div>
        </div>
    );
}

function testFn(){
    console.log("Test login");
}

export default Login_Page;