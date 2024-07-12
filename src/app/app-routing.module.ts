import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CroixSecuriteComponent } from './croix-securite/croix-securite.component';


const routes: Routes = [

  { path:'',  component: CalendarComponent},
  { path:'croix',  component: CroixSecuriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
