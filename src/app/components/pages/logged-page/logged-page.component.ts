import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormularioHttpClient } from '../../../http-clients/formulario/formulario.http-client';
import { FormularioResponseDto } from '../../../http-clients/formulario/types/formulario-response.dto';
import { MyColumnDefs } from '../../../utils/types/my-column-def';
import { MyMatTableComponent } from '../../_shared/my-mat-table/my-mat-table-component';
import { NovaSolicitacaoButtonComponent } from './nova-solicitacao-button/nova-solicitacao-button.component';

@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    NovaSolicitacaoButtonComponent,
    MyMatTableComponent,
  ],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss',
})
export class LoggedPageComponent {
  private formularioHttpClient = inject(FormularioHttpClient);

  formularios: FormularioResponseDto[] = [];

  columnDefs: MyColumnDefs<FormularioResponseDto> = [
    {
      columnId: 'codFormulario',
      headerLabel: 'Nº Solicitação',
      cellContent: (item) => item.codFormulario,
    },
    {
      columnId: 'tipoFormulario',
      headerLabel: 'Tipo Formulário',
      cellContent: (item) => item.tipoFormulario,
    },
    {
      columnId: 'situacaoFormulario',
      headerLabel: 'Situação Formulário',
      cellContent: (item) => item.situacaoFormulario,
    },
    {
      columnId: 'codigoCar',
      headerLabel: 'Código CAR',
      cellContent: (item) => item.codigoCar ?? '-',
    },
  ];

  constructor() {
    this.formularioHttpClient
      .getFormularios()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.formularios = data));
  }
}
