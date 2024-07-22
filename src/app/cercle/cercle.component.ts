import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as bootstrap from "bootstrap";
import { kpi } from '../models/kpi.model';
import { CalendarService } from '../services/calendar.service';
import { CalendarEvent } from '../models/events.model';
import { ModeService } from '../services/mode.service';
@Component({
  selector: 'app-cercle',
  templateUrl: './cercle.component.html',
  styleUrls: ['./cercle.component.scss']
})
export class CercleComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-us');
  maxMonth: string;
  selectedMonth: string;
  today: Date = new Date();
  daysInMonth: number[] = [];
  selectedDay: number = 0;
  kpiData: kpi;
  calendarEvents: CalendarEvent[] = [];
  daysColorMap: Map<number, string> = new Map();
  currentMode: string;
  constructor(private calendarService: CalendarService, private modeService: ModeService) {
    this.selectedMonth = `${this.today.getFullYear()}-${(this.today.getMonth() + 1).toString().padStart(2, '0')}`;
    this.maxMonth = this.datePipe.transform(this.today, 'yyyy-MM');

  }
  ngOnInit(): void {
    console.log(this.kpiData);
    this.kpiData = new kpi();
    this.onSelectedMonthChange();
    this.fetchKpi();
    this.modeService.mode$.subscribe(mode => {
      this.currentMode = mode;
    });
  }

  onSelectedMonthChange(): void {
    this.daysInMonth = [];
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      const daysCount = new Date(year, month, 0).getDate();
      for (let i = 1; i <= daysCount; i++) {
        this.daysInMonth.push(i);
      }
      this.getEventsByMonth(month);
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
      (response) => {
        console.log('Événement enregistré avec succès :', response);
        this.calendarEvents.push(response);
        this.updateDaysColorMap();
      },
      (error) => {
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
    this.calendarService.getKpi().subscribe(
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
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setMode(target.value);
  }
}
