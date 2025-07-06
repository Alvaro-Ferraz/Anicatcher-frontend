import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails"; // Importe a nova página
import { AnimeSearch } from "./pages/AnimeSearch"; // Importe a página de pesquisa

export const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/anime/:id', // Nova rota com parâmetro mal_id
            element: <AnimeDetails />
        },
        {
            path: '/anime/search', // Rota para pesquisa de animes
            element: <AnimeSearch />
        }
    ]);

    return <RouterProvider router={router} />;
};

export default App;