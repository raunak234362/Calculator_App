import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import './App.css';
import CalcProvider from './context/CalcContext';

const btnValues=[
  ["C","+/-","%","/"],
  [7,8,9,"x"],
  [4,5,6,"-"],
  [1,2,3,"+"],
  [0,".","="],
];

function App() {
  return (
    <div>
      <h1>Calculator App</h1>
      <Wrapper>
        <CalcProvider>
        <Screen/>
        <ButtonBox>
          {btnValues.flat().map((btn,i)=>(
            <Button
              value={btn}
              key={i}
              />
          ))}
        </ButtonBox>
        </CalcProvider>
      </Wrapper>
    </div>
  );
}

export default App;
