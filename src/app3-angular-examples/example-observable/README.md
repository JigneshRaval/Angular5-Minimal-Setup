# Observable FAQs

## Push vs pull

A key thing to understand when using observables is that observables push.

Push and pull are two different ways that describe how a data producer communicates with the data consumer.

### Pull
When pulling, the data consumer decides when it get’s data from the data producer. The producer is unaware of when data will be delivered to the consumer.

Every javascript function uses the pull. The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call.

### Push

When pushing, it works the other way around. The data producer (the creator of the newsletter) decides when the consumer (the subscriber to the newsletter) gets the data.

Promises are the most common way of push in JavaScript today. A promise (the producer) delivers a resolved value to registered callbacks (the consumers), but unlike functions, it is the promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

Observables are a new way of pushing data in JavaScript. An observable is a Producer of multiple values, "pushing" them to subscribers.

> Note : Using the dollar sign in the name of a variable that is an observable, is considered best practice. This way it’s easy to identify if your variable is an observable or not.
`public users$: Observable<IUser[]>`

### Creating observables
Creating observables is easy, just call the new Observable() and pass along one argument which represents the observer. Therefore i usually call it "observer" as well.

```
import { Observable } from "rxjs/Observable"

// create observable
const simpleObservable = new Observable((observer) => {

    // observable execution
    observer.next("bla bla bla")
    observer.complete()
})

// subscribe to the observable
simpleObservable.subscribe()

// dispose the observable
simpleObservable.unsubscribe()
```
### Subscribing to observables
Remember, observables are lazy. If you don’t subscribe nothing is going to happen. It’s good to know that when you subscribe to an observer, each call of subscribe() will trigger it’s own independent execution for that given observer. Subscribe calls are not shared among multiple subscribers to the same observable.

* Observer.next() "next": sends any value such as Numbers, Arrays or objects to it’s subscribers.
* "error": sends a Javascript error or exception
* "complete": does not send any value.

Calls of the next are the most common as they actually deliver the data to it’s subscribers.
> During observable execution there can be an infinite calls to the observer.next(), however when observer.error() or observer.complete() is called, the execution stops and no more data will be delivered to the subscribers.

## Feature Modules ( Ref : <a href="https://medium.com/@michelestieven/organizing-angular-applications-f0510761d65a">Angular: Understanding Modules and Services</a> )
In Angular, every module which is not the AppModule is technically a Feature Module, and it has the following caveats:

* It must declare all the components, directives and pipe it needs
* It must import CommonModule instead of BrowserModule
    - While BrowserModule must be imported in AppModule (it’s required in order to run the app in the browser), this module must not be imported elsewhere: instead, we must import CommonModule, which contains Angular’s common directives, such as ngIf, ngFor, ngClass, etc… BrowserModule also re-exports CommonModule, so that you can use this directives in AppModule too.
* It doesn’t bootstrap anything.
    - The only module responsible for bootstrapping a component is, obviously, AppModule!

## Importing services
So, our services could be provided in 4 different places:
* in the **CoreModule**, which will hold our global and singleton services
* in a **SharedModule**, which will hold the services needed by itself
* in the **"View Module"** itself, if the services are needed only by that module
* in a **component**, if they’re only needed there

###  well-structured application
* Write stateless micro-components instead of bloated stateful ones
* Use ChangeDetection.OnPush on our stateless components to avoid common performance pitfalls (but carefully)
* Use Router Guards to protect our routes
* Use Route Resolvers to remove dependencies from our View Modules
* Use Interceptors to handle authentication logic and other stuff
* Use libraries like Redux or MobX to handle the business logic of the entire application

## What is Reactive Programming?
<a href="https://medium.com/@mohandere/rxjs-5-in-5-minutes-1c3b4ed0d8cc">Rxjs 5: In 5 minutes!</a>

Key concepts —

1. Stream
2. Observable
3. Observer
4. Subscription
5. Operator
6. Subject

## Stream
> A stream is a sequence of data elements made available over time. A stream can be thought of as items on a conveyor belt being processed one at a time rather than in large batches. — Wikipedia

Alternatively, We can say that the stream is a sequence of ongoing events ordered in time. For example number of button click(s) in 1 Second. So all clicks will be grouped as a stream.

## Stream in RxJs

In RxJS, we can create streams using —

* From one or multiple values
* From array of values
* From an event
* From a Promise
* From a callback etc...

```
var myObservable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
myObservable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');
```

1. Observable is a representation of stream to operate on later.
2. We can create custom observable using Rx.Observable.create method, which returns and object having subscribe method on it.
3. subscribe method takes an object as a param which is nothing but observer.
4. Observer: An object with `next`, `error` and `complete` methods on it. Or Just an `next` function. Just like this —

```
/* With an observer */
var observer = Rx.Observer.create(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  }
);
// Or just an next function like then() in promises
var observer = (x) => {
  console.log('Completed');
}
```

