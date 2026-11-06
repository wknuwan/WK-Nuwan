import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto-register service worker for PWA offline caching & desktop installability
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);

