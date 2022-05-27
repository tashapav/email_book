import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context";

function Login({setError}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(UserContext)

    const log = async () => {
        try {
            await axios.post('/api/login',
            {email: email, password: password},
            {headers: {
                'Content-Type': 'application/json'
            }}
            )
            .then(res => login(res))
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.message)
                }
            })
        } catch (err) {
            console.log(err)
        }
        setEmail('')
        setPassword('')
    }

    return(
        <>
            <h3>Авторизация</h3>
            <form className='form' onSubmit={(e) => e.preventDefault()}>
                <div className='form-inputs'>
                    <p>Если вы еще ни разу не заходили в Email Book со своей почты, зарегистрируйтесь.</p>
                    <label htmlFor='email'>Ведите свою почту</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='password'>Введите пароль почты *или пароль для внешнего приложения для Mail почты*</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button className='btn btn-h' onClick={log}>Войти</button>
                    <Link to='/registration' className='btn-auth btn-h'>Перейти к регистрации</Link>
                </div>
            </form>
        </>
    )
}

export default Login