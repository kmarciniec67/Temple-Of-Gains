import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Register_Page = () =>{
    return(
        <div className="loginBackground">
        <div className="loginBox">
            <h2>REJESTRACJA</h2>
            <h3>TEMPLE_ OF GAINS</h3>
            <form className="loginForm">
                <input id="login" type="login" placeholder="login"></input>
                <br></br>
                <input id="login" type="email" placeholder="email"></input>
                <br></br>
                <input id="haslo" type="password" placeholder="haslo"></input>
            </form>

            <Link to="/dashboard" className="logRegGoToBtn" onClick={testFn}>Zarejestruj się!</Link>
            <p>*Zakładając konto akceptujesz regulamin.</p>
        </div>
    </div>
    );
}

function testFn(){
    console.log("Test register");
}

export default Register_Page;