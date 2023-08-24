import React from "react";

import Toolbar from "../Toolbar/Toolbar";
import TasksList from "../Tasks/TasksList";

import classes from "./MainContent.module.css";

function MainContent() {
  return (
    <main className={classes.mainContent}>
      <Toolbar />
      <TasksList />
    </main>
  );
}

export default MainContent;
