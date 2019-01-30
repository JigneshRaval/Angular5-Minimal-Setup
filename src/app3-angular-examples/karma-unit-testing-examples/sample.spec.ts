// Angular Imports
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Component, Service, Directives, Pipes
import { SampleComponent } from './sample.component';

/* fdescribe('SampleComponent', () => {
    let appComponent = new SampleComponent();

    it('should create the app', () => {
        const app = appComponent;
        expect(app).toBeTruthy();
    });

    it('should call "ngOnInit()" method', () => {
        const app = appComponent;
        app.ngOnInit();
    });

    it('should have `app works!` title', () => {
        const value = appComponent.value;
        expect(value).toEqual(0);
    });

    it('should increment/decrement value', () => {
        appComponent.increment();
        expect(appComponent.value).toEqual(1);

        appComponent.decrement();
        expect(appComponent.value).toEqual(0);
    });

}); */


fdescribe('SampleComponent', () => {

    let component: SampleComponent;
    let fixture: ComponentFixture<SampleComponent>;
    let debugElement: DebugElement;

    // beforeEach runs before each test and is used for the setup part of a test.
    beforeEach(async(() => {
        // TestBed is the main utility available for Angular-specific testing.
        TestBed.configureTestingModule({
            imports: [

            ],
            declarations: [
                SampleComponent
            ],
            providers: [

            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SampleComponent);
        component = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement;

        console.log('1 Executing beforeEach...');

    }));

    // afterEach runs after each test and is used for the teardown part of a test.
    afterEach(async(() => {
        fixture.destroy();
        component = null;
        console.log('2 Executing afterEach...');
    }));

    // You can also use beforeAll and afterAll, and these run once before or after all tests.
    beforeAll(() => {
        console.log('***** Executing beforeAll...');
    });

    afterAll(() => {
        console.log('**** Executing afterAll...');
    });

    it('should create the app', async(() => {
        // const fixture = TestBed.createComponent(SampleComponent);
        // const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should increment/decrement value', () => {
        fixture.componentInstance.increment();
        expect(fixture.componentInstance.value).toEqual(1);

        fixture.componentInstance.decrement();
        expect(fixture.componentInstance.value).toEqual(0);
    });

    it('should increment in template', () => {
        debugElement
            .query(By.css('button.increment'))
            .triggerEventHandler('click', null);

        fixture.detectChanges();
        const value = debugElement.query(By.css('h1')).nativeElement.innerText;
        expect(value).toEqual('1');
    });

    it('should stop at 0 and show minimum message', () => {
        debugElement
            .query(By.css('button.decrement'))
            .triggerEventHandler('click', null);

        fixture.detectChanges();
        const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

        expect(fixture.componentInstance.value).toEqual(0);
        expect(message).toContain('Minimum');
    });

    it('should stop at 15 and show maximum message', () => {
        fixture.componentInstance.value = 15;
        debugElement
            .query(By.css('button.increment'))
            .triggerEventHandler('click', null);

        fixture.detectChanges();
        const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

        expect(fixture.componentInstance.value).toEqual(15);
        expect(message).toContain('Maximum');
    });

    it('example of using spy', () => {

        component.tryCatch('abc');
        /* spyOn(component, 'tryCatch').and.returnValue(() => new Error('Test'));
        expect(() => { component.tryCatch('abc') }).toThrow(() => new Error('Test')); */
        fixture.detectChanges();
    });

    it('example of using spy', () => {
        // expect(() => { component.tryCatch('abc') }).toThrow();
        component.tryCatch('{ name : "User"}');
        spyOn(component, 'tryCatch').and.returnValue('{ name : "User"}');
        fixture.detectChanges();
    });



});
