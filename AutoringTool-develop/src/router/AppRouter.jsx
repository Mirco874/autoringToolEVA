import { Route, Routes } from "react-router-dom"
import { AuthoringToolRoutes } from "../AuthoringTool/routes/AuthoringToolRoutes"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/"  element={<AuthoringToolRoutes/>}/>
        </Routes>
    </>
  )
}
