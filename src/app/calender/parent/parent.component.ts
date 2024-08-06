import { Component } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  selectedMode: string;

  constructor(private modeService: ModeService) { }

  ngOnInit(): void {
    this.modeService.mode$.subscribe(mode => this.selectedMode = mode);
  }
}
