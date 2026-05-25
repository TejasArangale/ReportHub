import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
  @Input() activeScreen: string = 'dashboard';
  @Output() screenChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  get title(): string {
    if (this.activeScreen === 'reports') return 'All Reports';
    if (this.activeScreen === 'runner') return 'Run Report';
    if (this.activeScreen === 'schedule') return 'Schedules';
    return 'Dashboard';
  }

  setScreen(screen: string) {
    this.screenChange.emit(screen);
  }

  onSearchInput(event: any) {
    this.searchChange.emit(event.target.value);
  }
}
