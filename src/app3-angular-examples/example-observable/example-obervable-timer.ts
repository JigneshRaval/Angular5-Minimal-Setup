// Using timer from observable
import { timer } from 'rxjs/observable/timer';

const t = timer(1000);

t.subscribe(value => console.log(value));


// How to import this file
// import * as ObservableTimerExample from './example-observable/example-obervable-timer';
// console.log('ObservableTimerExample:', ObservableTimerExample);
