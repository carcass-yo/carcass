import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found.component';
import {HomePageComponent} from './home-page.component';

const appRoutes: Routes = [
  // {
  //   path: 'signin',
  //   component: SignInComponent,
  //   outlet: 'modal'
  // },
  // {
  //   path: 'actions',
  //   loadChildren: './actions/actions.module#ActionsModule'
  // },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: (process.env.ENV !== 'production')})
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {}
