import React from "react";
import { Button } from "react-bootstrap";

function RightButton(props) {
  const buttons = [
    { text: "(", variant: "secondary", value: "(" },
    { text: ")", variant: "secondary", value: ")" },
    { text: "%", variant: "secondary", value: "%" },
    { text: "CE", variant: "secondary", value: "Backspace" },
    { text: "7", variant: "light", value: "7" },
    { text: "8", variant: "light", value: "8" },
    { text: "9", variant: "light", value: "9" },
    { text: "÷", variant: "secondary", value: "/" },
    { text: "4", variant: "light", value: "4" },
    { text: "5", variant: "light", value: "5" },
    { text: "6", variant: "light", value: "6" },
    { text: "x", variant: "secondary", value: "*" },
    { text: "1", variant: "light", value: "1" },
    { text: "2", variant: "light", value: "2" },
    { text: "3", variant: "light", value: "3" },
    { text: "-", variant: "secondary", value: "-" },
    { text: "0", variant: "light", value: "0" },
    { text: ".", variant: "light", value: "." },
    { text: "=", variant: "primary", value: "=" },
    { text: "+", variant: "secondary", value: "+" },
  ];

  return buttons.map((button, i) => {
    const { variant, text, value } = button;

    return (
      <Button
        className="my-1 border col-3 p-2"
        variant={variant}
        onClick={props.handleClick}
        value={value}
        key={i}
      >
        {text}
      </Button>
    );
  });
}

export default RightButton;
