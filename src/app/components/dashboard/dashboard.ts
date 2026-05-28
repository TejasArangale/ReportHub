import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatCard {
  value: string;
  label: string;
  subIcon: string;
  subText: string;
  valueClass?: string;
  subClass?: string;
}

export interface RecentReport {
  name: string;
  badge: 'fcc' | 'fcr';
  country: string;
  time: string;
  user: string;
}

export interface ActivityItem {
  dotClass: string;
  text: string;
  boldPart: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  @Input() reports: any[] = [];
  @Output() screenChange = new EventEmitter<string>();

  // ── Stat cards ──────────────────────────────────
  stats: StatCard[] = [
    { value: '303',  label: 'Total reports',   subIcon: 'ti-map-pin',      subText: '4 countries',      valueClass: '',              subClass: ''      },
    { value: '47',   label: 'Ran today',        subIcon: 'ti-trending-up',  subText: '+12 vs yesterday', valueClass: 'stat-num-red',  subClass: 'green' },
    { value: '12',   label: 'Scheduled jobs',   subIcon: 'ti-clock',        subText: 'Next in 18 min',   valueClass: '',              subClass: ''      },
    { value: '100%', label: 'Migrated',         subIcon: 'ti-shield-check', subText: 'All reports live', valueClass: 'stat-num-green',subClass: 'green' },
  ];

  // ── Recent reports ──────────────────────────────
  recentReports: RecentReport[] = [
    { name: 'Daily Transaction Summary',  badge: 'fcc', country: 'Kenya',      time: '2 min ago',  user: 'J. Mwangi' },
    { name: 'Customer Risk Score Report', badge: 'fcr', country: 'Uganda',     time: '15 min ago', user: 'A. Nakato' },
    { name: 'AML Suspicious Activity',    badge: 'fcc', country: 'NBC',        time: '1 hr ago',   user: 'T. Banda'  },
    { name: 'Monthly Compliance Summary', badge: 'fcr', country: 'Mozambique', time: '2 hrs ago',  user: 'M. Sitoe'  },
  ];

  // ── Activity feed ───────────────────────────────
  activities: ActivityItem[] = [
    { dotClass: 'dot-green', boldPart: 'Daily Transaction Summary',   text: 'exported as PDF by J. Mwangi',             time: '2m ago'  },
    { dotClass: 'dot-blue',  boldPart: 'Schedule: Weekly FCR Digest', text: 'ran successfully — sent to 3 recipients',  time: '18m ago' },
    { dotClass: 'dot-amber', boldPart: 'Customer Risk Score',         text: 'ran — 4,821 rows returned in 1.4s',        time: '1h ago'  },
    { dotClass: 'dot-green', boldPart: 'AML Suspicious Activity',     text: 'exported as Excel by T. Banda',            time: '2h ago'  },
  ];

  setScreen(screen: string) {
    this.screenChange.emit(screen);
  }
}