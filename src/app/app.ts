import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { Dashboard } from './components/dashboard/dashboard';
import { Reports } from './components/reports/reports';
import { Runner } from './components/runner/runner';
import { Schedule } from './components/schedule/schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    Topbar,
    Dashboard,
    Reports,
    Runner,
    Schedule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeScreen = 'dashboard';
  activeFilter = 'All';
  searchTerm = '';

  onScreenChange(screen: string) {
    this.activeScreen = screen;
  }

  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.activeScreen = 'reports';
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
  }
}
