import { Link } from "react-router-dom";
import "./style.css";

const Header = (props: any) => {
   return (
      <section className="container-header">
         <h1>Simulado de questões</h1>
         <a href="/">Voltar para home</a>
         <a href="/gabarito">Ver desempenho</a>
      </section>
   );
}

export default Header;