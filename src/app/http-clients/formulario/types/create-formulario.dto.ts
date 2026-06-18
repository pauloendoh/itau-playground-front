import { TipoFormulario } from '../../../utils/types/tipo-formulario';

export interface CreateFormularioDto {
  codFormulario: string;
  tipoFormulario: TipoFormulario;
  situacaoFormulario: 'Rascunho';
  codCliente: string;
  codigoCar: string | null;
  detalhesSolicitacao: string;
  detalhesAnalise: string;
}
