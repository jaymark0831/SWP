import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { LoginPage } from './login/login.page';
import { MenuPage } from './pages/menu/menu.page';
import { MenuloginPage } from './pages/menulogin/menulogin.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage
  },
  {
    path: 'menulogin',
    component: MenuloginPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'menulogin',
    loadChildren: () => import('./pages/menulogin/menulogin.module').then( m => m.MenuloginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
