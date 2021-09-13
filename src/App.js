import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import Screen from "./Screen";
import RightButton from "./RightButton";
import Logs from "./Logs";

function App() {
  const operators = ["+", "-", "*", "/"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const dot = ".";
  const brackets = ["(", ")"];
  const percent = "%";
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([
    {
      view: "",
      expression: "",
      isNumber: false,
      isOperator: false,
      isZero: false,
      isClosed: false,
      hasDot: false,
      depth: 0,
    },
  ]);
  const [log, setLog] = useState([]); // 전체 연산

  const handleClick = (e) => {
    input(e.target.value);
  };

  const handleKeyDown = (e) => {
    input(e.key);
  };

  function input(value) {
    const {
      view,
      expression,
      isNumber,
      isOperator,
      isZero,
      isClosed,
      hasDot,
      depth,
    } = history[step];

    if (value === "Backspace") {
      if (step > 0) {
        history.pop();
        setHistory(history);
        setStep(step - 1);
      }
    }

    if (value === "=" || value === "Enter") {
      if (isNumber) calculate();
    }
    // 사칙연산

    if (operators.includes(value)) {
      if (isOperator) {
        replace(value);
      } else {
        if (step > 0) {
          setHistory(
            history.concat({
              view: view + value,
              expression: expression + value,
              isNumber: false,
              isOperator: true,
              isZero: false,
              isClosed: false,
              hasDot: false,
              depth: depth,
            })
          );
          setStep(step + 1);
        } else {
          //맨 처음부터 사칙연산을 입력했을 때
          setHistory(
            history.concat(
              {
                view: "0",
                expression: "0",
                isNumber: true,
                isOperator: false,
                isZero: true,
                isClosed: false,
                hasDot: false,
                depth: depth,
              },
              {
                view: "0" + value,
                expression: "0" + value,
                isNumber: false,
                isOperator: true,
                isZero: false,
                isClosed: false,
                hasDot: false,
                depth: depth,
              }
            )
          );
          setStep(2);
        }
      }
    }

    // 0~9
    if (numbers.includes(value)) {
      if (isZero) {
        replace(value);
      } else {
        setHistory(
          history.concat({
            view: view + value,
            expression: isClosed
              ? expression + "*" + value
              : expression + value,
            isNumber: true,
            isOperator: false,
            isZero: value === "0" && !isNumber ? true : false,
            isClosed: false,
            hasDot: hasDot,
            depth: depth,
          })
        );
        setStep(step + 1);
      }
    }
    //소숫점
    if (value === ".") {
      if (isNumber && !hasDot && !isClosed) {
        setHistory(
          history.concat({
            view: view + value,
            expression: expression + value,
            isNumber: true,
            isOperator: true,
            isZero: false,
            isClosed: false,
            hasDot: true,
            depth: depth,
          })
        );
        setStep(step + 1);
      }
    }
    // 괄호
    if (brackets.includes(value)) {
      if (value === "(") {
        if (isNumber) {
          if (hasDot && isOperator) {
            setHistory(
              history.concat({
                view: view + "0*" + value,
                expression: expression + "0*" + value,
                isNumber: false,
                isOperator: true,
                isZero: false,
                isClosed: false,
                hasDot: false,
                depth: depth + 1,
              })
            );
          } else {
            setHistory(
              history.concat({
                view: view + value,
                expression: expression + "*" + value,
                isNumber: false,
                isOperator: true,
                isZero: false,
                isClosed: false,
                hasDot: false,
                depth: depth + 1,
              })
            );
          }
          setStep(step + 1);
        } else {
          setHistory(
            history.concat({
              view: view + value,
              expression: expression + value,
              isNumber: false,
              isOperator: true,
              isZero: false,
              isClosed: false,
              hasDot: false,
              depth: depth + 1,
            })
          );
          setStep(step + 1);
        }
      } else if (value === ")" && depth > 0) {
        if (isNumber) {
          if (hasDot && isOperator) {
            // .으로 끝난 경우
            setHistory(
              history.concat({
                view: view + value,
                expression: expression + "0" + value,
                isNumber: true,
                isOperator: false,
                isZero: false,
                isClosed: true,
                hasDot: false,
                depth: depth - 1,
              })
            );
            setStep(step + 1);
          } else {
            setHistory(
              history.concat({
                view: view + value,
                expression: expression + value,
                isNumber: true,
                isOperator: false,
                isZero: false,
                isClosed: true,
                hasDot: false,
                depth: depth - 1,
              })
            );
          }
          setStep(step + 1);
        }
      }
    }

    if (value === "%" && isNumber) {
      setHistory(
        history.concat({
          view: hasDot ? view + "0" + value : view + value,
          expression: hasDot ? expression + "0*0.01" : expression + "0*0.01",
          isNumber: true,
          isOperator: false,
          isZero: false,
          isClosed: true,
          hasDot: false,
          depth: depth,
        })
      );
      setStep(step + 1);
    }
  }

  function replace(value) {
    const { isNumber, isOperator, isZero, hasDot, depth } = history[step];
    setHistory(
      history.slice(0, -1).concat({
        view: history[step - 1].view + value,
        expression: history[step - 1].expression + value,
        isNumber: operators.includes(value) ? false : isNumber,
        isOperator: operators.includes(value) ? true : false,
        isZero: value === "0" ? true : false,
        hasDot: value === "." ? true : false,
        depth: depth,
      })
    );
  }

  function calculate() {
    //history 초기화, log 추가
    const view = history[step].view + ")".repeat(history[step].depth);
    const expression =
      history[step].expression + ")".repeat(history[step].depth);
    const result = eval(
      history[step].expression + ")".repeat(history[step].depth)
    );

    for (let i = 0; i < history[step].depth; i++) {
      history.push({
        view: history[step].view + ")".repeat(i + 1),
        expression: history[step].expression + ")".repeat(i + 1),
        isNumber: true,
        isOperator: false,
        isZero: false,
        isClosed: true,
        hasDot: false,
        depth: history[step].depth - i - 1,
      });
    }
    console.log(history);
    const l = {
      left: {
        history: history,
        step: step + history[step].depth,
      },
      right: {
        history: [
          {
            view: "",
            expression: "",
            isNumber: false,
            isOperator: false,
            isZero: false,
            isClosed: false,
            hasDot: false,
            depth: 0,
          },
          {
            view: `${result}`,
            expression: `${result}`,
            isNumber: true,
            isOperator: false,
            isZero: result ? false : true,
            hasDot: false,
            depth: 0,
          },
        ],
        step: 1,
      },
      result: result,
      view: view,
    };

    setLog(log.concat(l));
    setHistory([
      {
        view: "",
        expression: "",
        isNumber: false,
        isOperator: false,
        isZero: false,
        isClosed: false,
        hasDot: false,
        depth: 0,
      },
      {
        view: `${result}`,
        expression: `${result}`,
        isNumber: true,
        isOperator: false,
        isZero: result ? false : true,
        hasDot: false,
        depth: 0,
      },
    ]);
    setStep(1);
  }

  return (
    <>
      <Container className="px-4">
        <Row>
          <Screen
            expression={history[step].view}
            handleKeyDown={handleKeyDown}
          />
        </Row>
        <Row className="justify-content-between gx-5 g-2">
          <RightButton handleClick={handleClick} />
        </Row>

        <Logs logs={log} />
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
