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
  selector: 'app-dashbord-quality',
  templateUrl: './dashbord-quality.component.html',
  styleUrls: ['./dashbord-quality.component.scss']
})
export class DashbordQualityComponent implements OnInit {
  public card: Partial<ChartOptions>;
  public paretoMachines: Partial<ChartOptions>;
  public cause: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;
  public tracking: Partial<ChartOptions>;
  years: number[] = [];
  months: any[] = [];
  selectedYear: number;
  selectedMonthIndex: number;
  currentMode: string;
  machines: any[] = [];
  selectedMachineId: number;
  showCards: boolean = false;
  showCardsByDate: boolean = false;
  showMachine: boolean = false;
  showCause:boolean=false;
  showCausesTrascking:boolean=false;
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
          this.getCards(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getCardsByDate(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getQualityByMachine(this.selectedYear, this.selectedMonthIndex + 1);
          this.getOperationBYQuality(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
          this.getOperationBYQualityAndMonth(this.selectedYear, this.selectedMachineId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
// Récupère les moyennes des pièces (non conformes, conformes et réparables) pour l'année, le mois et la machine spécifiés.
  getCards(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getCards(year, month, machineId).subscribe(
      (data) => {
        console.log(data);
        this.cards(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  cards(data: any) {
    if (data.bad === 0 && data.good === 0 && data.repairable === 0) {
      this.showCards = false;
      return;
    }
    this.card = {
      series: [data.bad, data.good, data.repairable],
      chart: {
        type: "donut",
        height: 230,
        width: 400,

      },
      labels: ["PNC", "PC", "PR"],
      colors: ["#c0392b", "#f1c40f", "#e59866"],
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
    this.showCards = true;
  }
// Récupère les moyennes des pièces (non conformes, conformes et réparables) pour l'année, le mois et la machine spécifiés,
// regroupées par jour.
  getCardsByDate(year: number, month: number, machineId: number) {
    this.dashboardGlobalService.getCardsByDate(year, month, machineId).subscribe(
      (data) => {
        console.log(data);
        this.chart(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);

      }

    );
  }
  chart(data: any) {
    const good: number[] = [];
    const bad: number[] = [];
    const repairable: number[] = [];
    const categories: string[] = [];
    if (data.length === 0) {
      this.showCardsByDate = false;
      return;
    }
    data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    data.forEach((item: any) => {
      good.push(item.good);
      bad.push(item.bad);
      repairable.push(item.repairable);
      categories.push(new Date(item.date).toLocaleDateString("fr-FR"));
    });
    const isSingleDataPoint = (dataSet: number[]) => dataSet.length === 1;
    this.chartOptions = {
      series: [
        {
          name: "PR",
          data: repairable
        },
        {
          name: "PC",
          data: good
        },
        {
          name: "PNC",
          data: bad
        }
      ],
      chart: {
        height: 190,
        width: 970,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
      },
      colors: ["#e59866", "#f1c40f", "#c0392b"],
      stroke: {
        curve: "straight",
        width: [
          isSingleDataPoint(bad) ? 0 : 1,
          isSingleDataPoint(good) ? 0 : 1,
          isSingleDataPoint(repairable) ? 0 : 1
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

      },
      xaxis: {
        categories: categories,
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
        size: [
          isSingleDataPoint(good) ? 4 : 0,
          isSingleDataPoint(bad) ? 4 : 0,
          isSingleDataPoint(repairable) ? 4 : 0
        ],
        colors: ["#e59866", "#f1c40f", "#c0392b"],
        strokeColors: 'white',
        strokeWidth: 1,
        hover: {
          size: 6,
        }
      },


    };
    this.showCardsByDate = true;
  }
// Récupère les temps de qualité des pièces (non conformes et réparables) pour l'année et le mois spécifiés,
// regroupés par machine
  getQualityByMachine(year:number,month :number){
    this.dashboardGlobalService.getQualityByMachine(year,month).subscribe(
      (data)=>{
           this.machine(data);
      },
      (error)=>{
        console.error(error);
      }
    );
  }
  machine(data:any) {
    const categories: string[] = [];
    const tempBad: number[] = [];
    const tempRepairable: number[] = [];
   
    data.forEach((item: any) => {
      tempBad.push(item.tempBad);
      tempRepairable.push(item.tempRepairable);
      categories.push(item.machine);
    });
    if (data.length === 0) {
      this.showMachine = false;
      return;
    }
    this.paretoMachines = {
      series: [
        {
          name: "PNC",
          data: tempBad
        },
        {
          name: "PR",
          data:  tempRepairable
        }
      ],
      chart: {
        height: 250,
        width: 660,
        type: "bar",
        stacked: true,
        toolbar: {
          show: false
        },
      },
      colors: ["#c0392b", "#e59866"],
      plotOptions: {
        bar: {
          horizontal: false,
        }
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
      xaxis: {
        categories:categories,
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
          offsetX: -10,
        },
      },
      title: {
        text: "Pareto Machines",
        align: "center",
        offsetY: 25,
        style: {
          color: "#000",
          fontSize: '12px',
        }
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 10
        }
      },
      legend: {
        position: "top",
        offsetY: 10,
        labels: {
          colors: "#000",
        },
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
// Récupère les noms des opérations liées à la qualité non conforme  pour l'année, le mois et la machine spécifiés.
// pour l'année, le mois et la machine spécifiés.
  getOperationBYQuality(year:number,month:number,machineId:number){
    this.dashboardGlobalService.getOperationBYQuality(year,month,machineId).subscribe(
       (data)=>{
        this.causes(data);
       },
       (error)=>{
        console.error(error);
       }
    );
  }
  causes(data:any) {
    const countBad :number[]=[];
    const categories:String[]=[];
    data.forEach((item:any) => {
       countBad.push(item.countBad),
       categories.push(item.operation)
    });
    if(data.length === 0){
      this.showCause=false;
      return;
    }
  
    this.cause = {
      series: [
        {
          name: "Inflation",
          data: countBad
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
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        },
        background: {
          enabled: true,
        },
      },

      xaxis: {
        categories:categories,
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
      },
      title: {
        text: "Pareto Causes",
        align: "center",
        offsetY: 15,
        style: {
          color: "#000",
          fontSize: '12px',
        }
      }
    };
    this.showCause=true;
  }
// Récupère les noms des opérations liées à la qualité non conforme pour l'année et la machine spécifiés,
// regroupées par mois.
  getOperationBYQualityAndMonth(year:number,machineId:number){
    this.dashboardGlobalService.getOperationBYQualityAndMonth(year,machineId).subscribe(
       (data)=>{
        this.causestrascking(data);
       },
       (error)=>{
        console.error(error);
       }
    );
  }
  causestrascking(data: any) {
    const months: number[] = [];
    const seriesDataMap: { [key: string]: number[] } = {};

    const monthToAbbreviation = (month: number): string => {
        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        return monthNames[month - 1] || "unknown";
    };

    data.forEach((item: any) => {
        if (!months.includes(item.month)) {
            months.push(item.month);
        }

        if (!seriesDataMap[item.operation]) {
            seriesDataMap[item.operation] = new Array(months.length).fill(null);
        }

        const monthIndex = months.indexOf(item.month);
        seriesDataMap[item.operation][monthIndex] = item.countBad;
    });

    const seriesData = Object.keys(seriesDataMap).map(operation => ({
        name: operation,
        data: seriesDataMap[operation].map(value => value === null ? null : value)
    }));

    if (data.length === 0) {
        this.showCausesTrascking = false;
        return;
    }

    this.tracking = {
        series: seriesData,
        colors: ["#2471a3", "#cb4335"],
        chart: {
            height: 210,
            width: 1200,
            type: 'scatter',  
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
            categories: months.map(month => monthToAbbreviation(month)),
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
            show: false,  // Désactiver les lignes entre les points
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
            min: 0,
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

    this.showCausesTrascking = true;
}

onMachineSelect(event: any) {
  this.selectedMachineId = event.target.value;
  this.updateChart();
}
updateChart() {
  if (this.selectedMachineId) {
    this.getCards(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
    this.getCardsByDate(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
    this.getQualityByMachine(this.selectedYear, this.selectedMonthIndex + 1);
    this.getOperationBYQuality(this.selectedYear, this.selectedMonthIndex + 1, this.selectedMachineId);
    this.getOperationBYQualityAndMonth(this.selectedYear, this.selectedMachineId);
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

