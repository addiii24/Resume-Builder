import { createBrowserRouter } from "react-router-dom"
import Login from "./Features/Auth/Pages/Login"
import Register from "./Features/Auth/Pages/Register"
import Home from "./Features/Auth/Pages/Home"
import Protected from "./Features/Auth/Components/Protected"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: 
        <Protected>
            <Home />
        </Protected>
    }
])