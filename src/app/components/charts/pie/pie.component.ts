import { AfterViewInit, Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { ChartData } from '../../../types/charts'

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css',
})
export class PieComponent implements AfterViewInit {
  @Input() set dataInput(data: ChartData[] | undefined) {
    if (data) {
      this.data = data
    }
  }

  @Input() chartId! : string

  data: ChartData[] = []

  private svg: any
  private margin = 50
  private width = 350
  private height = 200
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin
  private colors: any

  private createSvg(): void {
    this.svg = d3
      .select(`figure#${this.chartId}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      )
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
}

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data.map(d => d.value.toString()))
      .range(['#673ab7', '#7d4fc6', '#9760d4', '#b072e2', '#ca84f0'])
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: ChartData) => Number(d.value));
  
    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  
    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);
  
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.key)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
}
