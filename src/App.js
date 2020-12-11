import React from "react";
import "./App.css";
import DataTable from "./components/Table";
import { Row, Col } from "antd";

function App() {
  return (
    <div className="App">
      <Row align="middle">
        <Col span={20} offset={2}>
          <DataTable />
        </Col>
      </Row>
    </div>
  );
}

export default App;
