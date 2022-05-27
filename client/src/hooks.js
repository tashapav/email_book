import React, { useCallback, useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import EmailsPage from "./pages/EmailsPage/EmailsPage"
import AuthPage from "./pages/AuthPage/AuthPage"

export const routesHook = (isLogin) => {

    if (isLogin) { 
        return(
            <Routes>
                <Route path="/" element={<EmailsPage />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path="/*" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export const useAuth = () => {

    const [user, setUser] = useState()

    const login = useCallback((user) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }, [])

    const logout = useCallback(() => {
        setUser()
        localStorage.removeItem('user')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            login(data)
        }
    }, [login])

    return {user, login, logout}
}

