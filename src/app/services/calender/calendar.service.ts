import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CalendarEvent } from '../../models/events.model';
import { Observable } from 'rxjs';
import { kpi } from '../../models/kpi.model';

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

  add(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.baseUrl}/add`, event);
  }
  getKpi(): Observable<kpi> {
    return this.http.get<kpi>(`${this.baseUrl}/kpi`);
  }

}

