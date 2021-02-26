import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import Main from "./Main/index";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Main></Main>
    </div>
  );
}

export default App;
