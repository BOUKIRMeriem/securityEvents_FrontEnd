import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
import { DashboardGlobalService } from 'src/app/services/dashboard/dashboardGlobal.service';
import {
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexGrid,
  ApexXAxis,
  ApexFill,
  ApexLegend,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexYAxis,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexMarkers,
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  grid: ApexGrid,
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  stroke: ApexStroke;
  markers: ApexMarkers;
};
@Component({
  selector: 'app-dashboard-global',
  templateUrl: './dashboard-global.component.html',
  styleUrls: ['./dashboard-global.component.scss']
})
export class DashboardGlobalComponent implements OnInit {
  public OEE: Partial<ChartOptions>;
  public P: Partial<ChartOptions>;
  public Q: Partial<ChartOptions>;
  public A: Partial<ChartOptions>;
  public dayTeam: Partial<ChartOptions>;
  public OEEDay: Partial<ChartOptions>;
  public perTeam: Partial<ChartOptions>;
  years: number[] = [];
  months: string[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;


  constructor(private modeService: ModeService) {
    this.oEE();
    this.performance();
    this.quality();
    this.availability();
    this.perDayTeam();
    this.oEEday();
    this.OEEperTeam();
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
  oEE() {
    this.OEE = {
      series: [85],
      chart: {
        height: 200,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "72%"
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              fontSize: '45px',
              show: true,
              offsetY: 15,
              color: '#000'
            }
          }
        }
      },
      colors: ["#40E0D0"],
    };
  }
  performance() {
    this.P = {
      series: [97],
      chart: {
        height: 110,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "62%"
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              fontSize: '20px',
              show: true,
              offsetY: 5,
              color: '#000'
            }
          }
        }
      },
      colors: ["#40E0D0"],
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
  quality() {
    this.Q = {
      series: [93],
      chart: {
        height: 110,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "62%"
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              fontSize: '20px',
              show: true,
              offsetY: 5,
              color: '#000'
            }
          }
        }
      },
      colors: ["#40E0D0"],
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
  availability() {
    this.A = {
      series: [95],
      chart: {
        height: 110,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "62%"
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              fontSize: '20px',
              show: true,
              offsetY: 5,
              color: '#000'
            }
          }
        }
      },
      colors: ["#40E0D0"],
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
  oEEday() {
    this.OEEDay = {
      series: [
        {
          name: "OEE",
          data: [86, 80, 80, 80, 85]
        },
        {
          name: "A",
          data: [88, 82, 84, 83, 87]
        },
        {
          name: "Q",
          data: [90, 85, 87, 86, 89]
        },
        {
          name: "P",
          data: [85, 79, 78, 81, 84]
        }
      ],
      chart: {
        height: 280,
        width: 900,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ["#00FFFF", "#FF0000", "#00FF00", "#0000FF"],
      stroke: {
        curve: "straight",
        width: [5, 1, 1, 1]
      },
      title: {
        text: "OEE day",
        align: "center",
        offsetY: 20,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      xaxis: {
        categories: [
          "01/07/2024",
          "02/07/2024",
          "03/07/2024",
          "04/07/2024",
          "05/07/2024"
        ],
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        labels: {
          style: {
            colors: "#000",
          }
        }
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: function (value: number) {
            return value.toFixed(0) + "%";
          },
          style: {
            colors: "#000",
          },
          offsetX: -10,
        },
        tickAmount: 10,
        min: 0,
        max: 100
      },
      dataLabels: {
        enabled: true,
        offsetY: -6,
        style: {
          colors: ['#424949'],
          fontSize: '10px',
          fontWeight: 'bold',
        },
        background: {
          enabled: true,
        },
        formatter: function (val: number, opts: any) {
          if (opts.w.config.series[opts.seriesIndex].name === "OEE") {
            return val + "%";
          }
          return "";
        }
      },
      markers: {
        size: [4, 0, 0, 0],
        colors: ["#00FFFF", "#FF0000", "#00FF00", "#0000FF"],
        strokeColors: 'white',
        strokeWidth: 1,
        hover: {
          size: 6,
        }
      },
      legend: {
        position: "top",
        offsetY: 10,
        labels: {
          colors: "#000",
        },
      },

    };
  }
  perDayTeam() {
    this.dayTeam = {
      series: [
        {
          name: "OK parts produced-Sum",
          data: [8000, 8000, 8000, 8000, 8000, 8000, 8000]
        },
        {
          name: "Loss-Sum",
          data: [2000, 2000, 2000, 2000, 2000, 2000, 2000]
        }
      ],
      chart: {
        type: "bar",
        height: 260,
        width: 800,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ["#00FFFF", "#FF6347"],
      plotOptions: {
        bar: {
          horizontal: false,
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/07/2023",
          "02/07/2023",
          "03/07/2023",
          "04/07/2023",
          "05/07/2023",
          "06/07/2023",
          "07/07/2023"
        ],
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        labels: {
          style: {
            colors: "#000",
            fontSize: '12px',
          }
        }
      },
      legend: {
        position: "top",
        offsetY: 10,
        labels: {
          colors: "#000",
        },
      },
      fill: {
        opacity: 1
      },
      title: {
        text: "OEE per Day Team",
        align: "center",
        offsetY: 20,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0,
      },
      dataLabels: {
        enabled: true,
        offsetY: 1,
        style: {
          colors: ['#000'],
          fontSize: '11.5px',
          fontWeight: 'bold',
        },
        background: {
          enabled: true,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000",
          },
        },
      },
      grid: {
        padding: {
          left: 20,
          right: 30,
          top: 0,
          bottom: 0
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
  OEEperTeam() {
    const okPartsProduced = 8000;
    const lossParts = 2000;
    const okPartsTarget = okPartsProduced + lossParts;
  
    this.perTeam = {
      series: [
        {
          name: "ok-Parts-Target",
          data: [okPartsTarget]
        },
        {
          name: "ok-parts-produced",
          data: [okPartsProduced]
        },
        {
          name: "Loss-Parts",
          data: [lossParts]
        }
      ],
      chart: {
        type: "bar",
        height: 240,
        width: 520,
        stacked: false,
        toolbar: {
          show: false
        },
      },
      colors: ["#f1c40f", "#00FFFF", "#FF6347"],
      title: {
        text: "OEE per Team",
        align: "center",
        offsetY: 5,
        style: {
          color: "#000",
          fontSize: '12px',
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: 1,
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 'bold',
        },
        background: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [
          "AM"
        ],
      },
      legend: {
        position: 'top',
        labels: {
          colors: "#000",
        },
      },
      yaxis: [
        {
          labels: {
            style: {
              colors: "#000",
            },
            offsetX: -10,
          },
          tickAmount: 6,
          min: 0,
          max: 12000,
        },
        {
          opposite: true,
          labels: {
            formatter: function (value: number) {
              // Calculate the percentage based on the maximum value of the primary axis
              const percentage = (value / 12000) * 100;
              return percentage.toFixed(0) + "%";
            },
            style: {
              colors: "#000",
            },
            offsetX: -5,
          },
          tickAmount: 10,
          min: 0,
          max: 12000,
        }
      ]
    };
  }
  
  
  
}





  


