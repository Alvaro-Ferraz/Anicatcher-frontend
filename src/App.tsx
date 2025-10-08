import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails"; // Importe a nova página
import { AnimeSearchPage } from "./pages/AnimeSearchPage"; // Importe a página de pesquisa

export const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/anime/:id', 
            element: <AnimeDetails />
        },
        {
            path: '/anime/search',
            element: <AnimeSearchPage />
        }
    ]);

    return <RouterProvider router={router} />;
};

export default App;