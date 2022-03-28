import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css";
import api from "./../../services/api"
import Questao from "./../../components/Questao";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface Questao {
   enunciado: string,
   id: number,
   idCategoria: number
   instituicao: string,
   alternativas: Array<({a: string, b: string, c: string, d: string })>;
}

const Exercicio = () => {
   const [questao, setQuestao] = useState<Questao>();
   const [questoes, setQuestoes] = useState<Questao[]>([]); // da mesma categoria
   const [indiceAtual, setIndiceAtual] = useState<number>(0);
   const params = useParams();   

   useEffect(() => {
      buscarQuestoesDaCategoria();
   }, [params.id]);

   if (!questao) {
      return <p>Carregando...</p>
   }

   async function buscarQuestoesDaCategoria() {

      const res = await api.get(`questoes?idCategoria=${params.categoria}`);
         
      console.log("buscarQuestoesDaCategoria", res);

      if (res.status == 200) {

         setQuestoes(res.data);
         filtraQuestao(res.data);

      } else {
         console.log(res.statusText);
      }     
   }
      
   function proximaQuestao() {
      console.log(indiceAtual);
      if (indiceAtual < questoes.length - 1) {
         setIndiceAtual(indiceAtual + 1);
         setQuestao(questoes[indiceAtual]);
         console.log(indiceAtual);
      }
   }
  
   function questaoAnterior() {
      console.log(indiceAtual);
      if (indiceAtual > 0 ) {
         setIndiceAtual(indiceAtual - 1);
         setQuestao(questoes[indiceAtual]);
         console.log(indiceAtual);
      }
   }

   function filtraQuestao(arrayQuestoes: Questao[]) {

      const itemFiltrado = arrayQuestoes.filter((item: Questao) => item.id.toString() === params.id)[0];
      setQuestao(itemFiltrado);
      const index = arrayQuestoes.indexOf(itemFiltrado);
      setIndiceAtual(index);
      console.log("index", index);

   }

   return (
      <div className="d-flex flex-column">
         <div className="d-flex jc-between ai-center setas-questoes">
            <button onClick={questaoAnterior}>
               <FiChevronsLeft size={36} color="#363636" /> 
            </button>
            <button onClick={proximaQuestao}>
               <FiChevronsRight size={36} color="#363636" />
            </button>
         </div>
         <Questao dados={questao} totalQuestoes={questoes.length} indiceAtual={indiceAtual+1}/>
      </div>
   );
}

export default Exercicio;