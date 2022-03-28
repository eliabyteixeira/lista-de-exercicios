import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./style.css";

const Questao = (props: any) => {
   const [selecionada, setSelecionada] = useState('');
   const navigate = useNavigate();

   if (!props.dados) {
      return <p>Carregando...</p>
   }

   function handleResposta() {

      console.log(`resposta confirmada: ${selecionada}`);
      if (!selecionada) {
         const info = document.getElementById("info-resposta");  
         info!.innerText = "Selecione uma das alternativas!"
         info!.style.display = 'flex';
         setTimeout(() => {
            info!.style.display = 'none';
            info!.innerText = ""
         }, 5000);
         
      } else {
         api.post(`/simuladoSalvo`, { "idQuestao": props.dados.id, "resposta": selecionada })
            .then(res => {
               console.log(res);
               document.getElementById("info-resposta")!.innerText = "Resposta salva!";
               limpaSelecao();
            }).catch(err => console.log(err));
      }
   }

   function selecionaQuestao(opcao: string, e: any) {
      
      console.log(`resposta clicada: ${opcao}`, e.target);      
      const opcaoClicada = e.target;
      
      // limpa a opcao marcada atual
      limpaSelecao();
      
      // seta a nova opcao marcada
      opcaoClicada.classList.add("opcao-selecionada");
      setSelecionada(opcao);
   }

   
   function limpaSelecao() {
      
      const opcoes = document.querySelectorAll(".opcoes");
      opcoes.forEach(element => {
         element.classList.remove("opcao-selecionada");
      });

   }

   return (
      <section className="card-questao" {...props}>
         <h4 className="info"><span>({props.dados.id}) </span> Exercício {props.indiceAtual}/{props.totalQuestoes}</h4>
         <p className="enunciado">
            ({props.dados.instituicao}) {props.dados.enunciado}
         </p>
         <ul className="alternativas">
            <li><button type="button" onClick={(e) => selecionaQuestao('a', e)} className="opcoes">a</button>{ props.dados.alternativas.a }</li>
            <li><button type="button" onClick={(e) => selecionaQuestao('b', e)} className="opcoes">b</button>{ props.dados.alternativas.b }</li>
            <li><button type="button" onClick={(e) => selecionaQuestao('c', e)} className="opcoes">c</button>{ props.dados.alternativas.c }</li>
            <li><button type="button" onClick={(e) => selecionaQuestao('d', e)} className="opcoes">d</button>{ props.dados.alternativas.d }</li>
         </ul>
         <div className="d-flex jc-between ai-center">
            <button onClick={() => navigate(-1)} className="botao-voltar">Voltar</button>
            <span id="info-resposta"></span>
            <button onClick={handleResposta} className="botao-resposta">Confirmar Resposta</button>
         </div>
      </section>
   );
}

export default Questao;