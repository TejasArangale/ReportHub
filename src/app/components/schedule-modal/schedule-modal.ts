import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-modal.html',
  styleUrl: './schedule-modal.css',
})
export class ScheduleModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() saved  = new EventEmitter<any>();

  currentStep = 1;
  showToast   = false;

  reportsList = [
    { name: 'Daily Transaction Summary',  country: 'Kenya',      type: 'FCC', desc: 'Daily transactions grouped by branch'       },
    { name: 'Watchlist Screening Report', country: 'Kenya',      type: 'FCC', desc: 'Names screened against watchlists'           },
    { name: 'Regulatory Capital Report',  country: 'Kenya',      type: 'FCR', desc: 'Capital adequacy calculations'               },
    { name: 'Credit Exposure Summary',    country: 'Kenya',      type: 'FCR', desc: 'Total credit exposure by segment'            },
    { name: 'Customer Risk Score Report', country: 'Uganda',     type: 'FCR', desc: 'Risk score distribution across customers'    },
    { name: 'Weekly FCR Digest',          country: 'Uganda',     type: 'FCR', desc: 'Aggregated FCR metrics for the week'         },
    { name: 'AML Suspicious Activity',    country: 'NBC',        type: 'FCC', desc: 'Flagged transactions for AML review'         },
    { name: 'KYC Expiry Report',          country: 'NBC',        type: 'FCC', desc: 'Customers with expiring KYC documents'       },
    { name: 'Monthly Compliance Summary', country: 'Mozambique', type: 'FCR', desc: 'Monthly regulatory compliance metrics'       },
    { name: 'Branch Performance Report',  country: 'Mozambique', type: 'FCC', desc: 'Branch-level performance indicators'         },
  ];

  newSched = {
    country: '', type: '', reportName: '',
    freq: 'daily', time: '06:00', days: ['Tue'],
    cron: '', start: new Date().toISOString().split('T')[0], end: '',
    format: 'PDF', delivery: 'email',
    emails: '', path: '', subject: ''
  };

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  get filteredReportsForDropdown() {
    return this.reportsList.filter(r =>
      (!this.newSched.country || r.country === this.newSched.country) &&
      (!this.newSched.type    || r.type    === this.newSched.type)
    );
  }

  get selectedReportDetails() {
    return this.reportsList.find(r => r.name === this.newSched.reportName);
  }

  get schedulePreviewText() {
    const labels: Record<string, string> = {
      daily: 'every day', weekly: 'every week',
      monthly: 'on the 1st of every month', custom: 'on custom schedule'
    };
    return `Runs ${labels[this.newSched.freq] || 'daily'} at ${this.newSched.time || '06:00'}`;
  }

  close() {
    this.closed.emit();
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.close();
  }

  modalNext() {
    if (this.currentStep === 1 && (!this.newSched.country || !this.newSched.reportName)) return;
    if (this.currentStep < 3) this.currentStep++;
  }

  modalBack() {
    if (this.currentStep > 1) this.currentStep--;
  }

  toggleDay(day: string) {
    const idx = this.newSched.days.indexOf(day);
    idx > -1 ? this.newSched.days.splice(idx, 1) : this.newSched.days.push(day);
  }

  getSummaryDelivery() {
    if (this.newSched.delivery === 'email') {
      const count = this.newSched.emails ? this.newSched.emails.split(',').length : 0;
      return `Email${count ? ` → ${count} recipient(s)` : ''}`;
    }
    return `Network path${this.newSched.path ? `: ${this.newSched.path}` : ''}`;
  }

  saveSchedule() {
    const freqMap: Record<string, string> = {
      daily: 'Every day', weekly: 'Every week',
      monthly: '1st of month', custom: 'Custom'
    };
    const icons: Record<string, string> = {
      daily: 'ti-refresh', weekly: 'ti-calendar',
      monthly: 'ti-calendar-month', custom: 'ti-clock'
    };

    this.saved.emit({
      icon:   icons[this.newSched.freq]  || 'ti-clock',
      name:   `${this.newSched.reportName} — ${this.newSched.country}`,
      meta:   `${freqMap[this.newSched.freq] || 'Daily'} at ${this.newSched.time} · ${this.newSched.format}`,
      active: true
    });
  }
}