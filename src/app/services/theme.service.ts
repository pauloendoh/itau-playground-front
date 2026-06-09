import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

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

  get themes() {
    return [
      { value: 'light' as Theme, label: 'Light' },
      { value: 'dark' as Theme, label: 'Dark' },
      { value: 'system' as Theme, label: 'System' },
    ];
  }

  applyTheme(theme: Theme) {
    const scheme = theme === 'system' ? 'light dark' : theme;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    this.#renderer.setStyle(document.documentElement, 'color-scheme', scheme);

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
    const valid: Theme[] = ['light', 'dark', 'system'];
    return valid.includes(stored!) ? stored! : 'system';
  }
}
