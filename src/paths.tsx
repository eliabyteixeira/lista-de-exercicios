import { Route, Routes, BrowserRouter } from "react-router-dom";
import Exercicios from "./pages/Exercicios/index";
import Exercicio from "./pages/Exercicio";
import Gabarito from "./pages/Gabarito";


const Paths = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path= "/" element={ <Exercicios/> } />
            <Route path= "/exercicio/:id/:categoria" element={ <Exercicio/> } />
            <Route path= "/gabarito" element={ <Gabarito /> } />
         </Routes>
      </BrowserRouter>
   );
}

export default Paths;
