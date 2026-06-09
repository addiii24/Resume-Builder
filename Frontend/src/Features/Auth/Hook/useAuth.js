import {AuthContext} from "../Auth.context"
import { useContext } from "react"
import { loginuser, registeruser, logoutuser, getmeuser } from "../Services/Auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    
    const {user, setuser, loading, setLoading} = context

    const handlelogin = async ({email,password}) => {
        try {
            setLoading(true)
            const res = await loginuser({email,password})
            setuser(res.user)         
            return res
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const handleregister = async ({username,email,password}) => {
        try {
            setLoading(true)
            const res = await registeruser({username,email,password})
            setuser(res.user)         
            return res
        } catch (error) {
            console.log(error)   
        } finally{
            setLoading(false)
        }
    }

    const handlelogout = async () => {
        try {
            setLoading(true)
            const res = await logoutuser()
            setuser(null)           
               return res
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const handlegetme = async () => {
        try {
            setLoading(true)
            const res = await getmeuser()
            setuser(res.user)         
            return res
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    return {
        user,
        setuser,
        loading,
        setLoading,
        handlelogin,
        handleregister,
        handlelogout,
        handlegetme
    }
}
