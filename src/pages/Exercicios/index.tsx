import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./style.css";
import api from "./../../services/api";
import Categoria from "../../components/Categoria";


const Exercicios = () => {
   const [categorias, setCategorias] = useState([]);
   const [questoes, setQuestoes] = useState<any>([]);

   useEffect(() => {

      buscaCategorias();
      buscaQuestoes();

   }, []);

   async function buscaCategorias() {
   
      const res = await api.get(`categorias`);

      console.log(res);

      if (res.status === 200) {
         setCategorias(res.data);
      } else {
         console.log(res.statusText);
      }

   }
   
   async function buscaQuestoes() {
   
      const res = await api.get(`questoes`);

      console.log(res);

      if (res.status === 200) {
         setQuestoes(res.data);
      } else {
         console.log(res.statusText);
      }
   }

   function handleClick(index: number) {

      const questoes = document.querySelectorAll(".lista-questoes")[index];

      if (questoes.classList.contains('show')) {
         questoes.classList.remove('show');         
      } else {         
         questoes.classList.add('show');
      }
   }

   function filtrarQuestoes(idCategoria: number) {
     return questoes.filter((questao: any) => questao.idCategoria == idCategoria);
   }

   return (
      <>
         <div className="lista-exercicios">          
            {categorias.map((categoria: any, index: number) => {
               return (
                  <div className="card-categorias" key={categoria.id}>
                        <a type="button" className="botao-categoria" onClick={() => handleClick(index)}>
                           <h5>{categoria.nome}</h5>
                           <FiChevronDown size={18} color="#1E90FF" />
                        </a>
                        {categoria.id ? <Categoria questoes={filtrarQuestoes(categoria.id)} /> : null}
                     </div>
                  );
               })
            }
         </div>
      </>
   );
}

export default Exercicios;
