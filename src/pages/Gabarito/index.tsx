import { useEffect, useState } from "react";
import api from "../../services/api";
import "./style.css";

const Gabarito = () => {
   const [resultados, setResultados] = useState<any>([]);
   const [gabarito, setGabarito] = useState([]);
   const [acertos, setAcertos] = useState(0);
   const [erros, setErros] = useState(0);

   useEffect(() => {
      buscaResultados();
      buscaGabarito();
   }, []);

   if (!gabarito) {
      return <p>carregando...</p>
   }

   async function buscaResultados() {
      const res = await api.get('simuladoSalvo');


      if (res.status === 200) {
         console.log('respostas salvas', res.data);
         setResultados(res.data);
      } else {
         console.log(res.statusText);
      }
   }

   async function buscaGabarito() {
      const res = await api.get('gabarito');


      if (res.status === 200) {
         console.log('gabarito', res.data);
         setGabarito(res.data);
         checaAcertos();
      } else {
         console.log(res.statusText);
      }
   }

   function checaAcertos() {
      resultados.forEach((elemento: any) => {
         const res = gabarito.filter((gab: any) => gab.idQuestao === elemento.idQuestao && gab.resposta === elemento.resposta);
         console.log('acertos', res.length);
      });
   }

   return (
      <section className="gabarito" >
         <ul>
            <h2>Gabarito</h2>
            {gabarito.map((item: any) => {
               return (
                  <li key={item.idQuestao}>{item.idQuestao} - {item.resposta}</li>
               );
            })}
         </ul>
         <ul>
            <h2>Minhas respostas</h2>
            {resultados.map((item: any) => {
               return (
                  <li key={item.idQuestao}>{item.idQuestao} - {item.resposta}</li>
               );
            })}
         </ul>
      </section>
   );
}

export default Gabarito;