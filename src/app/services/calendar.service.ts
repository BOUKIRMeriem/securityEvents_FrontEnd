import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CalendarEvent } from '../models/events.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'http://localhost:8080/events';
  constructor(private http: HttpClient) { }
  getSecurityEventsByMonth(month: number) {
    return this.http.get<Array<CalendarEvent>>(`${this.baseUrl}/month/${month}`)
  }
  updateSecurityEvent(id: number, securityEvent: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.baseUrl}/update/${id}`, securityEvent);
  }

}
