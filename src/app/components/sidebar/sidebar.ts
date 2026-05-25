import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() activeScreen: string = 'dashboard';
  @Input() activeFilter: string = 'All';
  @Output() screenChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  setScreen(screen: string) {
    this.screenChange.emit(screen);
    if (screen === 'reports') {
      this.filterChange.emit('All');
    }
  }

  setScreenWithFilter(screen: string, filter: string) {
    this.screenChange.emit(screen);
    this.filterChange.emit(filter);
  }
}
