import { Component, Input} from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() title:string='Sin título';
 
 // Doughnut
@Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
@Input('data') public doughnutChartData: MultiDataSet = [
   [350, 450, 100]
 ];

//  public doughnutChartType: ChartType = 'doughnut';
 public colors: Color[]=[
  {
    backgroundColor: [
      
      '#315BF5',
      '#DE2162',
      '#6FF5A7',
      '#FACB26',
      '#D1FFDA',
    ]
  }

]

}
