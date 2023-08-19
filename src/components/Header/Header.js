import React from "react";

import classes from "./Headers.module.css";
import Logo from "../../assets/LogoTarefas.png";

function Header() {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="Logo da aplicação Tarefas"></img>
    </header>
  );
}

export default Header;
