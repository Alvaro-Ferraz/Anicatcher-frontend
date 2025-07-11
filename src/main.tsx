import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "./index.css"
import { UIProvider } from './context/UI/UIContext'

createRoot(document.getElementById('root')!).render(
    <UIProvider>
        <App />
    </UIProvider>
);