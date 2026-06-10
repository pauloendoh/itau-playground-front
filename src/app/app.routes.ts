import { Routes } from '@angular/router';
import { LoggedPageComponent } from './components/pages/logged-page/logged-page.component';
import { SolicitacaoPageComponent } from './components/pages/solicitacao-page/solicitacao-page.component';

export const routes: Routes = [
  { path: '', component: LoggedPageComponent },
  { path: 'solicitacoes/nova', component: SolicitacaoPageComponent },
];
