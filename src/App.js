import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import {AddEdit} from "./components/AddEdit";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element = {<Home />}/>
                <Route path="/add-product" element = {<AddEdit />}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
