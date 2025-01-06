import { Children, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext()

export const useAuthContext = () => { //^ using the context(called wherever we want to use the context)
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => { //^ filling the values to be used in the context
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/auth/check",{credentials:"include"})
                const data = await res.json()
                setAuthUser(data.user) //^ can be null or the authenticated user object
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        checkUserLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={{authUser, setAuthUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}