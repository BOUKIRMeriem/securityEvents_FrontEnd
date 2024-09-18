import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
import { DashboardGlobalService } from 'src/app/services/dashboard/dashboardGlobal.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  currentMode: string;
  years: number[] = [];
  months: any[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  machines: any[] = [];
  chartOptions: { [key: string]: Partial<ChartOptions> } = {};
  entities: string[] = [];
  allMachines: any[] = [];
  selectedEntity: string;

  constructor(private modeService: ModeService, private dashboardGlobalService: DashboardGlobalService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear();
    this.selectedMonthIndex = new Date().getMonth();
    for (let i = 0; i <= 100; i++) {
      this.years.push(new Date().getFullYear() - i);
    }
    this.modeService.modee$.subscribe(mode => {
      this.currentMode = mode;
    });
    this.getMonthsForYear(this.selectedYear);
    this.getAllMachine();
  }
// Récupère la liste des machines et les stocke dans la variable `allMachines`.
// Extrait les entités uniques à partir de la liste des machines et les stocke dans la variable `entities`.
  getAllMachine() {
    this.dashboardGlobalService.getAllMachine().subscribe(
      (data) => {
        this.allMachines = data;
        this.entities = Array.from(new Set(this.allMachines.map(machine => machine.entity)));
        if (this.entities.length > 0) {
          this.selectedEntity = this.entities[0];
          this.getTrsByEntity(this.selectedYear, this.selectedMonthIndex + 1, this.selectedEntity);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
// Récupère les données TRS pour une entité spécifique, pour l'année et le mois spécifiés.
// Les données reçues sont sous forme d'objet, où chaque clé représente une machine et les valeurs sont des tableaux d'objets contenant les dates et les valeurs TRS.
  getTrsByEntity(year: number, month: number, entity: string) {
    this.dashboardGlobalService.getTrsByEntity(year, month, entity).subscribe(
      (data: { [key: string]: any }) => {
        this.machines = Object.keys(data);
        this.machines.forEach(machine => {
          const chartData = data[machine].map(d => ({
            x: new Date(d.date).getTime(),
            y: d.trs
          }));
          this.createChartOptions(machine, chartData);
        });
        console.log(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
  createChartOptions(machine: string, data: { x: number, y: number }[]) {
    this.chartOptions[machine] = {
      series: [
        {
          name: `${machine}`,
          data: data
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: data.length === 1 ? 'scatter' : 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ["#28a745"],
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 'bold',
        },
        background: {
          enabled: true,
        },
        formatter: function (val: number) {
          return val + "%";
        }
      },
      markers: {
        size: 4,
        colors: ['#28a745'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: data.length === 1 ? 0 : 2,
      },
      title: {
        text: `${machine}`,
        align: "center",
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "dd/MM/yyyy",
          style: {
            colors: "#000",
            fontSize: '10px',
          },
        },
        axisBorder: {
          show: true,
          color: "#000",
          offsetX: 0
        },
        axisTicks: {
          show: true,
          color: "#000",
          offsetX: 0
        },
        tickPlacement: 'between',
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(0) + "%";
          },
          style: {
            colors: "#000",
          },
          offsetX: 10,
        },
        tickAmount: 5,
        min: 0,
        max: 100
      },
      tooltip: {
        theme: "dark"
      },
      grid: {
        padding: {
          left: 20,
          right: 30,
          top: 0,
          bottom: 0
        }
      }
    };
  }

  onEntitySelect(event: any) {
    this.selectedEntity = event.target.value;
    this.updateChart();
  }
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setModeDashboard(target.value);
  }
  onChangeYear(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = parseInt(target.value, 10);
    this.getMonthsForYear(this.selectedYear);
    this.updateChart();
  }
  getMonthsForYear(selectedYear: number) {
    this.months = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    for (let i = 0; i < 12; i++) {
      const date = new Date(selectedYear, i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      let isAccessible: boolean;
      if (selectedYear === currentYear) {
        isAccessible = i <= currentMonth;
      } else if (selectedYear < currentYear) {
        isAccessible = true;
      }
      this.months.push({ name: monthName, isAccessible });
    }
  }
  onMonthSelect(index: number) {
    this.selectedMonthIndex = index;
    this.updateChart();
  }
  updateChart() {
    this.getTrsByEntity(this.selectedYear, this.selectedMonthIndex + 1, this.selectedEntity);
  }
}
