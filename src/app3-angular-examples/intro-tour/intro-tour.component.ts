// intro-overlay.component.ts ( Take a Tour - overlay )

import {
    Component,
    Input, OnInit,
    AfterViewInit,
    ElementRef,
    Renderer2,
    HostListener,
    ChangeDetectorRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'intro-overlay',
    templateUrl: './intro-tour.component.html',
    styleUrls: ['./intro-tour.component.scss']
})
export class AlIntroOverlayComponent implements OnInit, AfterViewInit {
    @ViewChild('btnStartIntroTour') btnStartIntroTour: ElementRef;
    @ViewChild('btnIntroTourNextStep') btnIntroTourNextStep: ElementRef;
    @ViewChild('btnIntroTourDoneStep') btnIntroTourDoneStep: ElementRef;

    public isTourSkipped = false;
    public resizeTimeout;
    public FIRE_AFTER = 500;
    public defaultSpacing = 20;

    // Current step data

    public totalSteps = 0;
    public currentStepElement = '';
    public currentStepArrowPosition = '';
    public currentStepHeading = '';
    public currentStepContent = '';
    public hasNextStep = true;
    public tourStep;

    @Input() currentStepIndex: number = 0;
    @Input() isTourCompleted = false;
    @Input() isTourStarted = false;
    @Input() introTourDataObj;

    constructor(
        private elem: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {
        console.log('elem :', this.elem.nativeElement);
    }

    // window.resize event listener
    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        // clear the timeout
        clearTimeout(this.resizeTimeout);

        // Throttle/Debounce resize event to reduce continusly firing resize event
        // start timing for event "completion"
        this.resizeTimeout = setTimeout(() => {
            this.tourStep = document.querySelector('[data-info="' + this.introTourDataObj.steps[this.currentStepIndex].step + '"]');
            console.log('onWindowResize this.tourStep ====', this.tourStep);
            this.renderTourItems(this.tourStep);
        }, this.FIRE_AFTER);

    }

    ngOnInit() {
        console.log('ngOnInit');
    }

    ngAfterViewInit() {
        if (this.introTourDataObj) {
            this.initTour();
        }
        console.log('ngAfterViewInit');
        this.cdr.detectChanges();
    }

    // Initialize "Intro Tour" component to Show welcome screen
    public initTour() {
        this.totalSteps = this.introTourDataObj.steps.length;
        this.updateStepContent();
        this.tourStep = document.querySelector('[data-info="' + this.currentStepElement + '"]');
        // Set focus on "Take a tour" button
        this.btnStartIntroTour.nativeElement.focus();
    }

    // Start Tour: Binding Click event for Start tour on '.ah-intro-tour-start button' Button
    public startIntroTour(event) {
        this.resetIntoTour();
        this.updateStepContent();
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        setTimeout(() => {
            this.renderTourItems(this.tourStep);
            // Set focus on "next" button
            this.btnIntroTourNextStep.nativeElement.focus();
        }, 10);
    }

    // Skip Tour: Binding Click event for Skip tour on '.ah-intro-tour-skip button' Button
    public skipIntroTour() {
        this.isTourCompleted = true;
        this.isTourSkipped = true;
        this.renderer.setStyle(document.body, 'overflow', '');

        // Service call to update User Preferences
        // addButtonStateInPrefs(managePrefURL,"skip");
    }

    public resetIntoTour() {
        this.currentStepIndex = 0;
        this.isTourStarted = true;
        this.hasNextStep = true;
    }

    public updateStepContent() {
        const { steps } = this.introTourDataObj;
        this.currentStepElement = steps[this.currentStepIndex].step;
        this.currentStepArrowPosition = steps[this.currentStepIndex].position;
        this.currentStepHeading = steps[this.currentStepIndex].heading;
        this.currentStepContent = steps[this.currentStepIndex].content;
    }

    public nextStep() {
        this.currentStepIndex += 1;
        this.tourStep = document.querySelector('[data-info="' + this.introTourDataObj.steps[this.currentStepIndex].step + '"]');
        // If it is : Last step
        if (this.currentStepIndex === (this.totalSteps - 1)) {
            this.hasNextStep = false;
            // Set focus on "Done" button
            this.btnIntroTourDoneStep.nativeElement.focus();
        } else if (this.currentStepIndex === 0) {
            // If it is : First step
            this.hasNextStep = true;
            this.updateStepContent();
        } else {
            // except last and first step
            this.hasNextStep = true;
            this.updateStepContent();
        }
        this.renderTourItems(this.tourStep);
    }

