import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthStore } from '../../../stores/auth.store';
import { ThemeSwitcherComponent } from '../../_shared/theme-switcher/theme-switcher.component';
import { NovaSolicitacaoButtonComponent } from './nova-solicitacao-button/nova-solicitacao-button.component';

@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ThemeSwitcherComponent,
    NovaSolicitacaoButtonComponent,
  ],
  templateUrl: './logged-page.component.html',
  styleUrl: './logged-page.component.scss',
})
export class LoggedPageComponent {
  readonly authStore = inject(AuthStore);

  onLogout() {
    this.authStore.setUser(null);
  }
}
