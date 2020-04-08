import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimatorComponent } from './estimator/estimator.component';


const routes: Routes = [
  { path: 'app/:numTasks', component: EstimatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
