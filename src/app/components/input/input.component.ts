import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, map} from "rxjs/operators";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @ViewChild('input')
  input!: ElementRef;

  @Output()
  inputValue: EventEmitter<string> = new EventEmitter<string>();

  getAutoCompleteSubscription = new Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const input: HTMLInputElement = this.input.nativeElement as HTMLInputElement;

    this.getAutoCompleteSubscription = fromEvent(input, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(400))
      .subscribe((value: string) => {
        if (value.trim() != "") {
          this.inputValue.emit(value);
        }
      });
  }

  ngOnDestroy():void {
    this.getAutoCompleteSubscription.unsubscribe();
  }

}
