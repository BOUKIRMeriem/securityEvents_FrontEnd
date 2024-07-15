import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CalendarService } from '../services/calendar.service';
import { CalendarEvent } from '../models/events.model';
import { kpi } from '../models/kpi.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-us');
  daysColorMap: Map<number, string> = new Map();
  selectedDay: number = 0;
  today: Date = new Date();
  maxMonth: string;
  selectedMonth: string;
  daysInMonth: number[] = [];
  groupedDays: number[][] = [];
  calendarEvents: CalendarEvent[] = [];
  kpiData: kpi; 

  constructor(private calendarService: CalendarService) {
    this.selectedMonth = `${this.today.getFullYear()}-${(this.today.getMonth() + 1).toString().padStart(2, '0')}`;
    this.maxMonth = this.datePipe.transform(this.today, 'yyyy-MM');
  }

  ngOnInit(): void {
    this.onSelectedMonthChange();
    this.fetchKpi();
  
  }

  onSelectedMonthChange(): void {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      const daysCount = new Date(year, month, 0).getDate();
      this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
      this.groupDays();
      this.getEventsByMonth(month);
    }
  }
  groupDays(): void {
    this.groupedDays = [];
    for (let i = 0; i < this.daysInMonth.length; i += 7) {
      this.groupedDays.push(this.daysInMonth.slice(i, i + 7));
    }
  }
  firePopOver(buttonId: string, selectedDay: number): void {
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
  updateDayColor(color: string): void {
    const formattedDate = `${this.selectedMonth}-${this.selectedDay.toString().padStart(2, '0')}`;
    const existingEvent = this.calendarEvents.find(event =>
      event.localDate === formattedDate
    );
    if (existingEvent) {
      existingEvent.eventType = color;
      this.onUpdateEvent(existingEvent);
    } else {
      const temporaryId = Math.floor(Math.random() * 1000);

      const newEvent: CalendarEvent = {
        id: temporaryId,
        localDate: formattedDate,
        eventType: color,
      };
      this.onSaveEvent(newEvent);
    }
    this.daysColorMap.set(this.selectedDay, color);
  }

  onUpdateEvent(event: CalendarEvent): void {
    const eventId = event.id;
    this.calendarService.updateSecurityEvent(eventId, event).subscribe(
      response => {
        console.log('Événement mis à jour avec succès :', response);
        const index = this.calendarEvents.findIndex(e => e.id === eventId);
        if (index !== -1) {
          this.calendarEvents[index] = response; 
        }
        this.updateDaysColorMap(); 
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'événement :', error);
      }
    );
  }
  onSaveEvent(event: CalendarEvent): void {
    this.calendarService.add(event).subscribe(
      response => {
        console.log('Événement enregistré avec succès :', response);
        this.calendarEvents.push(response);
        this.updateDaysColorMap(); 
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de l\'événement :', error);
      }
    );
  }

  updateDaysColorMap(): void {
    this.daysColorMap.clear();
    const [currentYear, currentMonth] = this.selectedMonth.split('-').map(Number);
  
    this.calendarEvents.forEach(event => {
      const date = new Date(event.localDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      if (year === currentYear && month === currentMonth) {
        this.daysColorMap.set(day, event.eventType);
      }
    });
  }
  
  getEventsByMonth(month: number): void {
    this.calendarService.getSecurityEventsByMonth(month).subscribe({
      next: (response: CalendarEvent[]) => {
        console.log(response);
        this.calendarEvents = response;
        this.updateDaysColorMap(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  fetchKpi() {
    this.calendarService.getKpi()
      .subscribe(
        (data) => {
          this.kpiData = data; 
          console.log('KPI Data:', this.kpiData);
        },
        (error) => {
          console.error('Error fetching KPI:', error);
        }
      );
  }
 
  isPastDay(day: number): boolean {
    const selectedDate = new Date(this.selectedMonth);
    selectedDate.setDate(day);
    return selectedDate > this.today;
  }
  
}
