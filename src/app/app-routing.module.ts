import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { AddressFormComponent } from '../app/components/address-form/address-form.component'; 

const routes: Routes = [
  { path: '',                 component: HomeComponent        },
  { path: 'home',             component: HomeComponent        },
  { path: 'address-form',     component: AddressFormComponent },
  { path: 'address-form/:id', component: AddressFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
