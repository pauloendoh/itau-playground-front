import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <span [style.color]="situacao() === 'ATIVO' ? 'green' : 'red'">
      {{ situacao() }}
    </span>
  `,
})
export class SituacaoCellComponent {
  situacao = input.required<string>();
}
