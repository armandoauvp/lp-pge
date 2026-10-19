// Textos da página, separados do layout para revisão.
// Itens marcados VALIDAR dependem de confirmação do time da PGE antes de publicar.

export const fotos = {
  // Provisórias (Unsplash, licença livre). Trocar pelas fotos oficiais.
  conselho: {
    src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
    alt: "Sala de conselho vazia, com mesa oval de madeira e cadeiras ao redor",
  },
  fabrica: {
    src: "https://images.unsplash.com/photo-1717386255773-1e3037c81788",
    alt: "Linha de produção industrial em um galpão amplo",
  },
};

export const hero = {
  titulo: "Estruturar a empresa para o próximo estágio",
  // VALIDAR: duração e formato do programa (dos slides: doze meses, quatro etapas)
  texto:
    "Doze meses para tirar as decisões da cabeça do fundador e levá-las para um conselho. O programa é conduzido pela XR Advisor, que investe em empresas do middle market.",
  cta: "Fazer minha aplicação",
  secundario: "Ver as quatro etapas",
};

export const estagios = {
  titulo: "O dono deixa de ser o único ponto de decisão",
  texto:
    "Quem decide muda conforme a empresa amadurece. O programa leva a empresa do segundo estágio, quando o time já executa e a decisão ainda volta para o fundador, até o quarto.",
  itens: [
    { nome: "Fundador faz tudo", descricao: "Decisão e execução na mesma pessoa." },
    { nome: "Time executa", descricao: "A decisão ainda sobe para o fundador." },
    { nome: "Gestão com dado", descricao: "Indicador na mesa toda semana." },
    { nome: "Conselho decide", descricao: "O fundador escolhe onde entra." },
  ],
};

export const citacaoRodolfo = {
  // Reel @rodolfo_oliveirax, 24/09/2026 (depoimento Callmed)
  texto:
    "Nós somos uma empresa de bastidores. O nosso principal objetivo está nos bastidores, trazendo clareza, pra aí sim, com essa clareza, você tomar decisão do que é melhor pro seu negócio.",
  autor: "Rodolfo Oliveira",
  papel: "Fundador e presidente do conselho da XR Advisor",
};

// VALIDAR: conteúdo de cada etapa com quem desenhou o programa
export const etapas = {
  titulo: "Doze meses, quatro etapas",
  texto: "Cada etapa deixa algo instalado na empresa antes de passar para a próxima.",
  itens: [
    {
      nome: "Diagnóstico",
      faz: "Leitura de pessoas, processos, tecnologia e governança. Mapeia quanto da operação depende do fundador.",
      fica: "Mapa de maturidade e a lista de prioridades do ano.",
    },
    {
      nome: "Estrutura",
      faz: "Organograma, papéis dos sócios e regras de decisão. Formaliza o que hoje é combinado de boca.",
      fica: "Acordo de sócios e conselho consultivo em funcionamento.",
    },
    {
      nome: "Gestão",
      faz: "Metas, rotina de indicadores e um comitê executivo que decide sem esperar o fundador.",
      fica: "Comitê executivo e DRE gerencial lida toda semana.",
    },
    {
      nome: "Valor",
      faz: "Valuation, estrutura de capital e preparação para captação, venda de participação ou aquisição.",
      fica: "Empresa pronta para passar por uma diligência.",
    },
  ],
};

export const oitoPontos = {
  // Post @xradvisor, 30/07/2026
  titulo: "O que a XR olha antes de fazer uma proposta de investimento",
  texto:
    "São os mesmos oito pontos que o programa trabalha. Uma empresa que passa bem por eles fica mais fácil de financiar, de vender e de suceder.",
  itens: [
    "Time de gestão",
    "Consistência de receita",
    "Qualidade do EBITDA",
    "Posição de mercado",
    "Organograma",
    "Governança",
    "Estrutura de capital",
    "Dependência do fundador",
  ],
};

export const resultados = {
  titulo: "Empresas em que a XR Advisor atua",
  // Distinção importante: são cases da XR, não de turmas do PGE
  nota: "Cases publicados pela XR Advisor em xradvisor.com.br. Ainda não são resultados de turmas do PGE.",
  destaque: {
    empresa: "Grupo Acelerador",
    setor: "Educação empresarial",
    texto:
      "A XR conduziu a rodada de dezembro de 2024, comprada por investidores do próprio programa Giants, a 9 vezes o EBITDA projetado.",
    serie: [
      { ano: "2022", valor: 150, rotulo: "R$ 150 mi" },
      { ano: "2023", valor: 450, rotulo: "R$ 450 mi" },
      { ano: "2024", valor: 729, rotulo: "R$ 729 mi" },
      { ano: "2025", valor: 1000, rotulo: "R$ 1 bi" },
    ],
    legenda: "Valuation por ano",
  },
  outros: [
    {
      empresa: "BRC Ingredientes",
      setor: "Ingredientes para carnes, Rio Claro (SP)",
      numero: "De R$ 27 mi para mais de R$ 80 mi",
      texto: "Governança, vesting e novo modelo societário. A XR conduziu a compra da G2C Biotecnologia, uma transação de R$ 25 mi.",
    },
    {
      empresa: "IPM Educação",
      setor: "Edtech médica, Goiânia",
      numero: "R$ 44,5 mi de receita líquida em 2024",
      texto: "A XR é sócia da holding e fez valuation, redesenho societário e planejamento. Em 2024 a receita cresceu 1.631%.",
    },
    {
      empresa: "LOV, Liga de Óticas Visionárias",
      setor: "Associação de óticas independentes",
      numero: "140 lojas em dois meses",
      texto: "Idealizada com a Tri-Jóia e o Grupo HiperSaúde. Soma 10 estados e mais de R$ 200 mi de faturamento.",
    },
  ],
};

