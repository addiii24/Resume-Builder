import { RouterProvider } from "react-router-dom"
import { router } from "./App.routes"
import {Authprovider} from "./Features/Auth/Auth.context"

const App = () => {
  return (
    <>
    <Authprovider>
      <RouterProvider router={router} />
      </Authprovider>
    </>
  )
}

export default App