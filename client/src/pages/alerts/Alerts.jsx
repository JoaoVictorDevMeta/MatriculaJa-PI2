import React, { useEffect, useState } from "react";
import "./Alerts.scss";

//data
import useFetchAlerts from "../../data/hooks/useAlerts.jsx";

//components
import Select from "react-select";
import LoadingScreen from "../../ui/components/loading/LoadingScreen.jsx";
//usando react select para facilitar a seleção de opções
//para documentação visitar <https://react-select.com/home>
import { CategoryItem } from "../../ui/partials/alerts/CategoryItem";
import { AlertItem } from "../../ui/partials/alerts/AlertItem";
import { filterDate } from "../../ui/partials/alerts/filterDate";

const Alerts = () => {
  const [currentAlert, setCurrentAlert] = useState(""); //seleciona categoria do alerta
  const [currentBox, setCurrentBox] = useState(null); //aplica a categoria selecionada
  const [currentUser, setCurrentUser] = useState(null); //filtro de tipo de usuário
  const [currentDateStart, setcurrentDateStart] = useState(null);
  const [currentDateEnd, setcurrentDateEnd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // current page for pagination
  const itemsPerPage = 6; // max items per page
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { data: alertas, loading, error } = useFetchAlerts();
  //console.log(alertas)

  const options = [
    { value: null, label: "nenhum" },
    { value: "TODOS", label: "Todos (somente)" },
    { value: "ALUNOS", label: "Aunos" },
    { value: "ESCOLAS", label: "Escolas" },
  ];

  if (loading) {
    return <LoadingScreen />;
  } else {
    const handleDate = () => {
      //console.log(currentDateStart)
      const datastart = document.querySelector("#std-from-table");
      if (datastart.value) {
        let listastd = datastart.value.split("-");
        setcurrentDateStart(listastd);
      } else {
        setcurrentDateStart(null);
      }
      const dataend = document.querySelector("#end-from-table");
      if (dataend.value) {
        let listaend = dataend.value.split("-");
        setcurrentDateEnd(listaend);
      } else {
        setcurrentDateEnd(null);
      }
      setCurrentPage(1);
    };

    const resetDate = () => {
      document.querySelector("#std-from-table").value = "";
      document.querySelector("#end-from-table").value = "";
      setcurrentDateStart(null);
      setcurrentDateEnd(null);
      setCurrentPage(1);
    };

    //funcao necessaria para trocar usuario
    const handleChange = (selectedOption) => {
      setCurrentUser(selectedOption.value);
      setCurrentPage(1);
    };

    // Calculate the filtered alerts
    const filteredAlerts = alertas
      ?.filter((item) => currentAlert === "" || item.tipo === currentAlert)
      ?.filter(
        (item) => currentUser === null || item.target_group === currentUser
      )
      ?.filter((item) => {
        return filterDate(currentDateStart, currentDateEnd, item.data);
      });

    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlerts = filteredAlerts.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    // Handle next page
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    // Handle previous page
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <>
        <div className="alert-info">
          <h2>Alertas</h2>
          <p>Consulte seus avisos e mensagens</p>
          <ul className="category-list">
            <CategoryItem
              title="Importante"
              color="#A02334"
              alertas={alertas}
              currentAlert={currentAlert}
              setCurrentAlert={(alert) => {
                setCurrentAlert(alert);
                setCurrentPage(1);
              }}
            />
            <CategoryItem
              title="Observação"
              color="#FFAF00"
              alertas={alertas}
              currentAlert={currentAlert}
              setCurrentAlert={(alert) => {
                setCurrentAlert(alert);
                setCurrentPage(1);
              }}
            />
            <CategoryItem
              title="Sistema"
              color="#08085E"
              alertas={alertas}
              currentAlert={currentAlert}
              setCurrentAlert={(alert) => {
                setCurrentAlert(alert);
                setCurrentPage(1);
              }}
            />
            <CategoryItem
              title="Matrícula"
              color="#694F8E"
              alertas={alertas}
              currentAlert={currentAlert}
              setCurrentAlert={(alert) => {
                setCurrentAlert(alert);
                setCurrentPage(1);
              }}
            />
          </ul>
        </div>
        <div className="alert-input-container">
          <div className="input-container">
            <label htmlFor="std-from-table">Início do Intervalo</label>
            <input type="date" id="std-from-table" />
          </div>
          <div className="input-container">
            <label htmlFor="end-from-table">Fim do Intervalo</label>
            <input type="date" id="end-from-table" />
          </div>
          <div className="button-container">
            <button onClick={handleDate}>Filtrar Data</button>
          </div>
          <div className="button-container">
            <button onClick={resetDate}>Limpar filtro</button>
          </div>
          {user?.perfil.nome_perfil === "Admin" ||
          user?.perfil.nome_perfil === "Gestor" ? (
            <div className="select-container">
              <label>Grupo Alvo</label>
              <Select
                options={options}
                defaultValue={options[0]}
                onChange={handleChange}
                className="selectAlert"
              />
            </div>
          ) : null}
        </div>
        <section className="alert-table-container">
          {currentAlert !== "" ||
          currentUser !== null ||
          currentDateStart !== null ||
          currentDateEnd !== null ? (
            <>
              <h1 className="pb-5">
                Filtrando por: {currentAlert}
                {currentUser &&
                  (currentAlert
                    ? ` e por usuários grupo ${currentUser}`
                    : `usuários grupo ${currentUser}`)}
              </h1>
            </>
          ) : (
            <>
              <h1 className="pb-5">Todos os avisos</h1>
            </>
          )}
          <div className="alert-table">
            <div className="table-head">
              <ul className="table-row">
                <li>
                  <h5>ID</h5>
                </li>
                <li>
                  <h5>DATA</h5>
                </li>
                <li id="long-line">
                  <h5>TIPO</h5>
                </li>
                {user?.perfil.nome_perfil === "Admin" ||
                user?.perfil.nome_perfil === "Gestor" ? (
                  <li id="long-line">
                    <h5>GRUPO ALVO</h5>
                  </li>
                ) : null}
                <li id="long-long-line">
                  <h5>TÍTULO</h5>
                </li>
              </ul>
            </div>
            <ul className="table-container">
              {currentAlerts.map((alerta, index) => {
                return (
                  <AlertItem
                    props={alerta}
                    id={index + 1}
                    key={index}
                    setCurrentBox={setCurrentBox}
                    currentBox={currentBox}
                  />
                );
              })}
            </ul>
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </>
    );
  }
};

export default Alerts;
