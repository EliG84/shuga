import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './graphs.component';

const routes: Routes = [
  {
    path: '',
    component: GraphsComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphsRoutingModule { }
