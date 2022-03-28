import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Categoria = (props: any) => {
   const navigate = useNavigate();

   function handleClick(questao: any) {
      console.log('questao-categoria', questao);
      navigate(`exercicio/${questao.id}/${questao.idCategoria}`);
   }

   return (
      <div className="lista-questoes">
         {
            props.questoes.map((questao: any) => {
               return (
                  <button key={questao.id} className="button-questao" onClick={() => handleClick(questao)}>Exercício {questao.id}</button>
               );
            })
         }
     </div>
   );
}

export default Categoria;