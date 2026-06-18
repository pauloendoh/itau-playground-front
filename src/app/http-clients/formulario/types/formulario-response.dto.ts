import { TipoFormulario } from '../../../utils/types/tipo-formulario';

export interface FormularioResponseDto {
  codFormulario: string;
  tipoFormulario: TipoFormulario;
  situacaoFormulario: string;
  codCliente: string;
  detalhesSolicitacao: string;
  detalhesAnalise: string;
}
