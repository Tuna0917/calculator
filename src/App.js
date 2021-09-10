import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Screen from "./Screen";
import RightButton from "./RightButton";

function App() {
  const [expression, setExpression] = useState("");
  const [realExpression, setRealExpression] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isZero, setIsZero] = useState(false);
  const [isOperator, setIsOperator] = useState(true);
  const [history, setHistory] = useState([]); // 현재 진행 중인 연산
  const [log, setLog] = useState([]); // 전체 연산

  const handleClick = (e) => {
    input(e.target.value);
  };

  const handleKeyDown = (e) => {
    input(e.key);
  };

  function input(value) {
    if (isValid(value)) {
      setInputValue(value);

      if (value === "Backspace") {
        setExpression(expression.slice(0, -1));
      } else if (value === "=") {
        setHistory([]);
        calculate();
        setExpression("");
      } else {
        setExpression(expression + value);
      }
    }
  }

  function isValid(value) {
    return true;
  }

  function calculate() {
    //history 초기화, log 추가
    return 0;
  }

  return (
    <>
      <Container className="px-4">
        <Row>
          <Screen expression={expression} handleKeyDown={handleKeyDown} />
        </Row>
        <Row className="justify-content-between gx-5 g-2">
          <RightButton expression={expression} handleClick={handleClick} />
        </Row>
      </Container>
    </>
  );
}

export default App;

/*
단계
input(): 현재 어떤 값을 입력했는지 (onClick과 onKeyboard?)
isValid(): input값이 유효한지 체크
result(): 유효하다면 값을 expression에 각각 추가

isZero
  True: 숫자 입력시 0 대체, 
  False:

isOperator
  True: 
  False:

isEmpty() 
  [".", "%", "사칙연산"]: 0을 추가함
  ["그 외"]: 0을 대체함

주의사항
  - 숫자 다음에 "("가 올 경우 realExpression에는 "*("가 추가되어야 함.
  - "-"는 "+"다음에 입력하면 "-"로 대체되지만 "x"와 

*/