export const depoimentos = [
  {
    texto:
      "Antes era uma empresa antes da XR, e agora é outra completamente diferente, com governança. Aprendi muito sobre isso, e me deixou muito mais livre com o tempo.",
    autor: "Pedro Miranda",
    papel: "IPM Educação",
    link: "https://www.instagram.com/reel/DejvihoOQ9T/",
  },
  {
    texto:
      "Vocês estão dando uma visão e uma organização pra dentro da Callmed que tá surpreendendo todo mundo.",
    autor: "Juliano Callegaro",
    papel: "Fundador da Callmed",
    link: "https://www.instagram.com/reel/Ddruf-bR1X8/",
  },
  {
    texto:
      "O Lucas traz a XR, que em termos de governança faz uma coisa espetacular. E hoje nós tivemos já duas oportunidades de M&A.",
    autor: "Fabio Eduardo Costa",
    papel: "BRC Ingredientes",
    link: "https://www.instagram.com/reel/DefFJ7iJCKR/",
  },
];

export const conducao = {
  titulo: "Quem conduz",
  texto:
    "A XR Advisor compra participações minoritárias de até 10% em empresas do middle market e, antes de investir, organiza governança, finanças e estrutura societária. O PGE leva esse método para empresas que ainda não estão nesse ponto.",
  pessoas: [
    {
      nome: "Rodolfo Oliveira",
      papel: "Fundador e presidente do conselho da XR Advisor",
      bio: "Começou aos 14 anos como office boy no Tribunal de Justiça de Minas Gerais. Fundou a XR em 2015 a partir da reestruturação de hotéis e negócios familiares.",
    },
    {
      nome: "Lucas Costa",
      papel: "CEO da XR Advisor",
      bio: "Engenheiro de alimentos pela USP. Contratou a XR como cliente para reorganizar a BRC Ingredientes, conduziu a compra da G2C e depois virou sócio.",
    },
  ],
  numeros: [
    { valor: "26", rotulo: "empresas investidas" },
    { valor: "R$ 15 bi", rotulo: "de faturamento somado das investidas em 2025" },
    { valor: "R$ 1,4 bi", rotulo: "de valuation estimado da carteira" },
  ],
  fonte: "Fonte: Exame, 3 de março de 2026.",
};

// VALIDAR: critérios de entrada (faixa de faturamento, EBITDA mínimo)
export const perfil = {
  titulo: "Para quem é o programa",
  sim: [
    "Você fundou a empresa e ainda aprova a maior parte das decisões.",
    "Há sócios na operação e o que cada um pode decidir nunca foi escrito.",
    "A empresa cresceu e a gestão continua igual à de quando era pequena.",
    "Você pensa em captar, vender uma participação, comprar um concorrente ou preparar a sucessão.",
  ],
  nao: [
    "Você procura uma fórmula para dobrar o lucro em poucos meses.",
    "A empresa ainda não tem receita recorrente para organizar.",
    "Não há disposição para abrir números a um conselho.",
  ],
};

export const faq = [
  {
    pergunta: "Quanto tempo dura o programa?",
    // VALIDAR
    resposta: "Doze meses, divididos em quatro etapas: diagnóstico, estrutura, gestão e valor.",
  },
  {
    pergunta: "Como funciona a seleção?",
    resposta:
      "Pela aplicação desta página. O time da XR Advisor lê o perfil da empresa e chama para uma conversa quem tiver aderência ao programa.",
  },
  {
    pergunta: "Quanto custa?",
    // VALIDAR: decidir se o valor aparece na página
    resposta: "O valor é apresentado na conversa que acontece depois da aplicação.",
  },
  {
    pergunta: "Participar do PGE significa receber investimento da XR?",
    // VALIDAR com o jurídico antes de publicar
    resposta:
      "Não. O programa organiza a empresa. Investimento é uma decisão separada da XR Advisor, com análise própria.",
  },
  {
    pergunta: "Preciso ter conselho ou acordo de sócios antes de entrar?",
    resposta: "Não. Montar os dois faz parte da etapa de estrutura.",
  },
];

export const aplicacao = {
  titulo: "Aplicação",
  texto:
    "Leva cerca de três minutos. As respostas ajudam o time a entender o momento da empresa antes da primeira conversa.",
  faturamento: [
    "Até R$ 10 milhões",
    "De R$ 10 a 50 milhões",
    "De R$ 50 a 150 milhões",
    "De R$ 150 a 500 milhões",
    "Acima de R$ 500 milhões",
  ],
  desafios: [
    "Sair da operação do dia a dia",
    "Organizar a relação entre sócios",
    "Crescer sem perder controle da gestão",
    "Preparar a sucessão",
    "Captar ou vender participação",
    "Comprar outra empresa",
  ],
  sucesso:
    "Recebemos sua aplicação. O time da XR Advisor vai ler as respostas e entrar em contato pelo WhatsApp informado.",
};

export const rodape = {
  endereco: ["Av. Copacabana, 268", "Alphaville, Barueri (SP)", "06472-001"],
  // VALIDAR: qual e-mail e qual WhatsApp atendem o PGE (o site da XR mostra dois de cada)
  email: "contato@xradvisor.com.br",
  instagram: "https://www.instagram.com/xradvisor/",
  linkedin: "https://www.linkedin.com/company/xradvisor/",
};
