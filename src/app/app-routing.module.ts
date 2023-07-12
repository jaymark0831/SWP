import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
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
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
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
