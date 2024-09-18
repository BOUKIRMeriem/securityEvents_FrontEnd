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
  months: any[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;
  machines: any[] = [];
  selectedMachineId: number;
  showChart: boolean = false;
  showOEEPerDayTeam: boolean = false;
  showOEEPerTeam: boolean = false;

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
// Récupère la liste des machines et les stocke dans la variable `machines`.
  getAllMachine() {
    this.dashboardGlobalService.getAllMachine().subscribe(
      (data) => {
        this.machines = data;
        if (this.machines.length > 0) {
          this.selectedMachineId = this.machines[0].id;
          this.getTRSGlobal(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getTRSByDay(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getGoodAndBadQuality(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
// Récupère les moyennes de TRS , qualité, performance et disponibilité 
// pour l'année, le mois et la machine spécifiés. 
// Les données reçues sont ensuite utilisées pour calculer les indicateurs OEE, qualité, disponibilité et performance.
  getTRSGlobal(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getTRSGlobal(year, month, machineId).subscribe(
      (data: any) => {
        console.log('Données reçues pour TRS Moyenne:', data);
        this.oEE(data);
        this.quality(data);
        this.availability(data);
        this.performance(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
  oEE(data: any) {
    this.OEE = {
      series: [data.oee],
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
              fontSize: '30px',
              show: true,
              offsetY: 10,
              color: '#000'
            }
          }
        }
      },
      colors: ["#40E0D0"],
    };
  }
  quality(data: any) {
    this.Q = {
      series: [data.quality],
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
              fontSize: '18px',
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
  availability(data: any) {
    this.A = {
      series: [data.availability],
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
              fontSize: '18px',
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
  performance(data: any) {
    this.P = {
      series: [data.performance],
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
              fontSize: '18px',
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
// Récupère les moyennes de TRS , qualité, performance et disponibilité 
// par jour pour l'année, le mois et la machine spécifiés.
// Les données reçues sont ensuite utilisées pour calculer les indicateurs OEE par jour.
  getTRSByDay(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getTRSByDay(year, month, machineId).subscribe(
      (data: any) => {
        console.log('Données reçues:', data);
        this.oEEday(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  oEEday(data: any) {
    const oeeData: number[] = [];
    const availabilityData: number[] = [];
    const qualityData: number[] = [];
    const performanceData: number[] = [];
    const categories: string[] = [];

    if (data.length === 0) {
      this.showChart = false;
      return;
    }
    data.forEach((item: any) => {
      oeeData.push(item.oee);
      availabilityData.push(item.availability);
      qualityData.push(item.quality);
      performanceData.push(item.performance);
      categories.push(new Date(item.date).toLocaleDateString("fr-FR"));
    });

    const isSingleDataPoint = (dataSet: number[]) => dataSet.length === 1;

    this.OEEDay = {
      series: [
        {
          name: "OEE",
          data: oeeData
        },
        {
          name: "A",
          data: availabilityData
        },
        {
          name: "Q",
          data: qualityData
        },
        {
          name: "P",
          data: performanceData
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
        curve: "smooth",
        width: [
          isSingleDataPoint(oeeData) ? 0 : 5,
          isSingleDataPoint(availabilityData) ? 0 : 1,
          isSingleDataPoint(qualityData) ? 0 : 1,
          isSingleDataPoint(performanceData) ? 0 : 1
        ]
      },
      title: {
        text: "OEE day",
        align: "center",
        offsetY: 22,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      xaxis: {
        categories: categories,
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
        size: [
          isSingleDataPoint(oeeData) ? 5 : 4,
          isSingleDataPoint(availabilityData) ? 5 : 0,
          isSingleDataPoint(qualityData) ? 5 : 0,
          isSingleDataPoint(performanceData) ? 5 : 0
        ],
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
    this.showChart = true;
  }
// Récupère les données sur la qualité (conformes et non conformes) 
// pour l'année, le mois et la machine spécifiés, regroupées par équipe.
  getGoodAndBadQuality(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getGoodAndBadQuality(year, month, machineId).subscribe(
      (data) => {
        console.log('Données reçues pour TRS Moyenne:', data);
        this.perDayTeam(data);
        this.OEEperTeam(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  perDayTeam(data: any) {
    const good: number[] = [];
    const bad: number[] = [];
    const categories: string[] = [];

    if (data.length === 0) {
      this.showOEEPerDayTeam = false;
      return;
    }

    // Trier les données par date
    data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    data.forEach((item: any) => {
      good.push(item.good);
      bad.push(item.bad);

      // Combinez la date et l'entité en une seule chaîne
      const dateStr = new Date(item.date).toLocaleDateString("fr-FR");
      const combined = `${dateStr} (${item.entity})`;

      categories.push(combined);
    });

    this.dayTeam = {
      series: [
        {
          name: "OK parts produced-Sum",
          data: good
        },
        {
          name: "Loss-Sum",
          data: bad
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
        categories: categories,
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
    this.showOEEPerDayTeam = true;
  }
  OEEperTeam(data: any) {
    if (data.length === 0) {
      this.showOEEPerTeam = false;
      return;
    }
    const groupedData: { [key: string]: { good: number, bad: number } } = {};
    data.forEach((item: any) => {
      if (!groupedData[item.entity]) {
        groupedData[item.entity] = { good: 0, bad: 0 };
      }
      groupedData[item.entity].good += item.good;
      groupedData[item.entity].bad += item.bad;
    });
    const good: number[] = [];
    const bad: number[] = [];
    const okPartsTarget: number[] = [];
    const categories: string[] = [];

    for (const entity in groupedData) {
      categories.push(entity);
      good.push(groupedData[entity].good);
      bad.push(groupedData[entity].bad);
      okPartsTarget.push(groupedData[entity].good + groupedData[entity].bad);
    }
    this.perTeam = {
      series: [
        {
          name: "ok-Parts-Target",
          data: okPartsTarget,
          type: "bar",
        },
        {
          name: "ok-parts-produced",
          data: good,
          type: "bar",
        },
        {
          name: "Loss-Parts",
          data: bad,
          type: "bar",
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
        offsetY: 10,
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
        categories: categories,
      },
      legend: {
        position: 'top',
        offsetY: -5,
        labels: {
          colors: "#000",

        },
      },
      yaxis: [
        {
          opposite: false,
          labels: {
            style: {
              colors: "#000",
            },
            offsetX: -10,
          },
        },
        // {
        //   opposite: true,
        //   labels: {
        //     formatter: function (value: number) {
        //       return value.toFixed(0) + "%";
        //     },
        //     style: {
        //       colors: "#000",
        //     },
        //     offsetX: -5,
        //   },
        //   tickAmount: 10,
        //   min: 0,
        //   max: 100,
        // }
      ]

    };
    this.showOEEPerTeam = true;
  }
  
  onMachineSelect(event: any) {
    this.selectedMachineId = event.target.value;
   this.updateChart();
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
    if (this.selectedMachineId) {
      this.getTRSByDay(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
      this.getTRSGlobal(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
      this.getGoodAndBadQuality(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);

    }
  }
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setModeDashboard(target.value);
  }
}
