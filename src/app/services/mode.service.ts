import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private modeSubject = new BehaviorSubject<string>('calender');
  mode$ = this.modeSubject.asObservable();
  private modeSub = new BehaviorSubject<string>('global');
  modee$ = this.modeSub.asObservable();

  setMode(mode: string): void {
    this.modeSubject.next(mode);
  }
  setModeDashboard(mode: string): void {
    this.modeSub.next(mode);
  }
}
