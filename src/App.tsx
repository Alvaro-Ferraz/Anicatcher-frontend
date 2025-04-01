import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

export const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App; 