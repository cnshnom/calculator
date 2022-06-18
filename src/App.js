
import './App.css';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

function App() {
  return (
    <Wrapper>
      <Screen value="baum"></Screen>
      <ButtonBox>
        <Button className="" value="" onClick={() => {
          console.log("clicked!");
        }
        }></Button>
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
