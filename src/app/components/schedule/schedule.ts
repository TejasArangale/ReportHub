import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {
  @Input() searchTerm: string = '';

  schedules = [
    { icon: 'ti-refresh', name: 'Daily Transaction Summary — Kenya', meta: 'Every day at 06:00 · Email to 4 recipients · PDF', active: true },
    { icon: 'ti-calendar', name: 'Weekly FCR Digest — Uganda', meta: 'Every Monday at 07:30 · Email to 2 recipients · Excel', active: true },
    { icon: 'ti-calendar-month', name: 'Monthly Compliance Summary — Mozambique', meta: '1st of month at 08:00 · Network path · PDF', active: true },
    { icon: 'ti-refresh', name: 'AML Screening Report — NBC', meta: 'Every day at 05:00 · Email to 6 recipients · Excel', active: false }
  ];

  get filteredSchedules() {
    if (!this.searchTerm) return this.schedules;
    const term = this.searchTerm.toLowerCase();
    return this.schedules.filter(s => s.name.toLowerCase().includes(term));
  }

  toggleSchedule(schedule: any) {
    schedule.active = !schedule.active;
  }

  isModalOpen = false;
  currentStep = 1;
  showToast = false;
  
  reportsList = [
    { name:'Daily Transaction Summary',    country:'Kenya',       type:'FCC', desc:'Daily transactions grouped by branch' },
    { name:'Watchlist Screening Report',   country:'Kenya',       type:'FCC', desc:'Names screened against watchlists' },
    { name:'Regulatory Capital Report',    country:'Kenya',       type:'FCR', desc:'Capital adequacy calculations' },
    { name:'Credit Exposure Summary',      country:'Kenya',       type:'FCR', desc:'Total credit exposure by segment' },
    { name:'Customer Risk Score Report',   country:'Uganda',      type:'FCR', desc:'Risk score distribution across customers' },
    { name:'Weekly FCR Digest',            country:'Uganda',      type:'FCR', desc:'Aggregated FCR metrics for the week' },
    { name:'AML Suspicious Activity',      country:'NBC',         type:'FCC', desc:'Flagged transactions for AML review' },
    { name:'KYC Expiry Report',            country:'NBC',         type:'FCC', desc:'Customers with expiring KYC documents' },
    { name:'Monthly Compliance Summary',   country:'Mozambique',  type:'FCR', desc:'Monthly regulatory compliance metrics' },
    { name:'Branch Performance Report',    country:'Mozambique',  type:'FCC', desc:'Branch-level performance indicators' }
  ];

  newSched = {
    country: '',
    type: '',
    reportName: '',
    freq: 'daily',
    time: '06:00',
    days: ['Tue'],
    cron: '',
    start: '',
    end: '',
    format: 'PDF',
    delivery: 'email',
    emails: '',
    path: '',
    subject: ''
  };

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  get filteredReportsForDropdown() {
    return this.reportsList.filter(r => 
      (!this.newSched.country || r.country === this.newSched.country) &&
      (!this.newSched.type || r.type === this.newSched.type)
    );
  }

  get selectedReportDetails() {
    return this.reportsList.find(r => r.name === this.newSched.reportName);
  }

  get schedulePreviewText() {
    const labels: Record<string, string> = { daily:'every day', weekly:'every week', monthly:'on the 1st of every month', custom:'on custom schedule' };
    return `Runs ${labels[this.newSched.freq] || 'daily'} at ${this.newSched.time || '06:00'}`;
  }

  openModal() {
    this.isModalOpen = true;
    this.currentStep = 1;
    this.newSched.start = new Date().toISOString().split('T')[0];
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    this.resetModal();
  }

  resetModal() {
    this.newSched = {
      country: '',
      type: '',
      reportName: '',
      freq: 'daily',
      time: '06:00',
      days: ['Tue'],
      cron: '',
      start: '',
      end: '',
      format: 'PDF',
      delivery: 'email',
      emails: '',
      path: '',
      subject: ''
    };
  }

  modalNext() {
    if (this.currentStep === 1) {
      if (!this.newSched.country || !this.newSched.reportName) {
        return;
      }
    }
    if (this.currentStep < 3) this.currentStep++;
  }

  modalBack() {
    if (this.currentStep > 1) this.currentStep--;
  }

  toggleDay(day: string) {
    const idx = this.newSched.days.indexOf(day);
    if (idx > -1) {
      this.newSched.days.splice(idx, 1);
    } else {
      this.newSched.days.push(day);
    }
  }

  getSummaryDelivery() {
    if (this.newSched.delivery === 'email') {
      const count = this.newSched.emails ? this.newSched.emails.split(',').length : 0;
      return `Email${count ? ` → ${count} recipient(s)` : ''}`;
    }
    return `Network path${this.newSched.path ? `: ${this.newSched.path}` : ''}`;
  }

  saveSchedule() {
    const freqMap: Record<string, string> = { daily:'Every day', weekly:'Every week', monthly:'1st of month', custom:'Custom' };
    const icons: Record<string, string> = { daily:'ti-refresh', weekly:'ti-calendar', monthly:'ti-calendar-month', custom:'ti-clock' };
    
    this.schedules.push({
      icon: icons[this.newSched.freq] || 'ti-clock',
      name: `${this.newSched.reportName} — ${this.newSched.country}`,
      meta: `${freqMap[this.newSched.freq] || 'Daily'} at ${this.newSched.time || '06:00'} · ${this.newSched.format}`,
      active: true
    });
    
    this.closeModal();
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
