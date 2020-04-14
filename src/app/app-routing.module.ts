import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuardService], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home/audit', canActivate: [AuthGuardService],
    loadChildren: () => import('./audit/audit.module').then( m => m.AuditPageModule)
  },
  {
    path: 'home/outlet',
    loadChildren: () => import('./outlet/outlet.module').then( m => m.OutletPageModule)
  },
  {
    path: 'home/outlet/add', canActivate: [AuthGuardService],
    loadChildren: () => import('./outlet-add/outlet-add.module').then( m => m.OutletAddPageModule)
  },
  {
    path: 'home/outlet/map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'home/product', canActivate: [AuthGuardService],
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'home/product/detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
