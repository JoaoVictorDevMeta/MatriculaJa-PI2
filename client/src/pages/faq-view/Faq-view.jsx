import React, {useState, useEffect, useRef} from "react";
import "./Faq-view.scss";
import Swal from "sweetalert2";

//data
import useFetchComunicacoes from "../../data/hooks/useComunicacoes.jsx";
import useCloseComunicacao from "../../data/hooks/useCloseComunicacao.jsx";
import useAddAwnser from "../../data/hooks/useAddAwnser.jsx";
//icons
import { IoIosArrowForward } from "react-icons/io";
import LoadingScreen from "../../ui/components/loading/LoadingScreen.jsx";
import { IoClose } from "react-icons/io5";

const Faqv = () => {
  const { data, loading, error } = useFetchComunicacoes();
  const { execute, error:closeError } = useCloseComunicacao();
  const { execute:executeAwnser, isLoading } = useAddAwnser();
  const [actualMessage, setActualMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const titleRef = useRef(null);
  const answerRef = useRef(null);

  //todas as comunicações
  //para o usuario em questão
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  if(loading){
    return <LoadingScreen/>
  }
  if(error || !data){
    return <div>Erro: {error ? error : 'nenhum resultado encontrado'}</div>
  }

  //função de descartar comunicação
  const handleDiscard = async(id) => {
    await execute(id);
    if(!closeError){
      return Swal.fire({
        title: "Erro",
        text: closeError,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setMessages(messages.filter((message) => message.id !== actualMessage.id));
    setActualMessage(null);
    setOpenForm(false);
  };

  //para busca de comunicação específica
  const filteredMessages = messages.filter((item) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      (item.email_contato && item.email_contato.toLowerCase().includes(searchLower)) ||
      (item.tipo && item.tipo.toLowerCase().includes(searchLower))
    );
  });

  //paginação
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  //função para resposta
  const handleAwnser = async () => {
    //dados no formulario
    const subtitulo = titleRef.current.value;
    const resposta = answerRef.current.value;
    const contactEmail = actualMessage.email_contato;
    //extraindo um nome
    const atIndex = contactEmail.indexOf('@');
    const dotIndex = contactEmail.indexOf('.');
    let firstIndex = contactEmail.length;
    if (atIndex !== -1) {
      firstIndex = atIndex;
    }
    if (dotIndex !== -1 && dotIndex < firstIndex) {
      firstIndex = dotIndex;
    }
    //preparandos dados
    const contactName = contactEmail.substring(0, firstIndex);
    const sendData = {
      subtitulo,
      resposta,
      contactEmail,
      contactName,
    }

    try {
      const response = await executeAwnser(sendData, actualMessage.id);
      if(response.error){ // para entrar no catch
        throw new Error(response.error)
      }

      await Swal.fire({
        title: `Resposta enviada para ${contactName}`,
        text: `Título: ${subtitulo}\nResposta: ${resposta}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      await Swal.fire({
        title: "Erro",
        text: err || "Algo deu errado",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setOpenForm(false);
    }
  }

  return (
    <>
      <div className="contact-manage-page d-flex">
        <section className="manage-contacts-section">
          <div className="head">
            <h2>Monitoramento de Contatos</h2>
          </div>
          <div className="manage-container">
            <div className="manage-search">
              <input
                type="text"
                placeholder="Buscar mensagem"
                id="serach-contact"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <label htmlFor="search-contact">Email ou categoria</label>
            </div>
            <ul className="manage-list">
              {currentMessages?.length ? currentMessages.map((message) => (
                <li
                  key={message.id}
                  className={
                    "message-item " +
                    (actualMessage?.id === message.id ? "active" : "")
                  }
                  onClick={() => {
                    if (actualMessage?.id === message.id) {
                      setActualMessage(null);
                      return;
                    }
                    setOpenForm(false);
                    setActualMessage(message);
                  }}
                >
                  <div className="info">
                    <h5>{message.email_contato}</h5>
                    <p>{message.descricao?.substring(0, 30) + "..."}</p>
                  </div>
                  <IoIosArrowForward />
                  {/* <div className="has-read-notf"></div> */}
                </li>
              )) : <h1 className="no-title">Nenhuma mensagem</h1>}
            </ul>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
        <aside className="contact-manage-details">
          {actualMessage ? (
            <>
              <div className="head">
                <h2>Monitoramento de Contatos</h2>
              </div>
              <div className="contact-container">
                <div className="contact-content">
                  <div className="info">
                    {actualMessage?.respostas?.length ? <span className="fw-bold">Respondido</span> : null}
                    <h4>{actualMessage?.email_contato}</h4>
                    <h5>{actualMessage?.tipo}</h5>
                  </div>
                  <div className="content">
                    <p>{actualMessage?.descricao}</p>
                  </div>
                  <div className="actions">
                    {!openForm ? (
                      <>
                        <button
                          className="sample-button"
                          onClick={() => {
                            setOpenForm(true);
                          }}
                        >
                          Reponder
                        </button>
                        <button
                          className="simple-button"
                          onClick={() => {handleDiscard(actualMessage?.id)}}
                        >
                          <IoClose /> Descartar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="sample-button"
                          disabled={isLoading}
                          onClick={() => {
                            handleAwnser();
                          }}
                        >
                          {isLoading ? '...' : 'Enviar'}
                        </button>
                        <button
                          className="simple-button"
                          onClick={() => {
                            setOpenForm(false);
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>

                  {openForm && (
                    <form>
                      <label htmlFor="subtitle">Título</label>
                      <input type="text" id="subtitle" name="subTitle" ref={titleRef}/>
                      <label htmlFor="awnser-input">Resposta</label>
                      <textarea
                        name="awnser"
                        id="awnser-input"
                        placeholder="resposta para a mensagem"
                        ref={answerRef}
                      ></textarea>
                    </form>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="head">
                <h2>Monitoramento de Contatos</h2>
              </div>
              <div className="no-message">
                { currentMessages?.length ? <h1>Selecione uma mensagem</h1>: <h1 className="mb-5">Nenhuma mensagem</h1>}
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default Faqv;