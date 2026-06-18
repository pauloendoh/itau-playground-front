import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoFormulario } from '../../../../../utils/types/tipo-formulario';

// TODO: deixar isso em um arquivo separado, tipando com Record
const tiposOptions: { value: TipoFormulario; label: string }[] = [
  { value: 'Bndes', label: 'BNDES' },
  { value: 'CreditoRural', label: 'Crédito Rural' },
];

@Component({
  selector: 'app-nova-solicitacao-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './nova-solicitacao-dialog.component.html',
  styleUrl: './nova-solicitacao-dialog.component.scss',
})
export class NovaSolicitacaoDialogComponent {
  private readonly _tiposOptions = tiposOptions;
  selectedTipo: TipoFormulario | null = null;
  tipoControl = new FormControl('');

  private dialogRef = inject(MatDialogRef<NovaSolicitacaoDialogComponent>);

  get filteredTipos() {
    const search = (this.tipoControl.value ?? '').toLowerCase();
    return this._tiposOptions.filter((t) => t.label.toLowerCase().includes(search));
  }

  onTipoSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedTipo = event.option.value;
    this.confirm();
  }

  displayFn(value: TipoFormulario | null): string {
    return tiposOptions.find((t) => t.value === value)?.label ?? '';
  }

  confirm() {
    this.dialogRef.close(this.selectedTipo);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
