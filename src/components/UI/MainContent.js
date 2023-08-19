import React from "react";

import Toolbar from "../Toolbar/Toolbar";
import TasksList from "../Tasks/TasksList";

function MainContent() {
  return (
    <main>
      <Toolbar />
      <TasksList />
    </main>
  );
}

export default MainContent;
