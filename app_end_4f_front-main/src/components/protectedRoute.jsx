import { Navigate } from 'react-router-dom';
import useAuth from './useAuth'; // Ajuste o caminho conforme necessário

const ProtectedRoute = ({ children }) => {
    const { autenticado } = useAuth();
    return autenticado ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;