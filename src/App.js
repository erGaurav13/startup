 
import './App.css';
import { useSelector } from 'react-redux';
import Calculator from './Calculator/Calculator';
 
function App() {
const state=useSelector((store)=>store)
console.log(state)
  return (
    <>
      <Calculator></Calculator>
      
    </>
  );
}

export default App;
