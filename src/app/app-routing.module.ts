import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "@guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: "full"
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'game',
    canActivate: [authGuard],
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
