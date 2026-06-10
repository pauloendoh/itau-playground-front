import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { AuthStore } from './stores/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
}
