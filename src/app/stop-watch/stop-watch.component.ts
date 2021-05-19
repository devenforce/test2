import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit {
  public started: boolean = false;
  public stopped: boolean = false;
  private subsctiption?: Subscription
  private time?: moment.Moment
  /** miliseconds to update */
  private timerStep: number = 33;
  /** Формат вывода */
  private format: string = 'HH:mm:ss:SS'

  constructor() { }

  public get displayTime(): string {
    return this.time?.format(this.format) ?? this.format.split(':').fill('00').join(':')
  }

  ngOnInit(): void {
    this.reset()
  }

  public start(){
    this.started = true;
    if(this.stopped) this.reset();
  }

  public stop(){
    this.started = false;
    this.stopped = true;
  }

  public wait(){
    this.started = false;
  }

  public reset(){
    delete this.time;
    this.stopped = false;
    this.subsctiption?.unsubscribe();
    this.subsctiption = interval(this.timerStep).subscribe( () => this.update() );
  }

  private update(){
    if(!this.started) return;
    if(!this.time) this.time = moment().hours(0).minute(0).second(0).millisecond(0);
    this.time.add(this.timerStep, 'milliseconds')
  }
}
