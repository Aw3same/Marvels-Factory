import { AfterViewInit, Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { ChartData } from '../../../types/charts'

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css',
})
export class BarComponent implements AfterViewInit  {
  @Input() set dataInput(data: ChartData[] | undefined) {
    if (data) {
      this.data = data
    }
  }

  @Input() chartId! : string

  data: ChartData[] = []

  private svg: any
  private margin = 50
  private width = 350 - this.margin * 2
  private height = 200 - this.margin * 2

  ngAfterViewInit() {
    this.createSvg()
    this.drawBars(this.data)
  }

  private createSvg(): void {
    this.svg = d3
      .select(`figure#${this.chartId}`)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')
  }

  private drawBars(data: ChartData[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.key))
      .padding(0.2)

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 30]).range([this.height, 0])

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y))

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: ChartData) => x(d.key))
      .attr('y', (d: ChartData) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', '#673ab7')
  }
}
