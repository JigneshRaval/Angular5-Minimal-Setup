// dash.component.spec.ts

// Ref: https://alligator.io/angular/introduction-unit-testing/
// Ref: https://codecraft.tv/courses/angular/unit-testing/jasmine-and-karma/

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DashComponent } from './dash.component';

// describe blocks define a test suite and each it block is for an individual test.
describe('DashComponent', () => {
    let component: DashComponent;
    let fixture: ComponentFixture<DashComponent>;
    let elem: DebugElement;

    // beforeEach runs before each test and is used for the setup part of a test.
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashComponent);
        component = fixture.debugElement.componentInstance;
        elem = fixture.debugElement;
        console.log('Executing beforeEach...');
    }));

    // afterEach runs after each test and is used for the teardown part of a test.
    afterEach(async(() => {
        console.log('Executing afterEach...');
    }));

    // You can also use beforeAll and afterAll, and these run once before or after all tests.
    beforeAll(() => {
        console.log('***** Executing beforeAll...');
    });

    afterAll(() => {
        console.log('**** Executing afterAll...');
    });

    /**
     * You test an assertion in Jasmine with expect and using a matcher like toBeDefined, toBeTruthy, toContain, toEqual, toThrow, toBeNull...
     * For example: expect(myValue).toBeGreaterThan(3);
     */
    it('should create the app', async(() => {
        console.log('Executing it block 1...');
        expect(component).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        console.log('Executing it block 2...');
        // const fixture = TestBed.createComponent(DashComponent);
        // const app = fixture.debugElement.componentInstance;
        expect(component.title).toEqual('dash');
    }));

    it('should have a h1 tag of `dash works!`', () => {
        expect(elem.query(By.css('p')).nativeElement.innerText).toBe('dash works!');
    });

    it('should have percentage to be 80`', () => {
        component.ngOnInit();
    });

    it('says hello', () => {
        component.helloWorld();
        expect(component.helloWorld()).toEqual('Hello world!');
    });


    // Cover "calcPercentage()" function
    it('calculate percentage for first class', () => {
        component.calcPercentage(92);
        expect(component.calcPercentage(92)).toEqual('A');
    });

    it('calculate percentage for distinction', () => {
        component.calcPercentage(75);
        expect(component.calcPercentage(75)).toEqual('B');
    });

    it('calculate percentage for second class', () => {
        component.calcPercentage(51);
        expect(component.calcPercentage(51)).toEqual('C');
    });

    it('calculate percentage for Pass class', () => {
        component.calcPercentage(50);
        expect(component.calcPercentage(50)).toEqual('D');
    });

    it('calculate percentage for Pass class', () => {
        component.calcPercentage('A');
        expect(component.calcPercentage('A')).toEqual('D');
    });

    // click event coverage
    it('calculate percentage for Pass class', () => {
        const btnElem = fixture.debugElement.query(By.css('#btnClickMe')).nativeElement;
        let event = {
            target: btnElem
        };
        component.clickMe(event);
    });

    it('if element is not available', () => {
        component.clickMe('test');
    });

});
