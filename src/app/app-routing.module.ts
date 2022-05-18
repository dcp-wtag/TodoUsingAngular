import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowTasksComponent } from './components/shared-components/show-tasks/show-tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: ShowTasksComponent },
  { path: 'incomplete', component: ShowTasksComponent },
  { path: 'complete', component: ShowTasksComponent },
  { path: 'edit', component: ShowTasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
