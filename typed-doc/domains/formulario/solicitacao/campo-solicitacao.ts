export type Campo<T = {}> = {
  label: string;
  type: 'text' | 'switch' | 'dropdown' | 'textarea';
  defaultValue?: T;
  isRequired?: boolean;
};
type CampoSwitch = Campo<boolean> & {
  type: 'switch';
};
type CampoTexto = Campo<string> & {
  type: 'text';
};

type CampoTextArea = Campo<string> & {
  type: 'textarea';
};

type CampoTextoComMascara = CampoTexto & {
  mask: string;
};

type CampoDropdown = Campo<string> & {
  type: 'dropdown';
  values: string[];
};

// campos bndes
export const campoIsPropect: CampoSwitch = {
  label: 'É prospect?',
  type: 'switch',
  defaultValue: false,
};
export const campoCpfCnpj: CampoTextoComMascara = {
  label: 'CPF/CNPJ',
  type: 'text',
  defaultValue: '',
  mask: '000.000.000-00|00.000.000/0000-00',
};

export const campoTipoOperacaoBndes: CampoDropdown = {
  label: 'Tipo de operação',
  type: 'dropdown',
  values: ['Financiamento', 'Investimento'],
};

export const campoCar: CampoTextoComMascara = {
  label: 'CAR',
  type: 'text',
  defaultValue: '',
  mask: '00000000000000000000000',
};

export const campoObservacoes: CampoTextArea = {
  label: 'Observações',
  type: 'textarea',
  defaultValue: '',
};
