import { Link } from "react-router-dom";
import useAuth from "./useAuth";




const MenuSuperior = () => {
  const{logout}= useAuth();
  return (
    <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '	#2F4F4F' }}>
      <div className="container">
         <button onClick={logout} className="navbar-brand">Logout</ button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/prestadores" className="nav-link">Cadastrar Prestador</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/agendamento" className="nav-link">Agendamentos</Link>
          </li>
          <li className="nav-item">
            <Link to="/usuario" className="nav-link">Cadastrar Usuário</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;