import { Component } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
@Component({
  selector: 'app-parent1',
  templateUrl: './parent1.component.html',
  styleUrls: ['./parent1.component.scss']
})
export class Parent1Component {

  selectedMode: string;

  constructor(private modeService: ModeService) { }

  ngOnInit(): void {
    this.modeService.modee$.subscribe(mode => this.selectedMode = mode);
  }

}
