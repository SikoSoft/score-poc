import React, { ReactElement } from "react";

import PageRouter from "./router";
import { Link } from "react-router-dom";
import { Tabs, Tab, TabList } from "@chakra-ui/react";
import "./index.css";

function App(): ReactElement {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <Link to="/">Scores</Link>
          </Tab>
          <Tab>
            <Link to="/add">New Score</Link>
          </Tab>
          <Tab>
            <Link to="/import">Import</Link>
          </Tab>
        </TabList>
      </Tabs>
      <main>
        <PageRouter />
      </main>
    </>
  );
}

export default App;
