import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexLegend,
  ApexPlotOptions,
  ApexGrid,
  ApexXAxis,
  ApexYAxis,
  ApexAxisChartSeries,
  ApexStroke,
  ApexMarkers
} from "ng-apexcharts";
export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  colors: string[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
};
@Component({
  selector: 'app-dashbord-availability',
  templateUrl: './dashbord-availability.component.html',
  styleUrls: ['./dashbord-availability.component.scss']
})
export class DashbordAvailabilityComponent implements OnInit {
  public type: Partial<ChartOptions>;
  public machines: Partial<ChartOptions>;
  public cause: Partial<ChartOptions>;
  public tracking: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  years: number[] = [];
  months: string[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;
  constructor(private modeService: ModeService) {
    this.failureType();
    this.machine();
    this.causes();
    this.causestrascking();
    this.chart();

  }
  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();
    this.selectedYear = currentYear;
    this.selectedMonthIndex = currentMonthIndex;
    for (let i = 0; i <= 100; i++) {
      this.years.push(currentYear - i);
    }
    this.getMonthsForYear(this.selectedYear);
    this.modeService.modee$.subscribe(mode => {
      this.currentMode = mode;
    });
  }
  failureType() {
    this.type = {
      series: [39, 20, 59, 10],
      chart: {
        type: "donut",
        height: 210,
        width: 400,

      },
      labels: ["AP", "NQ", "PA", "WH"],
      colors: ["#af7ac5", "#ec7063", "#f4d03f", "#5499c7"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 'bold',
        },
        background: {
          enabled: true,
        },
      },
      title: {
        text: "Failure Type",
        align: "left",
        offsetY: 40,
        offsetX: 30,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      legend: {
        position: "top",
        offsetY: 17,
        labels: {
          colors: "#000",
        },

      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%"
          }
        }
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  machine() {
    this.machines = {
      series: [
        {
          name: "Inflation",
          data: [4179, 1903, 1614, 1585, 1555, 1534, 1455, 1424, 1334, 1333, 1306, 965, 791]
        }
      ],
      chart: {
        height: 250,
        width: 660,
        type: "bar",
        toolbar: {
          show: false
        },
      },
      colors: ["#FFA07A"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        },
        background: {
          enabled: true,
        },
      },

      xaxis: {
        categories: [
          "Machine",
          "Machine2",
          "Machine20",
          "Machine1",
          "Machine4",
          "Machine3",
          "Machine23",
          "Machine17",
          "Machine16",
          "Machine22",
          "Machine24",
          "Machine13",
          "Machine21"
        ],
        labels: {
          style: {
            colors: "#000",
            fontSize: '10px',
          }
        },
        
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#000",
          },
          offsetX: -5,
        },
        tickAmount: 10,

      },
      title: {
        text: "Pareto Machines",
        align: "center",
        offsetY: 30,
        style: {
          color: "#000",
          fontSize: '11px',
        },
        margin: 0
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  causes() {
    this.cause = {
      series: [
        {
          name: "Inflation",
          data: [6791, 5068, 3660, 2330, 874, 857, 600, 600, 200, null]
        }
      ],
      chart: {
        height: 230,
        width: 650,
        type: "bar",
        toolbar: {
          show: false
        },
      },
      colors: ["#f1c40f"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        },
        background: {
          enabled: true,
        },
      },

      xaxis: {
        categories: [
          "cause9",
          "cause6",
          "cause8",
          "cause5",
          "cause4",
          "cause1",
          "cause26",
          "cause27",
          "cause25",
          "(vide)"
        ],
        labels: {
          style: {
            colors: "#000",
          }
        }, axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#000",
          },
          offsetX: -5,
        },


      },
      title: {
        text: "Pareto Causes",
        align: "center",
        offsetY: 25,
        style: {
          color: "#000",
          fontSize: '12px',
        }
      }

    };
  }
  causestrascking() {
    this.tracking = {
      series: [
        {
          name: "Cause5",
          data: [1300, 1000, null]
        },
        {
          name: "Cause8",
          data: [2500, 1200, null]
        },
        {
          name: "Cause4",
          data: [null, null, 600]
        },
        {
          name: "Cause1",
          data: [2400, 1200, null]
        },
        {
          name: "Cause9",
          data: [null, 1200, 3200]
        },
        {
          name: "Cause6",
          data: [3000, 2000, null]
        },
        {
          name: "Cause25",
          data: [null, null, 200]
        },
        {
          name: "Cause26",
          data: [700, 300, null]
        },
      ],
      colors: ["#2471a3", "#cb4335", "#f4d03f", "#af7ac5", "#82e0aa", "#dc7633", "#34495e", "#FA8072"],
      chart: {
        height: 150,
        width: 1200,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        }
      },
      title: {
        text: "Causes Tracking",
        align: "center",
        offsetY: 0,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      xaxis: {
        categories: ['jun', 'jul', 'oct'],
        labels: {
          style: {
            colors: "#000",
          },
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      markers: {
        size: 4
      },
      legend: {
        position: 'right',
        labels: {
          colors: "#000",
        },
      },
      yaxis: {
        opposite: true,
        labels: {
          style: {
            colors: "#000",
          },
          offsetX: -2,
        },
        tickAmount: 7,
        min: 0,
        max: 3500
      },
    };
  }
  chart() {
    this.chartOptions = {
      series: [
        {
          name: "PA",
          data: [1500, 2000, 900, 850, 800, 700, 750, 900, 800, 850, 700, 750, 700, 800, 900, 850, 900, 650, 800, 1300, 1500]
        },
        {
          name: "MQ",
          data: [1300, 700, 400, 900, 0, 900, 0, 900, 0, 900, 0, 900, 0, 900, 0, 0, 900, 0, 900, 1400, 0]
        },
        {
          name: "AP",
          data: [500, 500, 0, 900, 0, 900, 0, 900, 0, 900, 0, 900, 0, 0, 0, 0, 0, 0, 900, 0, 0]
        }
      ],
      chart: {
        height: 170,
        width: 970,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
      },
      colors: ["#f1c40f", "#e74c3c", "#2980b9"],
      stroke: {
        curve: "straight",
        width: 1
      },
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
      },
      legend: {
        position: "right",
        offsetY: 10,
        labels: {
          colors: "#000",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000",
          },
          offsetX: -10,
        },
        tickAmount: 5,
        min: 0,
        max: 2500
      },
      xaxis: {
        labels: {
          style: {
            colors: "#000",
          },
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
      },
      markers: {
        size: [4, 4, 4, 4],
        colors: ["#f1c40f", "#e74c3c", "#2980b9"],
        strokeColors: 'white',
        strokeWidth: 1,
        hover: {
          size: 6,
        }
      },


    };
  }
  onChangeYear(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = parseInt(target.value, 10);
    this.getMonthsForYear(this.selectedYear);
  }
  getMonthsForYear(selectedYear: number) {
    this.months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(selectedYear, i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      this.months.push(monthName);
    }
  }
  onMonthSelect(index: number) {
    this.selectedMonthIndex = index;
  }
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setModeDashboard(target.value);

  }
}
