import { Component, inject } from '@angular/core';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { AuthStore } from './stores/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
}
