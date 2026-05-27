import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { Dashboard } from './components/dashboard/dashboard';
import { Reports } from './components/reports/reports';
import { Runner } from './components/runner/runner';
import { Schedule } from './components/schedule/schedule';
import { Login } from './components/login/login';

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
}
