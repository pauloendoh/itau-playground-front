import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';
import { ContainerComponent } from '../../_shared/boxes/container/container.component';
import { ThemeSwitcherComponent } from '../../_shared/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ThemeSwitcherComponent,
    ContainerComponent,
  ],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.scss',
})
export class LoggedLayoutComponent {
  readonly authStore = inject(AuthStore);

  onLogout() {
    this.authStore.setUser(null);
  }
}
