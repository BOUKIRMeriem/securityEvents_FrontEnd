import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGlobalService {


  constructor(private http: HttpClient) { }

//global
  getTRSGlobal(year: number, month: number, machineId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/TRS/global/${year}/${month}/${machineId}`);
  }
  getTRSByDay(year: number, month: number, machineId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/TRS/day/${year}/${month}/${machineId}`);
  }
  getAllMachine(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/machine`);
  }
  getGoodAndBadQuality(year:number , month: number , machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/TRS/${year}/${month}/${machineId}`);
  }
  //availability
  getFailureType(year:number , month: number , machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/arretsMachine/global/${year}/${month}/${machineId}`);
  }
  getFailureTypeByMonth(year:number , month: number , machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/arretsMachine/day/${year}/${month}/${machineId}`);
  }
  calculateAvailability(year:number , month: number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/arretsMachine/availability/${year}/${month}`);
  }
  getCauses(year:number , month: number,machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/arretsMachine/causes/${year}/${month}/${machineId}`);
  }
  getCausesTracking(year:number ,machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/arretsMachine/causesTracking/${year}/${machineId}`);
  }
  //quality
  getCards(year:number , month: number,machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/quality/${year}/${month}/${machineId}`);
  }
  getCardsByDate(year:number , month: number,machineId : number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/quality/date/${year}/${month}/${machineId}`);
  }
  getQualityByMachine(year:number ,month:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/quality/${year}/${month}`);
  }
  getOperationBYQuality(year:number,month :number,machineId:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/quality/operation/${year}/${month}/${machineId}`);
  }
  getOperationBYQualityAndMonth(year:number,machineId:number):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/quality/operation/month/${year}/${machineId}`);
  }
  //entity
  getTrsByEntity(year:number,month:number, entity:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/TRS/entity/${year}/${month}/${entity}`);
  }


}
