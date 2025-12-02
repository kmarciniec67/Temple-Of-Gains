import React from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register_Page = () =>{
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // validate errors
    const [passwordTouched, setPasswordTouched] = useState(false); // hints

    const validateField = (name, value, allValues) => {
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
            if (!value) {
                tempErrors.password = "Hasło jest wymagane.";
            } else if (!strongPasswordRegex.test(value)) {
                tempErrors.password = "Hasło musi mieć min. 8 znaków, zawierać co najmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";
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
    }

    const getPasswordChecks = (password) => ({
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        digit: /\d/.test(password),
        special: /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?]/.test(password),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => {
            const newValues = { ...prev, [name]: value };
            validateField(name, value, newValues);
            return newValues;
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value, values);
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
            tempErrors.password = "Hasło musi mieć min. 8 znaków, zawierać co najmniej jedną wielką literę, jedną cyfrę i jeden znak specjalny.";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            console.log("Validation failed");
            setErrors(prev => ({ ...prev, general: "Aby utworzyć konto, musisz poprawić pola w formularzu." }));
            return;
        } 
        
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // błąd zwrócony przez backend (np. zajęty login / email)
                setErrors({ general: data?.error || 'Błąd rejestracji' });
                console.error('Register error:', data);
                alert("Error: " + (data?.error || 'Błąd rejestracji'));
                return;
            }

            console.log('Rejestracja udana:', data);
            alert("Rejestracja udana! Dziękujemy za założenie konta.");

            // opcjonalnie: zapis usera jak przy logowaniu
            if (data?.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            navigate('/dashboard');
            
        } catch (err) {
            console.error('Error during registration:', err);
            setErrors({ general: 'Błąd połączenia z serwerem' });
        }

    }
    
    const passwordChecks = getPasswordChecks(values.password); // password hints
    const isPasswordStrong = Object.values(passwordChecks).every(Boolean); // if strong, hints clears
    ;

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
                {errors.username && <span className="error">{errors.username}</span>}
                <label htmlFor ="email">Adres e-mail</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="adres e-mail" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor ="password">Hasło</label>
                <input 
                    id="password"
                    type="password" 
                    name="password"
                    placeholder="hasło" 
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    onFocus={() => setPasswordTouched(true)}></input>
                {errors.password && <span className="error">{errors.password}</span>}
                {passwordTouched && values.password && !isPasswordStrong && (
                    <ul className="passwordHints">
                        <li className={passwordChecks.length ? "ok" : "bad"}>
                        {passwordChecks.length ? "✓" : "✗"} min. 8 znaków
                        </li>
                        <li className={passwordChecks.upper ? "ok" : "bad"}>
                        {passwordChecks.upper ? "✓" : "✗"} co najmniej jedna wielka litera
                        </li>
                        <li className={passwordChecks.lower ? "ok" : "bad"}>
                        {passwordChecks.lower ? "✓" : "✗"} co najmniej jedna mała litera
                        </li>
                        <li className={passwordChecks.digit ? "ok" : "bad"}>
                        {passwordChecks.digit ? "✓" : "✗"} co najmniej jedna cyfra
                        </li>
                        <li className={passwordChecks.special ? "ok" : "bad"}>
                        {passwordChecks.special ? "✓" : "✗"} znak specjalny (!@#$…)
                        </li>
                    </ul>
                )}
                <label htmlFor ="confirm-password">Potwierdź hasło</label>
                <input 
                    id="confirm-password" 
                    type="password" 
                    name="confirmPassword"
                    placeholder="potwierdź hasło" 
                    value={values.confirmPassword} 
                    onChange={handleChange} 
                    onBlur={handleBlur}></input>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            
            <button type="submit" className="logRegGoToBtn">Zarejestruj się!</button></form>
            {errors.general && <span className="error">{errors.general}</span>}
            
            <p>*Zakładając konto akceptujesz regulamin.</p>
            <span className="noAccount">
                Masz już konto?&nbsp;
                <Link to="/login">Zaloguj się!</Link>
            </span>
        </div>
        </div>
    </div>
    );
}

export default Register_Page;