    public skipStep() {
        this.isTourSkipped = true;
    }

    public doneStep() {
        this.isTourStarted = false;
        this.isTourCompleted = true;
        this.renderer.setStyle(document.body, 'overflow', '');
    }

    renderTourItems(tourStep) {
        let introBoxWrapper = this.elem.nativeElement.children[0].children[1];
        if (introBoxWrapper) {
            let elemHighlightOverlay = introBoxWrapper.querySelector('.intro-highlightOverlay');
            let elemIntroBox = introBoxWrapper.querySelector('.intro-box');
            let elemTopOverlay = introBoxWrapper.querySelector('.intro-topOverlay');
            let elemLeftOverlay = introBoxWrapper.querySelector('.intro-leftOverlay');
            let elemRightOverly = introBoxWrapper.querySelector('.intro-rightOverly');
            let elemBottomOverlay = introBoxWrapper.querySelector('.intro-bottomOverlay');

            this.scroll();

            /* let scrollTo = this.scroll();

            if (!(window.innerHeight > (this.tourStep.getBoundingClientRect().y + this.tourStep.getBoundingClientRect().height))) {
                window.scrollBy(0, scrollTo);
                introBoxWrapper.scrollBy(0, scrollTo);
            } */

            // let position = this.getPosition(tourStep);
            let position = tourStep.getBoundingClientRect();

            let size = {
                width: tourStep.offsetWidth,
                height: tourStep.offsetHeight
            };

            // Set position and style for Highlighted section
            this.renderer.setStyle(elemHighlightOverlay, 'width', size.width + 'px');
            this.renderer.setStyle(elemHighlightOverlay, 'height', size.height + 'px');
            this.renderer.setStyle(elemHighlightOverlay, 'top', position.top + 'px');
            this.renderer.setStyle(elemHighlightOverlay, 'left', position.left + 'px');

            // Set position and style for Top Overlay
            this.renderer.setStyle(elemTopOverlay, 'height', position.top + 'px');

            // Set position and style for Left Overlay
            this.renderer.setStyle(elemLeftOverlay, 'height', size.height + 'px');
            this.renderer.setStyle(elemLeftOverlay, 'width', position.left + 'px');
            this.renderer.setStyle(elemLeftOverlay, 'top', position.top + 'px');

            // Set position and style for Right Overlay
            this.renderer.setStyle(elemRightOverly, 'height', size.height + 'px');
            this.renderer.setStyle(elemRightOverly, 'left', position.right + 'px');
            this.renderer.setStyle(elemRightOverly, 'top', position.top + 'px');

            // Set position and style for bottom Overlay
            this.renderer.setStyle(elemBottomOverlay, 'top', (position.top + size.height) + 'px');

            this.setTooltipPosition(elemIntroBox, position, size);
        }
    }

    getPosition(targetElem) {
        return targetElem.getBoundingClientRect();
    }

