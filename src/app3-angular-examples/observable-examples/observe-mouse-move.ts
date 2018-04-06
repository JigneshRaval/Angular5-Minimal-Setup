import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

type Pair = [number, number];

const moves: Observable<Pair> = Observable.fromEvent(document.body, "mousemove").map(e => [e.screenX, e.screenY]);

const position = new BehaviorSubject<Pair>([0, 0]);

// Example without throttle
moves.subscribe(position);

// Example with throttle
// moves.throttle(ev => Observable.interval(2000)).subscribe(position);

position.value // returns the current position of the mouse

console.log(position.value);

export default position;

