import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NovaSolicitacaoButtonComponent } from './nova-solicitacao-button/nova-solicitacao-button.component';

@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NovaSolicitacaoButtonComponent],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss',
})
export class LoggedPageComponent {}
