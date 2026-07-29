import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import UsersPage from "./pages/UsersPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
