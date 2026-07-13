import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormularioHttpClient } from '../../../http-clients/formulario/formulario.http-client';
import { FormularioResponseDto } from '../../../http-clients/formulario/types/formulario-response.dto';
import {
  MyColumnDefs,
  withComponent as buildCellComponent,
} from '../../../utils/types/my-column-def';
import { MyMatTableComponent } from '../../_shared/my-mat-table/my-mat-table-component';
import { NovaSolicitacaoButtonComponent } from './nova-solicitacao-button/nova-solicitacao-button.component';
import { SituacaoCellComponent } from './situacao-cell.component';

@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
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
      cellText: (item) => item.codFormulario,
    },
    {
      columnId: 'tipoFormulario',
      headerLabel: 'Tipo Formulário',
      cellText: (item) => item.tipoFormulario,
    },
    {
      columnId: 'situacaoFormulario',
      headerLabel: 'Situação',
      cellComponent: buildCellComponent(SituacaoCellComponent, (item) => ({
        situacao: item.situacaoFormulario,
      })),
    },
    {
      columnId: 'codigoCar',
      headerLabel: 'CAR',
      cellText: (item) => item.codigoCar ?? '-',
    },
  ];

  constructor() {
    this.formularioHttpClient
      .getFormularios()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.formularios = data));
  }
}
