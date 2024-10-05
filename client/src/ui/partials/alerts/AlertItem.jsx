export const AlertItem = ({ props, setCurrentBox, currentBox, id }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <li className="table-box">
      <ul className="table-row">
        <li>
          <h5>{id}</h5>
        </li>
        <li>
          <h5>{props.data}</h5>
        </li>
        <li id="long-line">
          <h5 id={`title-${props.tipo}`}>{props.tipo}</h5>
        </li>
        {user?.perfil.nome_perfil === "Admin" ||
        user?.perfil.nome_perfil === "Gestor" ? (
          <li id="long-line">
            <h5>{props.target_group}</h5>
          </li>
        ) : null}
        <li id="long-long-line">
          <h5
            id="title-clickable"
            onClick={() => {
              setCurrentBox(props.id);
            }}
          >
            {props.name}
          </h5>
        </li>
      </ul>
      <div className="modal-item" hidden={currentBox !== props.id}>
        <div className="modal-box">
          <h3>{props.name}</h3>
          <h5>{props.data}</h5>
          <hr />
          <p>{props.descricao}</p>
          <button
            onClick={() => {
              setCurrentBox(null);
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </li>
  );
};
