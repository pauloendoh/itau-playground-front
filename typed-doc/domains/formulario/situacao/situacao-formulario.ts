const situacoesFormulario = [
  'EmPreenchimento',
  'EmAnalise',
  'AguardandoParecerRsac',
  'Aprovado',
  'Rejeitado',
  'Finalizado',
] as const;
export type SituacaoFormulario = (typeof situacoesFormulario)[number];

const perfisAnalista = ['Esg', 'Rsac'] as const;
type PerfilAnalista = (typeof perfisAnalista)[number];

type AnalistaAlteraSituacaoCenario = {
  perfilAnalista: PerfilAnalista;
  clienteEhAtacado: boolean;
  situacaoAtual: SituacaoFormulario;
  novaSituacao: SituacaoFormulario;
  shouldReturnStatusCode?: number;
};

// etapas de validação (validation pipeline)
/**
 * - Perfil pode alterar formulários desse tipo de cliente?
 * - Perfil pode
 */

const cenariosMapeados: AnalistaAlteraSituacaoCenario[] = [
  {
    perfilAnalista: 'Esg',
    clienteEhAtacado: true,
    situacaoAtual: 'EmAnalise',
    novaSituacao: 'Aprovado',
    shouldReturnStatusCode: 200,
  },
];

// gerar combinações
function geraCombinacoesInputs() {
  const perfis = perfisAnalista;
  const ehAtacado = [true, false];
  const situacaoAtual = situacoesFormulario;
  const novaSituacao = situacoesFormulario;

  const combinacoes: AnalistaAlteraSituacaoCenario[] = [];
  for (const perfil of perfis) {
    for (const atacado of ehAtacado) {
      for (const atual of situacaoAtual) {
        for (const nova of novaSituacao) {
          combinacoes.push({
            perfilAnalista: perfil,
            clienteEhAtacado: atacado,
            situacaoAtual: atual,
            novaSituacao: nova,
          });
        }
      }
    }
  }
  return combinacoes;
}

// testing
function testaCombinacoes() {
  const todasCombinacoes = geraCombinacoesInputs();
  for (const combinacao of todasCombinacoes) {
    const encontrado = cenariosMapeados.find(
      (cenario) =>
        cenario.perfilAnalista === combinacao.perfilAnalista &&
        cenario.clienteEhAtacado === combinacao.clienteEhAtacado &&
        cenario.situacaoAtual === combinacao.situacaoAtual &&
        cenario.novaSituacao === combinacao.novaSituacao,
    );
    if (!encontrado) {
      console.log('❌ Cenário não mapeado:', combinacao);
      continue;
    }

    console.log('✅ Cenário mapeado:', combinacao);
  }
}

testaCombinacoes();
