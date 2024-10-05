import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../data/hooks/useLogout";

import Logo from "../../../assets/LogoMatriculaSVG.svg";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./Navbar.scss";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { execute } = useLogout();
  const sessionUser = sessionStorage.getItem("user");
  const user = sessionUser ? JSON.parse(sessionUser) : null;
  //console.log(user);

  const handleLogout = async () => {
    await execute();
    navigate("/login");
  };

  return (
    <header className="w-100 d-flex px-5">
      <div className="logo">
        <img src={Logo} />
      </div>
      <nav className="sample-nav">
        <ul className="p-0 m-0 top-nav">
          <li>
            <Link to="/">Início</Link>
          </li>
          {user?.id ? (
            <>
              <li>
                <Link to="/alerts">Alertas</Link>
              </li>
              {user?.perfil.nome_perfil !== "Aluno"  ? (
                <li>
                  <Link to="/faq-view">Contato</Link>
                </li>
              ) : null}
              <span className="user-container">
                <button
                  className="user-button"
                  onClick={() => {
                    setModalOpen(!modalOpen);
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-icon/user_318-286823.jpg"
                    alt="userImage"
                  />
                </button>
                {modalOpen && (
                  <div className="user-modal">
                    <p>{user?.nome_usuario}</p>
                    <span>{user?.perfil.nome_perfil}</span>
                    <button onClick={handleLogout}>Sair</button>
                  </div>
                )}
              </span>
            </>
          ) : (
            <div className="h-100 d-flex align-items-center ms-4">
              <Link to="/login" className="link-button">
                Login
              </Link>
            </div>
          )}
        </ul>
      </nav>
      <button
        className="sidenav-button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <IoMenu /> : <IoMdClose />}
      </button>

      <div className="sidenav" hidden={isOpen}>
        <nav>
          <ul className="p-0 m-0 pt-5">
            <li>
              <Link to="/">Início</Link>
            </li>
            {user?.id ? (
              <>
                <li>
                  <Link to="/alerts">Alertas</Link>
                </li>
                {user?.perfil.nome_perfil === "Admin" ||
                user?.perfil.nome_perfil === "Gestor" ? (
                  <li>
                    <Link to="/faq-view">Contato</Link>
                  </li>
                ) : null}

                <span className="user-container">
                  <button
                    className="user-button"
                    onClick={() => {
                      setModalOpen(!modalOpen);
                    }}
                  >
                    <img
                      src="https://img.freepik.com/free-icon/user_318-286823.jpg"
                      alt="userImage"
                    />
                  </button>
                  {modalOpen && (
                    <div className="user-modal">
                      <p>{user?.nome_usuario}</p>
                      <span>{user?.perfil.nome_perfil}</span>
                      <button onClick={handleLogout}>Sair</button>
                    </div>
                  )}
                </span>
              </>
            ) : (
              <div className="h-100 d-flex align-items-center ms-4">
                <Link to="/login" className="link-button">
                  Login
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