> Rx.Observable class has many functions to create observables from different kind of data/streams such as events, event patterns, arrays, promises, single/multiple value, any kind of data structure/primitive data types and so on.

```
// From event
var clicks = Rx.Observable.fromEvent(document, 'click'); clicks.subscribe(x => console.log(x));
// Results in:
// MouseEvent object logged to console every time a click
// occurs on the document.

// Converts an array to an Observable
var array = [10, 20, 30];
var result = Rx.Observable.from(array);
result.subscribe(x => console.log(x));
// Results in the following:
// 10 20 30

// Convert the Promise returned by Fetch to an Observable
var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
result.subscribe(x => console.log(x), e => console.error(e));
----------------------------------------------
result.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
// Or just next fn
result.subscribe((x) => {
  console.log('got value ' + x)
})
```

## Subscription

> The “listening” to the stream is called subscribing.

> Calling subscribe method of Observable we can listen to stream.

> To invoke the Observable, we need to subscribe to it.

> Just creating Observables will not going to listen streams, we must have to invoke the Observable by calling subscribe method.

```
// Example
var clicks = Rx.Observable.fromEvent(document, 'click');
// Subscribe to observable
// so that we can listen stream changes
let clicksSubscription = clicks.subscribe(x => {
	console.log(x)
});
// Later we can stop listening to streams
clicksSubscription.unsubscribe();

```

## Operators
A pure function which takes one Observable as input and generates another Observable as output.

Subscribing to the output Observable will also subscribe to the input Observable.

```
function multiplyByTen(input) {
    var output = Rx.Observable.create(function subscribe(observer) {
      input.subscribe({
        next: (v) => observer.next(10 * v),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    });
    return output;
  }

  var input = Rx.Observable.from([1, 2, 3, 4]);
  var output = multiplyByTen(input);
  output.subscribe(x => console.log(x));
  // Result In:
  // 10
  // 20
  // 30
  // 40
```

```
// 1. Get the maximal value of a series of number

Rx.Observable.of(5, 4, 7, 2, 8)
    .max()
    .subscribe(x => console.log(x));

// Result In: 8

// 2. Map every click to the clientX position of that click

var clicks = Rx.Observable.fromEvent(document, 'click');
var positions = clicks.map(ev => ev.clientX);
positions.subscribe(x => console.log(x));

// 3. Chaining operators

const input = Rx.Observable.fromEvent(node, 'input')
    .map(event => event.target.value)
    .filter(value => value.length >= 2)
    .subscribe(value => {
    // use the `value`
    });

```

## Subject

1. Plain Observables are unicast.
1. Subject is a special type of Observable that allows values to be multicasted to many Observers.
3. Subjects maintain a registry of many listeners/sunscriber.

Lets understand unicasting vs multicasting first!

### Unicast: A transmission/stream sends IP packets to a single recipient on a network.

**Example :- Plain Observable**

Explanation:- you have to do .subscribe(). If you subscribe multiple times against the original observable, you are not sharing the original observable. You are creating a new observable every time you subscribe.

```
var counts = Rx.Observable.from([1,2,3,4]);

counts.subscribe(x => {
    console.log(`Observer A: Value = ${x}`);
})

counts.subscribe(x => {
    console.log(`Observer B: Value = ${x}`);
})

// Output
Observer A: Value = 1
Observer A: Value = 2
Observer A: Value = 3
Observer A: Value = 4

Observer B: Value = 1
Observer B: Value = 2
Observer B: Value = 3
Observer B: Value = 4
```

### Multicast: A transmission sends IP packets to a group of hosts on a network.

**Example :- RxJs Subject, Promises**

Explanation:- You have to do .subscribe() as many times as you want against that original observable.

```
var subject = new Rx.Subject();

subject.subscribe(x => {
    next: (v) => console.log(`Observer A: Value = ${v}`);
})

subject.subscribe(x => {
    next: (v) => console.log(`Observer B: Value = ${v}`);
})

var observable = Rx.Observable.from([1, 2, 3, 4]);

observable.subscribe(subject)

// Output
Observer A: Value = 1
Observer B: Value = 1

Observer A: Value = 2
Observer B: Value = 2

Observer A: Value = 3
Observer B: Value = 3

Observer A: Value = 4
Observer B: Value = 4
```

## Hot vs Cold Observables

> Source : <a href="https://yakovfain.com/2017/08/28/rxjs-essentials-part-1/">RxJS Essentials. Part 1: Basic terms</a>

There are two types of observables: hot and cold. The main difference is that a cold observable creates a data producer for each subscriber, while a hot observable creates a data producer first, and each subscriber gets the data from one producer starting from the moment of subscription.

Let’s compare watching a movie on Netflix vs going into a movie theater. Think of yourself as an observer. Anyone who decided to watch “Mission Impossible” on Netflix will get the entire movie regardless of when he or she hit the button play. Netflix creates a new producer to stream a movie just for you. This is a cold observable.

