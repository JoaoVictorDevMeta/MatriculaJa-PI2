//componentes do react, estilo e externo
import React from "react";
import Swal from "sweetalert2";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//components criados por nós
import LogoMatricula from "../../assets/LogoMatriculaSVG.svg";
import LogoBlack from "../../assets/logoBlack.svg";
import { InputSimple } from "../../ui/components/inputs/InputSimple.jsx";
import { InputCheck } from "../../ui/components/inputs/InputCheck.jsx";
import { Button } from "../../ui/components/buttons/button.jsx";

//hooks, NAO MECHER
import useAuth from "../../data/hooks/useAuth.jsx";

const Login = () => {
  //essa parte do codigo é a base para o envio do formulário
  const { isLoading, error, data, execute: Login } = useAuth();
  const navigate = useNavigate();
  //requisitos de formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const userLogin = (data) => {
    // chama a funcao de login
    Login(data.email, data.password);
  };

  if (data) {
    Swal.fire({
      icon: "success",
      title: "Login efetuado com sucesso",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  }

  return (
    <>
      <section className="login-container">
        <Link to="/" className="logo">
          <img src={LogoBlack} alt="Logo Matricula Já" />
        </Link>
        <div className="container-xl p-0">
          <div className="info d-flex justify-content-center">
            <Link to="/">
              <img src={LogoMatricula}></img>
            </Link>
            <p>Seja bem vindo ao Matricula Já</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit(userLogin)}>
              <h1 className="text-center">Login para conta</h1>
              <hr />
              <InputSimple
                type="text"
                titulo="E-Mail"
                placeholder="digite seu e-mail"
                registerOptions={register("email", {
                  required: true,
                })}
                errors={errors.email}
              />
              <InputSimple
                type="password"
                titulo="Senha"
                placeholder="coloque sua senha"
                registerOptions={register("password", {
                  required: true,
                })}
                errors={errors.password}
              />
              <div className="options d-flex justify-content-between w-100 pb-5 text-center">
                <InputCheck message="Lembre de mim" />
                <Link to="/recuperar-senha">Esqueceu a senha?</Link>
              </div>
              <Button color="primary" estilo="sample">
                {isLoading ? "..." : "Logar"}
              </Button>
              {error?.fail && (
                <div
                  class="alert alert-warning mt-4 w-100 text-center"
                  role="alert"
                >
                  {error.fail}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
