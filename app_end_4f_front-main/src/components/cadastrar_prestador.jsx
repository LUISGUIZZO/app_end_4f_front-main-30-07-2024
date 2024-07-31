import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Cadastrar_prestador = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      // Cadastrar o cliente primeiro
      const responsePrestador = await api.post("prestador", {
        prestador_nome: campos.prestador_nome,
        prestador_cnpj: campos.prestador_cnpj,
        prestador_cpf: campos.prestador_cpf,
        prestador_razaoSocial: campos.prestador_razaoSocial,
        prestador_email: campos.prestador_email,
        prestador_senha: campos.prestador_senha,
        
      });

      const prestadorId = responsePrestador.data.prestador_id; // Supondo que a resposta do servidor inclui o ID do cliente
      console.log(prestadorId);
      // Cadastrar o telefone do cliente
      await api.post("telefone", {
       
          telefone_numero: campos.telefone_numero,
          prestador:{
            prestador_id: prestadorId
          },
      });

      setAviso("Prestador cadastrado com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar prestador!");
    }
  };

  return (
    <><Helmet>
      <title>Cadastro de Prestadores</title>
    </Helmet>
    <div className="container p-5 bg-light text-dark rounded" style={{ borderColor: "#2F4F4F	", borderWidth: "20px", borderStyle: "solid" }}> 
        <div className="container p-5 bg-light text-dark rounded">
          <h4 className="fst-italic mb-3">Preencha os campos para se cadastrar</h4>
          <form onSubmit={handleSubmit(salvar)}>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_nome">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_nome"
                  required
                  autoFocus
                  {...register("prestador_nome")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_cnpj">CNPJ:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_cnpj"
                  
                  autoFocus
                  {...register("prestador_cnpj")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_cpf">CPF:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_cpf"
                  required
                  autoFocus
                  {...register("prestador_cpf")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefone"
                  required
                  autoFocus
                  {...register("telefone_numero")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="prestador_email"
                  required
                  {...register("prestador_email")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_razaoSocial">Razão Social:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_razaoSocial"
                  
                  {...register("prestador_razaoSocial")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_senha">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="prestador_senha"
                  required
                  {...register("prestador_senha")}
                />
              </div>
              {/* <div className="col">
                <label htmlFor="rua">Rua:</label>
                <input
                  type="text"
                  className="form-control"
                  id="rua"
                  required
                  autoFocus
                  {...register("rua")}
                />
              </div>
              <div className="col">
                <label htmlFor="cidade">Cidade:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cidade"
                  required
                  autoFocus
                  {...register("cidade")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="estado">Estado:</label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  required
                  autoFocus
                  {...register("estado")}
                />
              </div>
              <div className="col">
                <label htmlFor="pais">País:</label>
                <input
                  type="text"
                  className="form-control"
                  id="pais"
                  required
                  autoFocus
                  {...register("pais")}
                />
              </div>
              <div className="col">
                <label htmlFor="cep">CEP:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  required
                  autoFocus
                  {...register("cep")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="numero">Número:</label>
                <input
                  type="number"
                  className="form-control"
                  id="numero"
                  required
                  autoFocus
                  {...register("numero")}
                />
              </div>
              <div className="col">
                <label htmlFor="complemento">Complemento:</label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  required
                  autoFocus
                  {...register("complemento")}
                />
              </div> */}
            </div>
            <input
              type="submit"
              className="btn btn-primary mt-3"
              value="Cadastrar"
            />
            <input
              type="reset"
              className="btn btn-danger mt-3 ms-3"
              value="Cancelar"
            />
          </form>
          <div className="alert mt-3">{aviso}</div>
        </div>
      </div>
    </>
  );
};

export default Cadastrar_prestador;
