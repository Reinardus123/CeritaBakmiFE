import { createRoot } from 'react-dom/client'
import "./assets/style/index.css";
import App from './App.jsx';
import { AuthProvider } from './Navbar/Context.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
