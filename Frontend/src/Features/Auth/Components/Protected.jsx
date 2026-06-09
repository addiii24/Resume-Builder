import {useAuth} from "../Hook/useAuth"
import {Navigate} from "react-router-dom"

const Protected = ({children}) => {
  const {user, loading} = useAuth()

  if(loading){
    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                <h1 className="text-2xl font-bold text-white">Loading...</h1>
            </div>
        </main>
    )
  }
  if(!user){
        return <Navigate to={'/'}  />
  } 
  return children
}

export default Protected