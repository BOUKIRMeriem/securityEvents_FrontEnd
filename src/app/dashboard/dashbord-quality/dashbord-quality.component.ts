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
  selector: 'app-dashbord-quality',
  templateUrl: './dashbord-quality.component.html',
  styleUrls: ['./dashbord-quality.component.scss']
})
export class DashbordQualityComponent implements OnInit {
  public card: Partial<ChartOptions>;
  public machines: Partial<ChartOptions>;
  public cause: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  public tracking: Partial<ChartOptions>;
  years: number[] = [];
  months: string[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;

  constructor(private modeService: ModeService) {
    this.cards();
    this.machine();
    this.causes();
    this.chart();
    this.causestrascking();

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
  cards() {
    this.card = {
      series: [39, 20, 59, 10],
      chart: {
        type: "donut",
        height: 210,
        width: 400,

      },
      labels: ["CR", "CO", "CI", "vide"],
      colors: ["#c0392b", "#f1c40f", "#e59866", "#5499c7"],
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
        text: "Cards",
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
          data: [856, 856, 861, 520, 480, 350, 320, 333, 254, 100, 200, 255, null]
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
      colors: ["#d35400"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -25,
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
          "Machine1",
          "Machine16",
          "Machine3",
          "Machine17",
          "Machine18",
          "Machine20",
          "Machine24",
          "Machine23",
          "Machine4",
          "Machine2",
          "Machine12",
          "Machine13",
          "vide"
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
        min: 0,
        max: 1000,

      },
      title: {
        text: "Pareto Machines",
        align: "center",
        offsetY: 30,
        style: {
          color: "#000",
          fontSize: '11px',
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
  causes() {
    this.cause = {
      series: [
        {
          name: "Inflation",
          data: [1200, 1157, 1130, 1000, 600, 70]
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
          "cause26",
          "cause1",
          "cause27",
          "cause3",
          "cause25",
          "cause20"
        ],
        labels: {
          style: {
            colors: "#000",
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
        min: 0,
        max: 1400,


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
  chart() {
    this.chartOptions = {
      series: [
        {
          name: "CA",
          data: [null, 0, null, null, null, null, null, null, 0, null, null, null, null, null]
        },
        {
          name: "CO",
          data: [0, null, 0, null, 0, 0, 0, 0, null, 0, 0, 0, 0, 900]
        },
        {
          name: "CM",
          data: [200, 0, 202, 0, 400, 300, 250, 200, 0, 101, 1020, 710, 1190, 70]
        }
      ],
      chart: {
        height: 180,
        width: 970,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
      },
      colors: ["#f1c40f", "#e67e22", "#e74c3c"],
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
        position: "top",
        offsetY: 25,
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
        tickAmount: 7,
        min: 0,
        max: 1400
      },
      xaxis: {
        labels: {
          style: {
            colors: "#000",
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
      markers: {
        size: [4, 4, 4, 4],
        colors: ["#f1c40f", "#e67e22", "#e74c3c"],
        strokeColors: 'white',
        strokeWidth: 1,
        hover: {
          size: 6,
        }
      },


    };
  }
  causestrascking() {
    this.tracking = {
      series: [
        {
          name: "Cause5",
          data: [null, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, null, null, null]
        },
        {
          name: "Cause8",
          data: [null, 0, 0, 100, 180, 200, 300, 100, 100, 100, 100, null, null, null]
        },
        {
          name: "Cause4",
          data: [null, null, null, null, null, null, null, null, null, null, null, 650, 180, 300]
        },
        {
          name: "Cause1",
          data: [null, null, null, null, null, null, null, null, null, null, null, 180, 450, 600]
        },
        {
          name: "Cause9",
          data: [null, null, null, null, null, null, null, null, null, null, null, 400, 100, 100]
        },
        {
          name: "Cause6",
          data: [90, null, null, null, null, null, null, null, null, null, null, null, null, null]
        },
      ],
      colors: ["#2471a3", "#cb4335", "#f4d03f", "#af7ac5", "#82e0aa", "#dc7633"],
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
        categories: ['30juin', '29juin', '28juin', '27juin', '26juin', '25juin', '24juin', '23juin', '22juin', '21juin', '20juin', '19juin', '18juin', '17juin'],
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
        width: 1
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
          offsetX: -10,
        },
        tickAmount: 7,
        min: 0,
        max: 700

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

