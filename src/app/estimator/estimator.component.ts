import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-estimator',
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.css']
})
export class EstimatorComponent implements OnInit {

  buttonTimes: Array<number> = Array(Number(this.route.snapshot.paramMap.get('numTasks')));
  eta: number = undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  pressButton = index => {
    console.log(`${index} was pressed!`);
  }

}
