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
  ApexMarkers,
  ApexTooltip
} from "ng-apexcharts";
import { DashboardGlobalService } from 'src/app/services/dashboard/dashboardGlobal.service';
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
  tooltip: ApexTooltip;

};
@Component({
  selector: 'app-dashbord-availability',
  templateUrl: './dashbord-availability.component.html',
  styleUrls: ['./dashbord-availability.component.scss']
})
export class DashbordAvailabilityComponent implements OnInit {
  public type: Partial<ChartOptions>;
  public paretoMachines: Partial<ChartOptions>;
  public cause: Partial<ChartOptions>;
  public tracking: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  years: number[] = [];
  months: any[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;
  machines: any[] = [];
  selectedMachineId: number;
  showFailureType: boolean = false;
  showChart: boolean = false;
  showMachine: boolean = false;
  showCauses: boolean = false;
  showcausestrascking: boolean = false;
  entity: Set<string> = new Set();


  constructor(private modeService: ModeService, private dashboardGlobalService: DashboardGlobalService) {

  }
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
        this.entity = new Set(this.machines.map(machine => machine.entity));
        if (this.machines.length > 0) {
          this.selectedMachineId = this.machines[0].id;
          this.getFailureType(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getFailureTypeByMonth(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.calculateAvailability(this.selectedYear, this.selectedMonthIndex + 1);
          this.getCauses(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getCausesTracking(this.selectedYear, this.selectedMachineId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
// Récupère les données sur les types d'arrêts pour l'année, le mois et la machine spécifiés.
  getFailureType(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getFailureType(year, month, machineId).subscribe(
      (data) => {
        this.failureType(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  failureType(data: any) {
    if (data.nonPlanifier === 0 && data.planifier === 0) {
      this.showFailureType = false;
      return;
    }


    this.type = {
      series: [data.planifier, data.nonPlanifier],
      chart: {
        type: "donut",
        height: 230,
        width: 400,

      },
      labels: ["AP", "ANP"],
      colors: ["#af7ac5", "#ec7063"],
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
    this.showFailureType = true;
  }

// Récupère les données sur les types d'arrêts regroupées par jour pour l'année, le mois et la machine spécifiés.
  getFailureTypeByMonth(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getFailureTypeByMonth(year, month, machineId).subscribe(
      (data) => {
        this.chart(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
  chart(data: any) {
    const categories: string[] = [];
    const nonPlanifier: number[] = [];
    const planifier: number[] = [];

    if (data.length === 0) {
      this.showChart = false;
      return;
    }
    data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    data.forEach((item: any) => {
      nonPlanifier.push(item.nonPlanifier);
      planifier.push(item.planifier);
      categories.push(new Date(item.date).toLocaleDateString("fr-FR"));
    });
    const isSingleDataPoint = (dataSet: number[]) => dataSet.length === 1;

    this.chartOptions = {
      series: [
        {
          name: "AP",
          data: planifier
        },
        {
          name: "ANP",
          data: nonPlanifier
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
      colors: ["#f1c40f", "#e74c3c"],
      stroke: {
        curve: "straight",
        width: [
          isSingleDataPoint(planifier) ? 0 : 1,
          isSingleDataPoint(nonPlanifier) ? 0 : 1
        ]
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
      markers: {
        size: [
          isSingleDataPoint(planifier) ? 4 : 0,
          isSingleDataPoint(nonPlanifier) ? 4 : 0
        ],
        colors: ["#f1c40f", "#e74c3c"],
        strokeColors: 'white',
        strokeWidth: 1,
        hover: {
          size: 6,
        }
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: -10
        }
      }
    };
    this.showChart = true;
  }
// Calcule la disponibilité des machines pour l'année et le mois spécifiés.
  calculateAvailability(year: number, month: number) {
    this.dashboardGlobalService.calculateAvailability(year, month).subscribe(
      (data) => {
        this.machine(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  machine(data: any) {
    const categories: string[] = [];
    const availability: number[] = [];
    data.forEach((item: any) => {
      availability.push(item.availability);
      categories.push(item.machine);
    });
    if (data.length === 0) {
      this.showMachine = false;
      return;
    }
    this.paretoMachines = {
      series: [
        {
          name: "Inflation",
          data: availability
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
        categories: categories,
        labels: {
          style: {
            colors: "#000",
            fontSize: '11px',
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
        offsetY: 28,
        style: {
          color: "#000",
          fontSize: '12px',
        },
        margin: 0
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 15
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " min";
          }
        }
      },
    };
    this.showMachine = true;

  }
// Récupère les données sur les noms des arrêts et leur durée pour l'année, le mois et la machine spécifiés.
  getCauses(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getCauses(year, month, machineId).subscribe(
      (data) => {
        this.causes(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  causes(data: any) {
    const categories: string[] = [];
    const duree: number[] = [];
    data.forEach((item: any) => {
      duree.push(item.duree);
      categories.push(item.nomArrete);
    });
    if (data.length === 0) {
      this.showCauses = false;
      return;
    }
    this.cause = {
      series: [
        {
          name: "Inflation",
          data: duree
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
        categories: categories,
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
        offsetY: 15,
        style: {
          color: "#000",
          fontSize: '12px',
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " min";
          }
        }
      },
    };
    this.showCauses = true;
  }
// Récupère les données sur les noms des arrêts et leur durée pour l'année et la machine spécifiés, regroupées par mois.
  getCausesTracking(year: number, machineId: number) {
    this.dashboardGlobalService.getCausesTracking(year, machineId).subscribe(
      (data) => {
        this.causestrascking(data);

      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }
    );
  }
  causestrascking(data: any) {
    const categories: number[] = [];
    const seriesData: { name: string, data: number[] }[] = [];

    const monthToAbbreviation = (month: number): string => {
      const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      return monthNames[month - 1] || "unknown";
    };

    data.forEach((item: any) => {
      if (!categories.includes(item.mois)) {
        categories.push(item.mois);
      }

      let seriesItem = seriesData.find(series => series.name === item.nomArrete);
      if (seriesItem) {
        seriesItem.data.push(item.dureeTotale);
      } else {
        seriesData.push({
          name: item.nomArrete,
          data: [item.dureeTotale]
        });
      }
    });
    seriesData.forEach(series => {
      const paddedData = [];
      categories.forEach(month => {
        const monthData = data.find(item => item.mois === month && item.nomArrete === series.name);
        paddedData.push(monthData ? monthData.dureeTotale : null);
      });
      series.data = paddedData;
    });

    if (data.length === 0) {
      this.showcausestrascking = false;
      return;
    }

    this.tracking = {
      series: seriesData,
      colors: ["#2471a3", "#cb4335", "#f4d03f", "#af7ac5", "#82e0aa", "#dc7633", "#34495e", "#FA8072"],
      chart: {
        height: 210,
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
        offsetY: 5,
        style: {
          color: "#000",
          fontSize: '14px',
          fontWeight: 'bold',
        },
        margin: 0
      },
      xaxis: {
        categories: categories.map(month => monthToAbbreviation(month)),
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

      },
      grid: {
        padding: {
          left: 10,
          right: 10,
          top: 0,
          bottom: -8
        }
      }
    };

    this.showcausestrascking = true;
  }

  onMachineSelect(event: any) {
    this.selectedMachineId = event.target.value;
  this.updateChart();
  }
  updateChart() {
    if (this.selectedMachineId) {
      this.getFailureType(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
      this.getFailureTypeByMonth(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
      this.calculateAvailability(this.selectedYear, this.selectedMonthIndex + 1);
      this.getCauses(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
      this.getCausesTracking(this.selectedYear, this.selectedMachineId);

    }
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
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setModeDashboard(target.value);

  }

}
