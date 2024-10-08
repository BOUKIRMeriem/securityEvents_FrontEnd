import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calender/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CroixSecuriteComponent } from './calender/croix-securite/croix-securite.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CercleComponent } from './calender/cercle/cercle.component';
import { ParentComponent } from './calender/parent/parent.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Parent1Component } from './dashboard/parent1/parent1.component';
import { EntityComponent } from './dashboard/entity/entity.component';
import { DashboardGlobalComponent } from './dashboard/dashboard-global/dashboard-global.component';
import { DashbordAvailabilityComponent } from './dashboard/dashbord-availability/dashbord-availability.component';
import { DashbordQualityComponent } from './dashboard/dashbord-quality/dashbord-quality.component';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CroixSecuriteComponent,
    CercleComponent,
    ParentComponent,
    Parent1Component,
    EntityComponent,
    DashboardGlobalComponent,
    DashbordAvailabilityComponent,
    DashbordQualityComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTooltipModule,
    NgbModule,
    NgbPopoverModule,
    NgApexchartsModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
