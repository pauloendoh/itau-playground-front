import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// TODO: deixar isso em um arquivo separado, tipando com Record
export type TipoFormulario = 'Bndes' | 'CreditoRural';

// TODO: deixar isso em um arquivo separado, tipando com Record
const TIPOS: { value: TipoFormulario; label: string }[] = [
  { value: 'Bndes', label: 'BNDES' },
  { value: 'CreditoRural', label: 'Crédito Rural' },
];

@Component({
  selector: 'app-nova-solicitacao-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './nova-solicitacao-dialog.component.html',
})
export class NovaSolicitacaoDialogComponent {
  readonly tipos = TIPOS;
  selectedTipo: TipoFormulario | null = null;

  private dialogRef = inject(MatDialogRef<NovaSolicitacaoDialogComponent>);

  confirm() {
    this.dialogRef.close(this.selectedTipo);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
