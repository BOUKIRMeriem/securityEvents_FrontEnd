import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-croix-securite',
  templateUrl: './croix-securite.component.html',
  styleUrls: ['./croix-securite.component.scss']
})
export class CroixSecuriteComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('en-us');
  maxMonth: string;
  today: Date = new Date();
  selectedMonth: string;
  daysInMonth: number[] = [];
  selectedDay: number = 0;
  daysColorMap: Map<number, string> = new Map();
  daysColorJsonCroix: { [key: string]: string } = {}; // Renamed according to your preference
  arrayColorRed: string[] = [];
  lastRedDate: string = '';
  daysSinceLastRed: number = 0;
  maxResult: number = 0;
 

  constructor() {
    this.selectedMonth = `${this.today.getFullYear()}-${(this.today.getMonth() + 1).toString().padStart(2, '0')}`;
    this.maxMonth = this.datePipe.transform(this.today, 'yyyy-MM');
  }

  ngOnInit(): void {
    this.onSelectedMonthChange();
    if (localStorage.getItem('daysColorJsonCroix')) {
      this.daysColorJsonCroix = JSON.parse(localStorage.getItem('daysColorJsonCroix'));
      this.updateDaysColorMap();
      this.accidentFree(); 
      this.  getMaxPeriodWithoutAccident();
    }
  }

  onSelectedMonthChange(): void {
    this.daysInMonth = [];
    if (this.selectedMonth) {
      const year = Number(this.selectedMonth.split('-')[0]);
      const month = Number(this.selectedMonth.split('-')[1]);
      const numDays = new Date(year, month, 0).getDate();
      for (let i = 1; i <= numDays; i++) {
        this.daysInMonth.push(i);
      }
      this.updateDaysColorMap();
    }  
  }

  firePopOver = (buttonId: string, selectedDay: number): void => {
    this.selectedDay = selectedDay;
    const button = document.getElementById(buttonId);
    const popOverContent = document.getElementById('popOverContent');
    if (button && popOverContent) {
      const popOver = new bootstrap.Popover(
        button, {
          content: popOverContent,
          placement: 'bottom',
          html: true
        }
      );
    }
  }

  updateDayColor(color: string): void {
    this.daysColorMap.set(this.selectedDay, color);
    this.createJson(this.selectedDay, color);
  }

  createJson(day: number, color: string): void {
    const [year, month] = this.selectedMonth.split('-');
    const key = `${day}-${month}-${year}`;
    this.daysColorJsonCroix[key] = color;
    localStorage.setItem('daysColorJsonCroix', JSON.stringify(this.daysColorJsonCroix));
    this.accidentFree(); 
    this.getMaxPeriodWithoutAccident();
  }
  updateDaysColorMap(): void {
    this.daysColorMap = new Map();
    const [currentYear, currentMonth] = this.selectedMonth.split('-').map(Number);
    Object.keys(this.daysColorJsonCroix).forEach(key => {
      const [day, month, year] = key.split('-').map(Number);
      if (year === currentYear && month === currentMonth) {
        this.daysColorMap.set(day, this.daysColorJsonCroix[key]);
      }
    });
    this.accidentFree(); 
    this.  getMaxPeriodWithoutAccident();
  }
  accidentFree(): void {
    this.arrayColorRed = Object.keys(this.daysColorJsonCroix)
      .filter(key => this.daysColorJsonCroix[key] === 'red')
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
}
