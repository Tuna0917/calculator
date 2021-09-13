import React from "react";
import { Row } from "react-bootstrap";

function Logs(props) {
  return props.logs.map((log, i) => {
    return (
      <Row className="my-1 border col-3 p-2" key={i}>
        {log}
      </Row>
    );
  });
}

export default Logs;
