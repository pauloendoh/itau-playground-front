import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { Theme, ThemeService } from './services/theme.service';
import { AuthStore } from './stores/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, HomePageComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly themeService = inject(ThemeService);
  readonly authStore = inject(AuthStore);

  onThemeSelect(theme: Theme) {
    this.themeService.applyTheme(theme);
  }
}
