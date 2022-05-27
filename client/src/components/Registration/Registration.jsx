import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

function Registration({setError}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registration = async () => {
        try {
            await axios.post('/api/registration',
            {email: email, password: password},
            {headers: {
                'Content-Type': 'application/json'
            }}
            )
            .then(res => console.log(res))
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
            <h3>Регистрация</h3>
            <form className='form' onSubmit={(e) => e.preventDefault()}>
                <div className='form-inputs'>
                <p>Для регистрации используйте логин и пароль почты (или логин и пароль для внешнего приложения для почты Mail).</p>
                    <label htmlFor='email'>Ведите свою почту</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='password'>Введите пароль почты *или пароль для внешнего приложения для Mail почты*</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button className='btn btn-h' onClick={registration} >Зарегистрироваться</button>
                    <Link to='/login' className='btn-auth btn-h'>Перейти к авторизации</Link>
                </div>
            </form>
        </>
    )
}

export default Registration