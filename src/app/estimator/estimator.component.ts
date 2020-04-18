import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-estimator',
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.css']
})
export class EstimatorComponent implements OnInit {

  startTime = moment();
  timeSinceStart: string = '0:00:00';
  buttons: Array<number> = Array(Number(this.route.snapshot.paramMap.get('numTasks'))).fill(0).map((x, i) => i);
  curTask: number = 1;
  etoc: string = 'n/a';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    setInterval(() => {
      this.timeSinceStart = moment.utc(moment().diff(this.startTime)).format('H:mm:ss');
    }, 500)
  }

  finishTask = (task) => {
    this.etoc = moment(((this.buttons.length / task) * (moment().valueOf() - this.startTime.valueOf()) + this.startTime.valueOf())).local().format('h:mm A');
    this.curTask = task + 1;
  }

}
