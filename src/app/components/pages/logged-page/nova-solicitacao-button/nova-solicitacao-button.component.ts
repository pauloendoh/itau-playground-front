import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { urls } from '../../../../utils/constants/urls';
import {
  NovaSolicitacaoDialogComponent,
  TipoFormulario,
} from './nova-solicitacao-dialog/nova-solicitacao-dialog.component';

@Component({
  selector: 'app-nova-solicitacao-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="primary" (click)="openDialog()">
      Nova Solicitação
    </button>
  `,
})
export class NovaSolicitacaoButtonComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  openDialog() {
    const dialogRef = this.dialog.open(NovaSolicitacaoDialogComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((tipo: TipoFormulario | null) => {
      if (tipo) {
        this.router.navigate([urls.pages.novaSolicitacao], {
          queryParams: { tipo },
        });
      }
    });
  }
}
