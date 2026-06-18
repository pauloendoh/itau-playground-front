import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { urls } from '../../../../utils/constants/urls';
import { TipoFormulario } from '../../../../utils/types/tipo-formulario';
import { NovaSolicitacaoDialogComponent } from './nova-solicitacao-dialog/nova-solicitacao-dialog.component';

@Component({
  selector: 'app-nova-solicitacao-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="primary" (click)="openDialog()">
      Nova Solicitação (q)
    </button>
  `,
})
export class NovaSolicitacaoButtonComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  // TODO: talvez seja interessante usar um pacote ou função utilitária reutilizar/facilitar no futuro;
  @HostListener('document:keydown.q', ['$event'])
  onKeyQ(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target as HTMLElement;
    const isEditable =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable;
    if (isEditable || this.dialog.openDialogs.length > 0) return;
    this.openDialog();
  }

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
