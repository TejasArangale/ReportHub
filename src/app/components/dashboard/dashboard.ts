import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  @Output() screenChange = new EventEmitter<string>();

  setScreen(screen: string) {
    this.screenChange.emit(screen);
  }
}
