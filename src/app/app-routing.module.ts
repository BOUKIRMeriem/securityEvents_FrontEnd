import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CroixSecuriteComponent } from './croix-securite/croix-securite.component';
import { CercleComponent } from './cercle/cercle.component';
import { ParentComponent } from './parent/parent.component';



const routes: Routes = [

  { path:'calender',  component: CalendarComponent},
  { path:'croix',  component: CroixSecuriteComponent},
  {path:'cercle' , component:CercleComponent},
  {path:'' , component:ParentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
