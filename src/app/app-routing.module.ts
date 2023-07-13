import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { MenuPage } from './pages/menu/menu.page';
import { MenuloginPage } from './pages/menulogin/menulogin.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

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
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'menulogin',
    loadChildren: () => import('./pages/menulogin/menulogin.module').then( m => m.MenuloginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },  {
    path: 'admin-login',
    loadChildren: () => import('./components/admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  }




  //{
   // path: 'admin-services',
    //loadChildren: () => import('./pages/admin-services/admin-services.module').then( m => m.AdminServicesPageModule)
  //}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
