import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormularioHttpClient } from '../../../http-clients/formulario/formulario.http-client';
import { FormularioResponseDto } from '../../../http-clients/formulario/types/formulario-response.dto';
import { NovaSolicitacaoButtonComponent } from './nova-solicitacao-button/nova-solicitacao-button.component';

@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    NovaSolicitacaoButtonComponent,
  ],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss',
})
export class LoggedPageComponent {
  private formularioHttpClient = inject(FormularioHttpClient);

  formularios: FormularioResponseDto[] = [];
  displayedColumns = [
    'codFormulario',
    'tipoFormulario',
    'situacaoFormulario',
    'codigoCar',
  ];

  protected typedRow(row: unknown): FormularioResponseDto {
    return row as FormularioResponseDto;
  }

  constructor() {
    this.formularioHttpClient
      .getFormularios()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.formularios = data));
  }
}
