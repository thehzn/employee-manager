import {Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"
import EmpList from "./pages/EmpList";
import AddEmp from "./pages/AddEmp";
import EditEmp from "./pages/EditEmp";



function App() {
  

  return (
    <>
      < Header/>
<Routes>
<Route path="/" element={<Home/> }/>
<Route path="/register" element={<Register/>}/>
   <Route path="/login" element={<Login/>} />
   <Route path="/emplist" element={<EmpList/>}/>
   <Route path="/addemp" element={<AddEmp/>}/>
   <Route path="/editemp/:id" element={<EditEmp/>}/>

</Routes>
      
  <Footer/>
      
    </>
  )
}

export default App
