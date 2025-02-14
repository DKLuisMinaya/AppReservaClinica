import { Routes } from '@angular/router';
import {LoginGuard} from './guards/login.guard'
import { PermissionGuard } from './guards/permission.guard';
export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  
  
  
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage),
    
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage),
    canActivate: [LoginGuard],
  },
  {
    path: 'home-u',
    loadComponent: () => import('./home-u/home-u.page').then( m => m.HomeUPage),
    canActivate: [LoginGuard],
  },
  {
    path: 'agenda',
    loadComponent: () => import('./agenda/agenda.page').then( m => m.AgendaPage),
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
    canActivate: [LoginGuard],
  },

];
