import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Login_Page = () =>{
    return(
        <div className="loginBackground">
            <div className="loginBox">
                <h2>LOGOWANIE</h2>
                <form className="loginForm">
                    <input id="login" type="login" placeholder="login"></input>
                    <br></br>
                    <input id="haslo" type="password" placeholder="haslo"></input>
                </form>

                <Link to="/dashboard" className="logRegGoToBtn" onClick={testFn}>Zaloguj!</Link>
                <p>Nie posiadasz konta? <Link to="/register">Zarejestruj się!</Link></p>
            </div>
        </div>
    );
}

function testFn(){
    console.log("Test login");
}

export default Login_Page;