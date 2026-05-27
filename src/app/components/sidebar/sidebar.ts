import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  role: string;
  location: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() activeScreen: string = 'dashboard';
  @Input() activeFilter: string = 'All';
  @Input() currentUser: User = { name: '', role: '', location: '' };
  @Output() screenChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  showLogout = false;

  get userInitials(): string {
    if (!this.currentUser?.name) {
      return 'G';
    }
    return this.currentUser.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

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

  toggleLogout() {
    this.showLogout = !this.showLogout;
  }

  onLogout() {
    this.showLogout = false;
    this.logout.emit();
  }
}
