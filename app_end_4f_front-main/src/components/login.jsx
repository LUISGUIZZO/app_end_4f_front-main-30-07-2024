import { useState } from "react";
import useAuth from '../components/useAuth'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";

const FormularioLogin = () => {
    const [usuario_email, setUsuarioEmail] = useState("");
    const [usuario_senha, setUsuarioSenha] = useState("");
    const [lembrar, setLembrar] = useState(false); // Estado para lembrar-se de mim
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (usuario_email.trim() === "" || usuario_senha.trim() === "") {
            setError("Preencha todos os campos!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario_email, usuario_senha })
            });
            
    
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                login();
                window.location.href = '/agendamento'
            } else {
                setError("Usuário ou senha inválidos!");
            }
        } catch (error) {
            setError("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <section className="vh-100" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20201010/pngtree-abstract-system-technology-background-image_409296.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2 className="mb-4">Faça o Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="username" className="form-control form-control-lg" value={usuario_email} onChange={(e) => setUsuarioEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="username">NOME DE USUÁRIO</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="senha" className="form-control form-control-lg" value={usuario_senha} onChange={(e) => setUsuarioSenha(e.target.value)} />
                                    <label className="form-label" htmlFor="senha">SENHA</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input type="checkbox" className="form-check-input" id="lembrar" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="lembrar">Lembre-se de mim</label>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>
                                    <a href='http://localhost:5173/user' className="text-decoration-none mt-3">Ainda não possui login? Cadastre-se aqui</a>
                                    <a href='http://localhost:5173/prestadores' className="text-decoration-none mt-3">Cadastre-se como um Prestador de Serviços</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer className="text-center mt-4">Todos os direitos reservados.</footer>
            </section>
            
        </>
    );
};

export default FormularioLogin;