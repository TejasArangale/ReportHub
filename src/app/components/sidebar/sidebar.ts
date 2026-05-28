import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  role: string;
  location: string;
}

interface NavItem {
  label: string;
  icon: string;
  screen: string;
}

interface CountryItem {
  name: string;
  count: number;
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

  // ── Hardcoded total ─────────────────────────────
  totalCount = 303;

  // ── Hardcoded countries with counts ────────────
  countries: CountryItem[] = [
    { name: 'Kenya',      count: 179 },
    { name: 'Uganda',     count: 95  },
    { name: 'Mozambique', count: 8   },
    { name: 'NBC',        count: 21  },
  ];

  get visibleCountries(): CountryItem[] {
    if (!this.currentUser?.location) {
      return this.countries;
    }
    return this.countries.filter(country => country.name === this.currentUser.location);
  }

  get filteredTotalCount(): number {
    if (!this.currentUser?.location) {
      return this.totalCount;
    }
    return this.visibleCountries.reduce((sum, country) => sum + country.count, 0);
  }

  // ── Main nav items ──────────────────────────────
  mainNav: NavItem[] = [
    { label: 'Run Report', icon: 'ti-player-play', screen: 'runner'   },
    { label: 'Schedules',  icon: 'ti-clock',       screen: 'schedule' },
  ];

  // ── Admin nav items ─────────────────────────────
  adminNav: NavItem[] = [
    { label: 'User Management', icon: 'ti-users',    screen: 'user-management' },
    { label: 'Settings',        icon: 'ti-settings', screen: 'settings'        },
  ];

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