import { createContext, useEffect, useState } from "react"
import { getmeuser } from "./Services/Auth.api"

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const Authprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true) // true initially so we wait for session check

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const res = await getmeuser()
                setuser(res?.user ?? null)
            } catch {
                setuser(null)
            } finally {
                setLoading(false)
            }
        }
        restoreSession()
    }, [])
    
    return (
        <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}