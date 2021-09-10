import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function Screen(props) {
  return (
    <InputGroup className="my-3">
      <FormControl
        className="form-inline text-end"
        placeholder="0"
        defaultValue={props.expression}
        onKeyDown={props.handleKeyDown}
      />
    </InputGroup>
  );
}

export default Screen;
