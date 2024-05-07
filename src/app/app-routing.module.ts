import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista-vacas',
    loadChildren: () => import('./pages/lista-vacas/lista-vacas.module').then( m => m.ListaVacasPageModule)
  },
  {
    path: 'crear-vaca',
    loadChildren: () => import('./pages/crear-vaca/crear-vaca.module').then( m => m.CrearVacaPageModule)
  },
  {
    path: 'info-vaca/:id',
    loadChildren: () => import('./pages/info-vaca/info-vaca.module').then( m => m.InfoVacaPageModule)
  },
  {
    path: 'actualizar-vaca/:id',
    loadChildren: () => import('./pages/actualizar-vaca/actualizar-vaca.module').then( m => m.ActualizarVacaPageModule)
  },
  {
    path: 'add-palpacion/:id',
    loadChildren: () => import('./pages/palpacion/add-palpacion/add-palpacion.module').then( m => m.AddPalpacionPageModule)
  },
  {
    path: 'update-palpacion/:animalId/:palpacionId',
    loadChildren: () => import('./pages/palpacion/update-palpacion/update-palpacion.module').then( m => m.UpdatePalpacionPageModule)
  },
  {
    path: 'add-parto/:id',
    loadChildren: () => import('./pages/parto/add-parto/add-parto.module').then( m => m.AddPartoPageModule)
  },
  {
    path: 'update-parto/:animalId/:partoId',
    loadChildren: () => import('./pages/parto/update-parto/update-parto.module').then( m => m.UpdatePartoPageModule)
  },
  {
    path: 'add-mes-leche/:id',
    loadChildren: () => import('./pages/mesleche/add-mes-leche/add-mes-leche.module').then( m => m.AddMesLechePageModule)
  },
  {
    path: 'update-mes-leche/:animalId/:lecheMesId',
    loadChildren: () => import('./pages/mesleche/update-mes-leche/update-mes-leche.module').then( m => m.UpdateMesLechePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'info-palpacion/:animalId',
    loadChildren: () => import('./pages/palpacion/info-palpacion/info-palpacion.module').then( m => m.InfoPalpacionPageModule)
  },
  {
    path: 'info-parto/:animalId',
    loadChildren: () => import('./pages/parto/info-parto/info-parto.module').then( m => m.InfoPartoPageModule)
  },
  {
    path: 'info-mes-leche/:animalId',
    loadChildren: () => import('./pages/mesleche/info-mes-leche/info-mes-leche.module').then( m => m.InfoMesLechePageModule)
  },
  {
    path: 'info-condiciones/:animalId',
    loadChildren: () => import('./pages/condiciones/info-condiciones/info-condiciones.module').then( m => m.InfoCondicionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
