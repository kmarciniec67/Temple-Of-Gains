import React from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register_Page = () =>{
    const Navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // validate errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => {
        const tempErrors = { ...prev };

        if (name === "username") {
            if (!value.trim()) {
            tempErrors.username = "Nazwa użytkownika jest wymagana.";
            } else if (value.length < 5) {
            tempErrors.username =
                "Nazwa użytkownika musi mieć co najmniej 5 znaków.";
            } else {
            delete tempErrors.username;
            }
        }

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
            tempErrors.email = "E-mail jest wymagany.";
            } else if (!emailRegex.test(value)) {
            tempErrors.email = "Nieprawidłowy format e-mail.";
            } else {
            delete tempErrors.email;
            }
        }

        if (name === "password") {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]).{8,}$/;
            if (!values.password) {
                tempErrors.password = "Hasło jest wymagane.";
            } else if (!strongPasswordRegex.test(values.password)) {
                tempErrors.password = "Hasło musi mieć min. 8 znaków, zawierać conajmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";
            } else {
            delete tempErrors.password;
            }
        }

        if (name === "confirmPassword") {
            if (!value) {
            tempErrors.confirmPassword = "Potwierdzenie hasła jest wymagane.";
            } else if (value !== values.password) {
            tempErrors.confirmPassword = "Hasła muszą być identyczne.";
            } else {
            delete tempErrors.confirmPassword;
            }
        }

        return tempErrors;
        });
    };

    const validate = () => {
        let tempErrors = {};

        if (!values.username.trim()) {
            tempErrors.username = "Nazwa użytkownika jest wymagana.";
        } else if (values.username.length < 5) {
            tempErrors.username = "Nazwa użytkownika musi mieć co najmniej 5 znaków.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!values.email.trim()) {
            tempErrors.email = "E-mail jest wymagany.";
        } else if (!emailRegex.test(values.email)) {
            tempErrors.email = "Nieprawidłowy format e-mail.";
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]).{8,}$/;
        if (!values.password) {
            tempErrors.password = "Hasło jest wymagane.";
        } else if (!strongPasswordRegex.test(values.password)) {
            tempErrors.password = "Hasło musi mieć min. 8 znaków, zawierać conajmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";
        }

        if (!values.confirmPassword) {
            tempErrors.confirmPassword = "Potwierdzenie hasła jest wymagane.";
        } else if (values.confirmPassword !== values.password) {
            tempErrors.confirmPassword = "Hasła muszą być identyczne.";
        }

        setErrors(tempErrors);

        // jak brak bledow to
        return Object.keys(tempErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) console.log("Validation failed");
        else {
            // wyslij do bazki
            console.log("Form submitted successfully");

            // if validate true, go to app 
            Navigate("/dashboard");
        }
    };

    return(
        <div className="loginBackground">
        <div className="loginContent">
        <Link to="/" className="logoLink">
            <img src="/images/logo.png" alt="TEMPLE OF GAINS" className="loginLogo" />
        </Link>
        <div className="loginBox">
            <h2>REJESTRACJA</h2>
            <form className="loginForm" autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor ="username">Nazwa użytkownika</label>
                <input 
                    id="username" 
                    type="text" 
                    placeholder="nazwa użytkownika" 
                    name="username" 
                    value={values.username} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.username && <span className="error" style={{color: "red"}}>{errors.username}</span>}
                <label htmlFor ="email">Adres e-mail</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="adres e-mail" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.email && <span className="error" style={{color: "red"}}>{errors.email}</span>}
                <label htmlFor ="password">Hasło</label>
                <input 
                    id="password"
                    type="password" 
                    name="password"
                    placeholder="hasło" 
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.password && <span className="error" style={{color: "red"}}>{errors.password}</span>}
                <label htmlFor ="confirm-password">Potwierdź hasło</label>
                <input 
                    id="confirm-password" 
                    type="password" 
                    name="confirmPassword"
                    placeholder="potwierdź hasło" 
                    value={values.confirmPassword} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.confirmPassword && <span className="error" style={{color: "red"}}>{errors.confirmPassword}</span>}
            
            <button type="submit" className="logRegGoToBtn" onClick={testFn}>Zarejestruj się!</button></form>
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