import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OeeDay } from '../../models/dashboardGlobal/oee-day';
import { Observable } from 'rxjs';
import { OeePerDayTeam } from '../../models/dashboardGlobal/oee-per-day-team';

@Injectable({
  providedIn: 'root'
})
export class DashboardGlobalService {
private urlBase1 ="http://localhost:8080/oeeDay"
private urlBase2 = 'http://localhost:8080/oeePerDayTeam';

  constructor(private http: HttpClient) { }

  addOEEDay(oeeDay : OeeDay) :Observable<OeeDay>{
    return this.http.post<OeeDay>(`${this.urlBase1}`,oeeDay);
  }
  getOEEDayByMonth(month : number){
    return this.http.get<Array<OeeDay>>(`${this.urlBase1}/month/${month}`);
  }
  addOEEPerDayTeam(oeePerDayTeam : OeePerDayTeam):Observable<OeePerDayTeam>{
    return this.http.post<OeePerDayTeam>(`${this.urlBase2}`, oeePerDayTeam);
  }
  getOEEPerDayTeamByMonth(month: number) {
    return this.http.get<Array<OeePerDayTeam>>(`${this.urlBase2}/month/${month}`);
  }
  

}
