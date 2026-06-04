import { FigmaFormulario } from '../../util-types';
import {
  Campo,
  campoCpfCnpj,
  campoIsPropect,
  campoTipoOperacaoBndes,
} from './solicitacao/campo-solicitacao';

const tiposFormularios = ['Bndes', 'CreditoRural'] as const;
type TiposFormularios = (typeof tiposFormularios)[number];

enum CargoColaborador {
  Estagiario,
  Junior,
  Pleno,
  Senior,
}

type ChecklistFormulario = {
  figma: {
    solicitacao: FigmaFormulario;
    analise: FigmaFormulario;
  };
  camposSolicitacao: { tituloSecao: string; campos: Campo[] }[];
  camposAnalise: {}[];
  abasExtrasAnalise: {}[];
  cargoMinimoParaFinalizar: CargoColaborador;
  urlMatrizRisco: string | null;
  slaAnalise: number | null;
  validadeAnalise: number | null;
  mapeamentoDrsacDemocratizado: {} | null; // se null, não tem drsac
  sistemasPodemCriar:
    | {
        siglaOrigemSistema: string;
        descricao?: string;
      }[]
    | null;
  estaDemocratizado: true;
};

const checklistFormularios: Record<TiposFormularios, ChecklistFormulario> = {
  Bndes: {
    figma: {
      analise: {
        url: 'exemplo.figma.com/analise-bndes',
        revisado: true,
      },
      solicitacao: {
        url: undefined,
        revisado: false,
      },
    },
    camposSolicitacao: [
      {
        tituloSecao: 'Dados cadastrais',
        campos: [campoIsPropect, campoCpfCnpj, campoTipoOperacaoBndes],
      },
    ],
    camposAnalise: [],
    abasExtrasAnalise: [],
    cargoMinimoParaFinalizar: CargoColaborador.Estagiario,
    urlMatrizRisco: undefined,
    slaAnalise: undefined,
    validadeAnalise: undefined,
    mapeamentoDrsacDemocratizado: undefined,
    sistemasPodemCriar: undefined,
    estaDemocratizado: undefined,
  },
  CreditoRural: {
    figma: {
      solicitacao: {
        url: undefined,
        revisado: undefined,
      },
      analise: {
        url: undefined,
        revisado: undefined,
      },
    },
    camposSolicitacao: undefined,
    camposAnalise: undefined,
    abasExtrasAnalise: undefined,
    cargoMinimoParaFinalizar: undefined,
    urlMatrizRisco: undefined,
    slaAnalise: undefined,
    validadeAnalise: undefined,
    mapeamentoDrsacDemocratizado: undefined,
    sistemasPodemCriar: undefined,
    estaDemocratizado: undefined,
  },
};
