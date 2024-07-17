import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CroixSecuriteComponent } from './croix-securite/croix-securite.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  { path:'',  component: CalendarComponent},
  { path:'croix',  component: CroixSecuriteComponent},
  {path:'test' , component:TestComponent},
  {path:'home' , component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
