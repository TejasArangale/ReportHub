import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { Dashboard } from './components/dashboard/dashboard';
import { Reports } from './components/reports/reports';
import { Runner } from './components/runner/runner';
import { Schedule } from './components/schedule/schedule';
import { Login } from './components/login/login';
import { UserManagement } from './components/user-management/user-management';
import { Settings } from './components/settings/settings';

interface User {
  name: string;
  role: string;
  location: string;
}

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
    Schedule,
    UserManagement,
    Settings,
    Login
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeScreen = 'dashboard';
  activeFilter = 'All';
  searchTerm = '';
  isLoggedIn = false;
  currentUser: User = {
    name: '',
    role: '',
    location: ''
  };

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

  onLogin(user: User) {
    this.currentUser = user;
    this.isLoggedIn = true;
    this.activeScreen = 'dashboard';
    this.activeFilter = 'All';
  }

  onLogout() {
    this.isLoggedIn = false;
    this.currentUser = { name: '', role: '', location: '' };
    this.activeScreen = 'dashboard';
    this.activeFilter = 'All';
    this.searchTerm = '';
  }
  reports = [
  { name: 'Daily Transaction Summary',  type: 'FCC', country: 'Kenya',      lastRun: '2 min ago',  duration: '0.8s' },
  { name: 'Customer Risk Score Report', type: 'FCR', country: 'Uganda',     lastRun: '15 min ago', duration: '1.4s' },
  { name: 'AML Suspicious Activity',    type: 'FCC', country: 'NBC',        lastRun: '1 hr ago',   duration: '2.1s' },
  { name: 'Monthly Compliance Summary', type: 'FCR', country: 'Mozambique', lastRun: '2 hrs ago',  duration: '0.6s' },
  { name: 'Watchlist Screening Report', type: 'FCC', country: 'Kenya',      lastRun: '3 hrs ago',  duration: '1.9s' },
  { name: 'Credit Exposure Summary',    type: 'FCR', country: 'Uganda',     lastRun: 'Yesterday',  duration: '1.1s' },
  { name: 'Regulatory Capital Report',  type: 'FCR', country: 'Kenya',      lastRun: 'Yesterday',  duration: '3.2s' },
  
];
}
