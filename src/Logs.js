import React from "react";
import { Row } from "react-bootstrap";

function Logs(props) {
  return props.logs.map((log, i) => {
    return (
      <Row className="my-1 border col-3 p-2" key={i}>
        {String(log.left.history[log.left.step].view) +
          " = " +
          String(log.result)}
      </Row>
    );
  });
}

export default Logs;
