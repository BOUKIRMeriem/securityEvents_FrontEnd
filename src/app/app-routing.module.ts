import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calender/calendar/calendar.component';
import { CroixSecuriteComponent } from './calender/croix-securite/croix-securite.component';
import { CercleComponent } from './calender/cercle/cercle.component';
import { ParentComponent } from './calender/parent/parent.component';
import { Parent1Component } from './dashboard/parent1/parent1.component';
import { EntityComponent } from './dashboard/entity/entity.component';
import { DashboardGlobalComponent } from './dashboard/dashboard-global/dashboard-global.component';
import { DashbordAvailabilityComponent } from './dashboard/dashbord-availability/dashbord-availability.component';
import { DashbordQualityComponent } from './dashboard/dashbord-quality/dashbord-quality.component';




const routes: Routes = [

  { path:'calender',  component: CalendarComponent},
  { path:'croix',  component: CroixSecuriteComponent},
  {path:'cercle' , component:CercleComponent},
  {path:'' , component:ParentComponent},
  {path:'dashboard', component:Parent1Component},
  {path:'entity' , component:EntityComponent},
  {path:'global' , component:DashboardGlobalComponent},
  {path:'availability' , component:DashbordAvailabilityComponent},
  {path:'quality' , component:DashbordQualityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
