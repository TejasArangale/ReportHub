import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  role: string;
  location: string;
}

interface Report {
  name: string;
  type: string;
  country: string;
  lastRun: string;
  duration: string;
}

interface NavItem {
  label: string;
  icon: string;
  screen: string;
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
  @Input() reports: Report[] = [];
  @Output() screenChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  showLogout = false;

  // ── Main nav items ──────────────────────────────
  mainNav: NavItem[] = [
    { label: 'Dashboard',  icon: 'ti-layout-dashboard', screen: 'dashboard' },
    { label: 'Run Report', icon: 'ti-player-play',       screen: 'runner'    },
    { label: 'Schedules',  icon: 'ti-clock',             screen: 'schedule'  },
  ];

  // ── Admin nav items ─────────────────────────────
  adminNav: NavItem[] = [
    { label: 'User Management', icon: 'ti-users',    screen: 'user-management' },
    { label: 'Settings',        icon: 'ti-settings', screen: 'settings'        },
  ];

  // ── Countries derived from reports ─────────────
  get countries(): string[] {
    return [...new Set(this.reports.map(r => r.country))].sort();
  }

  // ── Dynamic counts ──────────────────────────────
  get totalCount(): number {
    return this.reports.length;
  }

  countByCountry(country: string): number {
    return this.reports.filter(r => r.country === country).length;
  }

  // ── User ────────────────────────────────────────
  get userInitials(): string {
    if (!this.currentUser?.name) return 'G';
    return this.currentUser.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  setScreen(screen: string) {
    this.screenChange.emit(screen);
    if (screen === 'reports') this.filterChange.emit('All');
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