    // Set IntoBox position
    setTooltipPosition(elemIntroBox, position, size) {
        let direction, methods, selfHeight, selfWidth;
        let elemIntroBoxDimentions = elemIntroBox.getBoundingClientRect();
        selfWidth = elemIntroBoxDimentions.width;
        selfHeight = elemIntroBoxDimentions.height;
        methods = {
            left: (force) => {
                console.log('setTooltipPosition = LEFT ==', force);
                let height, result;
                height = Math.min(window.innerHeight, size.height);
                result = {
                    left: position.left - selfWidth - this.defaultSpacing,
                    top: position.top + (height - selfHeight) / 2
                };
                if (!force) {
                    if (result.left < 0) {
                        return false;
                    }
                    if (result.top + selfHeight > window.innerHeight) {
                        return false;
                    }
                }
                if (result.top < 0) {
                    result.top = this.defaultSpacing;
                }

                this.updateIntoBoxPosition(elemIntroBox, 'left', 'r', result);
                return true;
            },
            right: (force) => {
                console.log('setTooltipPosition = RIGHT ==', force);
                let height, result;
                height = Math.min(window.innerHeight, size.height);
                result = {
                    left: position.left + size.width + this.defaultSpacing,
                    top: position.top + (height - selfHeight) / 2
                };
                if (!force) {
                    if (result.left + selfWidth > window.innerWidth) {
                        return false;
                    }
                    if (result.top + selfHeight > window.innerHeight) {
                        return false;
                    }
                }
                if (result.top < 0) {
                    result.top = this.defaultSpacing;
                }

                this.updateIntoBoxPosition(elemIntroBox, 'right', 'l', result);
                return true;
            },
            top: (force) => {
                console.log('setTooltipPosition = TOP ==', force);
                let result;
                result = {
                    left: position.left + (size.width - selfWidth) / 2,
                    top: position.top - selfHeight - this.defaultSpacing
                };
                if (!force) {
                    if (result.top < 0) {
                        return false;
                    }
                }

                this.updateIntoBoxPosition(elemIntroBox, 'top', 'b', result);
                return true;
            },
            bottom: (force) => {
                console.log('setTooltipPosition = BOTTOM ==', force);
                let result;
                result = {
                    left: position.left + (size.width - selfWidth) / 2,
                    top: position.top + size.height + this.defaultSpacing
                };
                if (!force) {
                    if (result.top + selfHeight > window.innerHeight) {
                        return false;
                    }
                }

                this.updateIntoBoxPosition(elemIntroBox, 'bottom', 't', result);
                return true;
            }
        };
        for (direction in methods) {
            if (methods[direction]()) {
                return;
            }
        }
        return methods['bottom'](true);
    }

    public updateIntoBoxPosition(elemIntroBox, introBoxDirection, arrowDirection, position) {
        let intoBoxClasses = ['into-box-direction-top', 'into-box-direction-right', 'into-box-direction-bottom', 'into-box-direction-left'];
        let arrowClasses = ['intro-arrow-t', 'intro-arrow-r', 'intro-arrow-b', 'intro-arrow-l'];

        intoBoxClasses.forEach((className) => {
            this.renderer.removeClass(elemIntroBox, className);
        });

        arrowClasses.forEach((className) => {
            this.renderer.removeClass(elemIntroBox.firstElementChild, className);
        });

        this.renderer.setStyle(elemIntroBox, 'left', position.left + 'px');
        this.renderer.setStyle(elemIntroBox, 'top', position.top + 'px');

        this.renderer.addClass(elemIntroBox, 'into-box-direction-' + introBoxDirection);
        this.renderer.addClass(elemIntroBox.firstElementChild, 'intro-arrow-' + arrowDirection);
    }

    // Trap focus in Tour section
    public setTabIndex(event) {
        if (this.btnIntroTourNextStep) {
            this.btnIntroTourNextStep.nativeElement.focus();
        }
        if (this.btnIntroTourDoneStep) {
            this.btnIntroTourDoneStep.nativeElement.focus();
        }
        if (this.btnStartIntroTour) {
            this.btnStartIntroTour.nativeElement.focus();
        }
    }

    public scroll() {
        let introBoxWrapper = this.elem.nativeElement.children[0].children[1];
        if (introBoxWrapper) {
            let elemHighlightOverlay = introBoxWrapper.querySelector('.intro-highlightOverlay');
            let elemIntroBox = introBoxWrapper.querySelector('.intro-box');

            let highlightOverlayY = elemHighlightOverlay.getBoundingClientRect().y,
                introTooltipY = elemIntroBox.getBoundingClientRect().y,
                scrollTo = highlightOverlayY < introTooltipY ? highlightOverlayY : introTooltipY;

            if (!(window.innerHeight > (this.tourStep.getBoundingClientRect().y + this.tourStep.getBoundingClientRect().height))) {
                window.scrollBy(0, scrollTo);
                introBoxWrapper.scrollBy(0, scrollTo);
            }

            console.log('highlightOverlayY ==', highlightOverlayY, scrollTo, this.tourStep);
            /*  if (scrollTo) {
                 return scrollTo;
             } else {
                 return 0;
             } */

        }
    }

}
