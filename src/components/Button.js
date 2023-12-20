import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'

// Function to determine the CSS class
const getStyleName = btn => {  
    const className={
        '=':'equals',
        'x':'opt',
        '/':'opt',
        '-':'opt',
        '+':'opt',
        '0':'zero'
    };
    return className[btn]
};

//Button Component
const Button = ({value}) => {
  // Accessing the context
  const {calc,setCalc}=useContext(CalcContext);

  //User CLick Comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num:!calc.num.toString().includes('.') ? calc.num + value : calc.num
    });
  }

  //Click handler for the reset button
  const resetClick = () => {
    setCalc({ sign: '',num:0,res:0 })
  }

  // Click handler for (0-9) buttons
  const handleClickButton = () => {
    const numberString = value.toString()

    let numberValue;
    if(numberString === '0' && calc.num ===0){
      numberValue='0'
    }else{
      numberValue = Number(calc.num + numberString)
    }
    setCalc({
      ...calc,
      num:numberValue
    })
  }

  //Click handler for operators
  const signClick = () => {
    setCalc({
      sign: value,
      res:!calc.res && calc.num ? calc.num : calc.res,
      num:0
    })
  }

  //Click handler for equal button
  const equalsClick = () => {
    if(calc.res && calc.num){

      const math=(a, b, sign) => {
        const result ={
          '+': (a,b) => a + b,
          '-': (a,b) => a - b,
          '/': (a,b) => a / b,
          'x': (a,b) => a * b,
        }
        return result[sign](a,b);
      }
    setCalc({
      res: math(calc.res, calc.num, calc.sign),
      sign: '',
      num:0
    })
  }
  }

  //click handler for % button
  const persenClick = () => {
    setCalc({
      num:(calc.num / 100),
      res:(calc.res / 100),
      sign: ''
    })
  }

  //click handler for (+/-) button
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ''
    })
  }

  // Handle button click event
  const handleBtnClick = () => {
    //Object with specific function
    const results={
      '.':commaClick,
      'C':resetClick,
      '/': signClick,
      'x': signClick,
      '+': signClick,
      '-': signClick,
      '=': equalsClick,
      '%': persenClick,
      '+/-' : invertClick
    }
    if(results[value]){
      return results[value]()
    }else{
      return handleClickButton()
    }
  }
  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value} </button>
  )
}

export default Button