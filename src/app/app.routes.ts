import { Routes } from '@angular/router';
import { LoggedPageComponent } from './components/pages/logged-page/logged-page.component';
import { SolicitacaoPageComponent } from './components/pages/solicitacao-page/solicitacao-page.component';
import { urls } from './utils/constants/urls';

export const routes: Routes = [
  { path: '', component: LoggedPageComponent },
  { path: urls.pages.novaSolicitacao, component: SolicitacaoPageComponent },
];
