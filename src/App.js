
import './App.css';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { useState } from 'react';
import { Stack } from 'react-bootstrap';


const btnValues = [

  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e)=>{
    e.preventDefault();
    // e is an event object
    // target is the object that created the event
    // innerHTML describes the target's content X, e.g. <div>X</div>
    const value = e.target.innerHTML;
    setCalc(
      {
        ...calc, //state of all member stays the same
        //only num and res change.
        num:
          calc.num === 0 && value === "0"
          ? "0"
          :calc.num % 1 === 0
          ?Number(calc.num+value)
          :calc.num+value,
        
        res:!calc.sign ? 0:calc.res,
      }
    )
  };
  const resetClickHandler = (e)=>{
    e.preventDefault();
    setCalc({
      ...calc,
      res: 0,
      num: 0,
      sign: ""
    });
  };

  const invertClickHandler = (e)=>{
    e.preventDefault();

    setCalc({
      ...calc,
      num: calc.num*(-1),
      res: calc.res*(-1)
    });
  };
  const percentClickHandler = (e)=>{
    e.preventDefault();
    let num = parseFloat(calc.num);
    let res = parseFloat(calc.res);

    setCalc({
      ...calc,
      num:num/100 ,
      res:res/100
    });
  };
  const equalsClickHandler = (e)=>{
    e.preventDefault();
    if (calc.sign && calc.num){
      const math = (a,b,sign)=>
        sign === "+"
        ? a+b
        : sign === "-"
        ? a-b
        : sign === "X"
        ? a*b
        : a/b;
      setCalc({
        ...calc,
        res: math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num:0
      });
     

    }
  };

  const signClickHandler = (e)=>{
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign:value,
      res: !calc.res && calc.num?calc.num:calc.res,
      num:0
    });
  };

  const commaClickHandler = (e)=>{
    e.preventDefault();
    setCalc({
      ...calc,
      num:!calc.num.toString().includes(".")?calc.num+".":calc.num,
    });
  };

  


  return (
    <Wrapper>
      <Screen value={calc.num? calc.num:calc.res}></Screen>
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                onClick={
                  btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
                }
                value={btn}
              >
              </Button>
            );
          })
      }
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
