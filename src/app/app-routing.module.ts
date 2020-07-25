import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'things', component: ThingsComponent },
  { path: '', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