If you go to a movie theater and the showtime is 4PM, “the producer is created” at 4PM and the streaming begins. If some people (subscribers) were late to the show, they missed the beginning of the movie and will watch it starting from the moment of arrival. This is hot observable.

> A cold observable starts producing data when some code invokes a subscribe() function on it. For example, your app may declare an observable providing a URL on the server to get certain products. The actual request will be made only when you subscribe to it. If another script will make the same request to the server, it’ll get the same set of data.

> A hot observable produces data even if there are no subscribers interested in the data. For example, an accelerometer of your smartphone produces multiple data about the position of your device even if there no app that subscribes to this data. Or a server can produce the latest stock prices even if no user is interested in this stock.

## The main players of RxJS

The main players of RxJS are:

* Observable – data stream that pushes data over time
* Observer – consumer of an observable stream
* Subscriber – connects observer with observable
* Operator – a function for the en-route data transformation

## <a href="https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42">Angular: writing configurable modules</a>

## 1) useClass
Remember that when you use the class name to specify a provider, Angular takes it and interprets it this way:

```
// This
providers : [ MyService ]

// ...Becomes this
providers : [
    provide: MyService,
    useClass: MyService
]
```

This is pretty useful for mocking services during development, and it can be used to introduce a new service keeping the old class-name as well for compatibility reasons.

<img src="https://cdn-images-1.medium.com/max/1000/1*QRzd6vxEMgMPfpQFZiwnzQ.png" />

```
class MyService {}
class MyOtherService {}

providers : [
    provide: MyService,
    useClass: MyOtherService
]
```

## 2) useValue

useValue is useful when you don’t want to provide a class, but a value (or an object!). Remember that a dependency is something that’s needed by something else, and a component could require an object! This is an awesome feature and we’ll discuss this later, for now just notice this: the base class we provide is overwritten by the object, therefore it’s useless.

It would be better to provide a string name, instead of an useless class, this way:

<img src="https://cdn-images-1.medium.com/max/800/1*w_A9J2J1urgxdUC5QBgvTA.png" />

## 3) useFactory
useFactory does what it says: it uses a factory (a simple function) and Angular provides the returned value of that function. This is useful when you have to do some checks or some operations before knowing what to provide.

<img src="https://cdn-images-1.medium.com/max/1200/1*XiasJqTfoLabpPqo9hQV1Q.png" />

## 4) InjectionToken
Now we’re facing the issue of providing string names AND providing classes that will be overwritten (and are, therefore, useless). What can we do?

Angular gives us InjectionToken (previously OpaqueToken, with some differences) which does exactly what it says: it creates a token (a name) to use in our provide field, instead of using strings or classes. Since every instance of InjectionToken is different, we don’t have to worry about naming collisions, even if we specify the same value at initialization phase.

>Remember that those values are simple descriptions, they do nothing to our logic. So now we can use that token both in the module and the component, awesome!

<img src="https://cdn-images-1.medium.com/max/800/1*1xZLfdIDa_Q1d9R-3hN5HQ.png" />

## 5) Configuring a module from outside

This is where I wanted to end. You can use Dependency Injection to inject a configuration object into your modules, which you can use to configure your services! Sounds confusing? Let’s make an example.

Imagine we have a service which talks to an API, let’s say… Contentful, for example! It’s the most famous Headless CMS which lets you build your own custom models (city, person, employee, etc…), a sort of WordPress without templates. Since your data will only be accessible through the API, the team released some SDKs to facilitate the process of making the calls. Let’s make a service which uses this SDK (a really simple library) and let’s put this service into its own module, ContentfulModule.

<img src="https://cdn-images-1.medium.com/max/1000/1*2xr-9vJ_PIyZEjs3q_w_cg.png" />

## forRoot
Yes! You probably already know that RouterModule uses a forRoot() custom method in order to provide our configuration to the router: our Routes! They are in fact configuration objects! :) Let’s copy the approach.

So, here’s what to do:

Let’s write a forRoot() static method in our module which takes the object and provides it.
Let’s also create an interface for our configuration object, so that out module’s users know how to create that object.
Let’s provide that object with an InjectionToken (which prevents collisions) and useValue.

<img src="https://cdn-images-1.medium.com/max/1000/1*Br2KEcRr7xNBWrdH3CWY0g.png" />

That’s awesome! Now let’s dig into our ContentfulService and ask for that object into the constructor, as we always do with services, but with a different syntax:

<img src="https://cdn-images-1.medium.com/max/1400/1*mi-97QG6IIGJJR_zmqoN_g.png" />

Voilà! Now you have a [not really] awesome reusable module which can be configured from the outside!

I made for you a working example, you just need to replace the Space ID and the Access Token with your own (in AppModule) and ask for one of your content types in AppComponent (in my case it was ‘article’):

https://stackblitz.com/edit/angular-contentful-medium

Thanks to Michele Stieven.
