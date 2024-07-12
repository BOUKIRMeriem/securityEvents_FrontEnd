import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap";
import { CalendarService } from '../services/calendar.service'
import { CalendarEvent } from '../models/events.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-us')
  daysColorMap: Map<number, string> = new Map();
  daysColorJson  = {};
  selectedDay: number = 0;
  today: Date = new Date(); 
  maxMonth: string;
  selectedMonth: string;
  daysInMonth: number[] = []; 
  groupedDays: number[][] = []; 
  arrayColorRed: string[] = [];
  lastRedDate: string = '';
  daysSinceLastRed: number = 0;
  maxResult: number = 0;
  calendarEvents: Array<CalendarEvent> = []

  constructor( private calendarService: CalendarService) {
    this.selectedMonth  = `${this.today.getFullYear()}-${(this.today.getMonth() + 1).toString().padStart(2, '0')}`; 
    this.maxMonth = this.datePipe.transform(this.today, 'yyyy-MM')
  }
  ngOnInit(): void {
    this.onSelectedMonthChange();
    if (localStorage.getItem('daysColorJson')) {
      this.daysColorJson = JSON.parse(localStorage.getItem('daysColorJson'));
      this.updateDaysColorMap();
      this.accidentFree(); 
      this.getMaxPeriodWithoutAccident();
    }
    this.getEventsByMonth(this.today.getMonth() + 1 )

  }
  onSelectedMonthChange() {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number); 
      const daysCount = new Date(year, month, 0).getDate(); 
      this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1); 
      this.groupDays(); 
      this.updateDaysColorMap(); 
    }
  }
  groupDays() {
    this.groupedDays = [];
    for (let i = 0; i < this.daysInMonth.length; i += 7) {
      this.groupedDays.push(this.daysInMonth.slice(i, i + 7)); 
    }
  }
  firePopOver(buttonId: string, selectedDay: number) {
    this.selectedDay = selectedDay;
    const button = document.getElementById(buttonId);
    const popOverContent = document.getElementById('popOverContent');
    if (button && popOverContent) {
      new bootstrap.Popover(button, {
        content: popOverContent,
        placement: 'bottom',
        html: true
      });
    }
  }
  updateDayColor(color: string) {
    this.daysColorMap.set(this.selectedDay, color);
    this.createJson(this.selectedDay, color);
  }
  createJson(day: number, color: string) {
    const [year, month] = this.selectedMonth.split('-');
    const key = `${day}-${month}-${year}`;
    this.daysColorJson[key] = color;
    localStorage.setItem('daysColorJson', JSON.stringify(this.daysColorJson));
    this.accidentFree(); 
    this.getMaxPeriodWithoutAccident();
  }
  updateDaysColorMap() {
    this.daysColorMap.clear();
    const [currentYear, currentMonth] = this.selectedMonth.split('-').map(Number);
    Object.keys(this.daysColorJson).forEach(key => {
      const [day, month, year] = key.split('-').map(Number);
      if (year === currentYear && month === currentMonth) {
        this.daysColorMap.set(day, this.daysColorJson[key]);
      }
    });
    this.accidentFree(); 
    this.getMaxPeriodWithoutAccident();
  }
  accidentFree(): void {
    this.arrayColorRed = Object.keys(this.daysColorJson)
      .filter(key => this.daysColorJson[key] === 'red')
      .sort((a, b) => {
        const dateA = new Date(a.split('-').reverse().join('-'));
        const dateB = new Date(b.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
    this.lastRedDate = this.arrayColorRed.length > 0 ? this.arrayColorRed[this.arrayColorRed.length - 1] : '';
    if (this.lastRedDate) {
      const lastRedDateObj = new Date(this.lastRedDate.split('-').reverse().join('-'));
      
      const differenceInMillis = this.today.getTime() - lastRedDateObj.getTime();
      this.daysSinceLastRed = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    } else {
      this.daysSinceLastRed = 0;
    }
    console.log('Dates with red color :', this.arrayColorRed);
    console.log('Last red date:', this.lastRedDate);
    console.log('number of days without accident:', this.daysSinceLastRed -1);

  }
  getMaxPeriodWithoutAccident(): void {
    this.arrayColorRed.sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'));
      const dateB = new Date(b.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });
  
    let maxPeriod = 0;
    let max = 0;
    let max1=0;
    // Calcul de la période maximale sans incident
    const currentYear = this.today.getFullYear();
    const beginningOfYear = new Date(currentYear, 0, 1);//01 janvier 
    if (this.arrayColorRed.length > 0) {
      const firstDate = new Date(this.arrayColorRed[0].split('-').reverse().join('-'));
      const lastDate = new Date(this.arrayColorRed[this.arrayColorRed.length - 1].split('-').reverse().join('-'));
      max = Math.floor((firstDate.getTime() - beginningOfYear.getTime()) / (1000 * 60 * 60 * 24));
      console.log(max);
      max1=Math.floor((this.today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      console.log(max1);
      
    for (let i = 0; i < this.arrayColorRed.length - 1; i++) {
      const dateA = new Date(this.arrayColorRed[i].split('-').reverse().join('-'));
      const dateB = new Date(this.arrayColorRed[i + 1].split('-').reverse().join('-'));
      const diffInDays = Math.floor((dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays > maxPeriod) {
        maxPeriod = diffInDays -1;
      }
      
    }
    this.maxResult = Math.max(max, max1, maxPeriod);
    console.log('reccord :', this.maxResult);
    }
  }

  getEventsByMonth( month: number) {
    this.calendarService.getSecurityEventsByMonth(month).subscribe({
      next: (response: Array<CalendarEvent>) => {
        console.log(response);
        this.calendarEvents = response;
      },
      error: (err) => {
        console.error(err);
        
      }
    });   
  }
  updateEvent(eventId: number, updatedEvent: CalendarEvent) {
    this.calendarService.updateSecurityEvent(eventId, updatedEvent).subscribe({
      next: (response: CalendarEvent) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error updating event', error);
      }
    });
  }

}
