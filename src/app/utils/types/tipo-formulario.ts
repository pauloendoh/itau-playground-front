const tiposFormulario = ['Bndes', 'CreditoRural'] as const;
export type TipoFormulario = (typeof tiposFormulario)[number];
