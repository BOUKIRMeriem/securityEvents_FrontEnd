import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexMarkers,
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
  selector: 'app-machine-q',
  templateUrl: './machine-q.component.html',
  styleUrls: ['./machine-q.component.scss']
})
export class MachineQComponent implements OnInit {
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions16: Partial<ChartOptions>;
  public chartOptions17: Partial<ChartOptions>;
  public chartOptions18: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions20: Partial<ChartOptions>;
  public chartOptions23: Partial<ChartOptions>;
  public chartOptions24: Partial<ChartOptions>;
  currentMode: string;
  constructor(private modeService: ModeService) {
    this.machine1();
    this.machine16();
    this.machine17();
    this.machine18();
    this.machine2();
    this.machine20();
    this.machine23();
    this.machine24();
  }
  ngOnInit() {
    this.modeService.modee$.subscribe(mode => {
      this.currentMode = mode;
    });
  }
  machine1() {
    const rawData = [96, 97, null, null, null, null];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions1 = {
      series: [
        {
          name: "Machine 1",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 1",
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
          datetimeUTC: false,
        },

        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine16() {
    const rawData = [100, 100, null, null, null, 99];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions16 = {
      series: [
        {
          name: "Machine 16",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 16",
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
          datetimeUTC: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine17() {
    const rawData = [100, 100, null, null, null, 99];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions17 = {
      series: [
        {
          name: "Machine 17",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 17",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine18() {
    const rawData = [99, null, null, null, null, 99];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions18 = {
      series: [
        {
          name: "Machine 18",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 18",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine2() {
    const rawData = [null, 98, null, null, null, 95];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions2 = {
      series: [
        {
          name: "Machine 2",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 2",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine20() {
    const rawData = [98, null, null, null, null, 99];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions20 = {
      series: [
        {
          name: "Machine 20",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 20",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine23() {
    const rawData = [null, 99, null, null, null, 99];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions23 = {
      series: [
        {
          name: "Machine 23",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 23",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  machine24() {
    const rawData = [98, null, null, null, null, 98];
    const filteredData = rawData.map((val, index) => ({
      value: val,
      date: new Date("2023-10-11").getTime() + index * 86400000
    })).filter(entry => entry.value !== null);
    this.chartOptions24 = {
      series: [
        {
          name: "Machine 24",
          data: filteredData.map(entry => ({
            x: entry.date,
            y: entry.value
          }))
        }
      ],
      chart: {
        height: 128,
        width: '97%',
        type: "line",
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
        colors: ['green'],
        strokeColors: 'white',
        strokeWidth: 0.5,
        hover: {
          size: 6,
        }
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "Machine 24",
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
          datetimeUTC: false,
          show: true,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: true,
          color: "#000"
        },
        axisTicks: {
          show: true,
          color: "#000"
        },
        tickPlacement: 'between',
        min: new Date("2023-10-10").getTime(),
        max: new Date("2023-10-16").getTime(),
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
  onModeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.modeService.setModeDashboard(target.value);
  }
}
