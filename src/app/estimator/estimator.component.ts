import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

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
  etoc;
  totalQuantityOfBreaks: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.timeSinceStart = moment.utc(moment().diff(this.startTime)).format('H:mm:ss');
    }, 500);
  }

  finishTask = (task) => {
    this.etoc = moment(
      (this.buttons.length / task) * (moment().valueOf() - this.startTime.valueOf() - this.totalQuantityOfBreaks) + this.startTime.valueOf() + this.totalQuantityOfBreaks
    );
    this.curTask = task + 1;
  }

  dialogBox;
  takeBreak = templateRef => {
    let initialBreakQuantity = this.totalQuantityOfBreaks;
    let initialEtoc = this.etoc
    let breakStartTime = moment().valueOf();
    this.dialogBox = this.dialog.open(templateRef, {
      width: '250px'
    });

    let intervalRef = setInterval(() => {
      this.totalQuantityOfBreaks = initialBreakQuantity + (moment().valueOf() - breakStartTime);
      console.log(this.totalQuantityOfBreaks);
      if (this.curTask > 1) this.etoc = moment(initialEtoc.valueOf() + this.totalQuantityOfBreaks);
    }, 500);

    this.dialogBox.afterClosed().subscribe(() => {
      clearInterval(intervalRef);
      this.totalQuantityOfBreaks = initialBreakQuantity + (moment().valueOf() - breakStartTime);
    });
  }

  closeDialogBox = () => this.dialogBox.close();

}
