import { Cabecalho } from "@/components/secoes/Cabecalho";
import { Hero } from "@/components/secoes/Hero";
import { Estagios } from "@/components/secoes/Estagios";
import { Citacao } from "@/components/secoes/Citacao";
import { Etapas } from "@/components/secoes/Etapas";
import { OitoPontos } from "@/components/secoes/OitoPontos";
import { Resultados } from "@/components/secoes/Resultados";
import { Conducao } from "@/components/secoes/Conducao";
import { Perfil } from "@/components/secoes/Perfil";
import { Aplicacao } from "@/components/secoes/Aplicacao";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Rodape } from "@/components/secoes/Rodape";

export default function Page() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Hero />
        <Estagios />
        <Citacao />
        <Etapas />
        <OitoPontos />
        <Resultados />
        <Conducao />
        <Perfil />
        <Aplicacao />
        <Perguntas />
      </main>
      <Rodape />
    </>
  );
}
