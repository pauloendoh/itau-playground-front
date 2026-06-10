import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'color-scheme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #renderer: Renderer2;
  readonly #themeSignal = signal<Theme>(this.#getInitialTheme());

  constructor(rendererFactory: RendererFactory2) {
    this.#renderer = rendererFactory.createRenderer(null, null);
    this.applyTheme(this.#themeSignal());
  }

  get theme() {
    return this.#themeSignal.asReadonly();
  }

  applyTheme(theme: Theme) {
    const isDark = theme === 'dark';

    this.#renderer.setStyle(document.documentElement, 'color-scheme', theme);

    if (isDark) {
      this.#renderer.addClass(document.documentElement, 'dark-theme');
    } else {
      this.#renderer.removeClass(document.documentElement, 'dark-theme');
    }

    this.#themeSignal.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  #getInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored === 'dark' ? 'dark' : 'light';
  }
}
