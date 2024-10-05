import React from "react";
import "./Faq-view.scss";

import { useForm } from "react-hook-form";
import { InputSimple } from "../../ui/components/inputs/InputSimple.jsx";
//import { Button } from "../../ui/components/buttons/button.jsx";
import Select from "react-select";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const options = [
    { value: "Sistema", label: "Sistema" },
    { value: "Cadastro", label: "Cadastro" },
    { value: "Matrícula", label: "Matrícula" },
    { value: "Pergunta", label: "Pergunta" },
  ];

  return (
    <>
      <div className="contact-page d-flex">
        <section className="contact-form-container">
          <div className="contact-form">
            <h1>Enviar uma Solicitação</h1>
            <form>
              <InputSimple
                type="text"
                titulo="E-Mail"
                placeholder="digite seu e-mail"
                registerOptions={register("email", {
                  required: true,
                })}
                errors={errors.email}
              />
              <div className="select-input-container">
                <label>Tipo do problema</label>
                <Select
                  options={options}
                  placeholder="Tipo do problema"
                  className="selectAlert"
                />
              </div>
              <div className="input-textarea">
                <label>Descrição</label>
                <textarea
                  placeholder="Descreva o problema que você está enfrentando"
                  {...register("description", { required: true })}
                ></textarea>
              </div>
            </form>
          </div>
        </section>
        <aside className="contact-awnsers-container">
          <h1>Perguntas Frequentes</h1>
          <ul className="contacts-list">
            <li>
              <div className="contact-head">
                <h3>Como faço para me cadastrar?</h3>
              </div>
              <div className="contact-content">
                <p>
                  Para se cadastrar basta clicar no botão "Cadastrar" e
                  preencher os campos solicitados. Caso tudo ocorra bem você irá
                  receber uma notificação de confirmação.
                </p>
              </div>
            </li>
            <li>
              <div className="contact-head">
                <h3>Como faço para me cadastrar?</h3>
              </div>
              <div className="contact-content">
                <p>
                  Para se cadastrar basta clicar no botão "Cadastrar" e
                  preencher os campos solicitados. Caso tudo ocorra bem você irá
                  receber uma notificação de confirmação.
                </p>
              </div>
            </li>
            <li>
              <div className="contact-head">
                <h3>Como faço para me cadastrar?</h3>
              </div>
              <div className="contact-content">
                <p>
                  Para se cadastrar basta clicar no botão "Cadastrar" e
                  preencher os campos solicitados. Caso tudo ocorra bem você irá
                  receber uma notificação de confirmação.
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Contact;
