import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Register_Page = () =>{
    return(
        <div className="loginBackground">
        <div className="loginContent">
        <Link to="/start_page" className="logoLink">
            <img src="/images/logo.png" alt="TEMPLE OF GAINS" className="loginLogo" />
        </Link>
        <div className="loginBox">
            <h2>REJESTRACJA</h2>
            <form className="loginForm" autoComplete="off">
                <label htmlFor ="username">Nazwa użytkownika</label>
                <input id="username" type="text" placeholder="nazwa użytkownika"></input>
                <label htmlFor ="email">Adres e-mail</label>
                <input id="email" type="email" placeholder="adres e-mail"></input>
                <label htmlFor ="password">Hasło</label>
                <input id="password" type="password" placeholder="hasło"></input>
                <label htmlFor ="confirm-password">Potwierdź hasło</label>
                <input id="confirm-password" type="password" placeholder="potwierdź hasło"></input>
            </form>

            <Link to="/dashboard" className="logRegGoToBtn" onClick={testFn}>Zarejestruj się!</Link>
            <p>*Zakładając konto akceptujesz regulamin.</p>
        </div>
        </div>
    </div>
    );
}

function testFn(){
    console.log("Test register");
}

export default Register_Page;