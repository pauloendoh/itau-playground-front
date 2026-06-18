import { TipoFormulario } from '../../../utils/types/tipo-formulario';

export interface CreateFormularioDto {
  codFormulario: string;
  tipoFormulario: TipoFormulario;
  situacaoFormulario: 'Rascunho';
  codCliente: string;
  detalhesSolicitacao: string;
  detalhesAnalise: string;
}
