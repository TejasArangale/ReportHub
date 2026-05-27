import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  @Output() screenChange = new EventEmitter<string>();
 
  @Input() set externalFilter(val: string) {
    if (val) {
      this.activeFilter = val;
    }
  }
  @Input() searchTerm: string = '';
 
  filters = ['All', 'FCC', 'FCR', 'Kenya', 'Uganda', 'Mozambique', 'NBC'];
  activeFilter = 'All';
 
  reports = [
    { name: 'Daily Transaction Summary', type: 'FCC', country: 'Kenya', lastRun: '2 min ago', duration: '0.8s' },
    { name: 'Customer Risk Score Report', type: 'FCR', country: 'Uganda', lastRun: '15 min ago', duration: '1.4s' },
    { name: 'AML Suspicious Activity', type: 'FCC', country: 'NBC', lastRun: '1 hr ago', duration: '2.1s' },
    { name: 'Monthly Compliance Summary', type: 'FCR', country: 'Mozambique', lastRun: '2 hrs ago', duration: '0.6s' },
    { name: 'Watchlist Screening Report', type: 'FCC', country: 'Kenya', lastRun: '3 hrs ago', duration: '1.9s' },
    { name: 'Credit Exposure Summary', type: 'FCR', country: 'Uganda', lastRun: 'Yesterday', duration: '1.1s' },
    { name: 'Regulatory Capital Report', type: 'FCR', country: 'Kenya', lastRun: 'Yesterday', duration: '3.2s' }
  ];
 
  get filteredReports() {
    let result = this.reports;
    if (this.activeFilter !== 'All') {
      result = result.filter(r => r.type === this.activeFilter || r.country === this.activeFilter);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(r =>r.name.toLowerCase().includes(term)     ||
        r.type.toLowerCase().includes(term)     ||
        r.country.toLowerCase().includes(term)  ||
        r.lastRun.toLowerCase().includes(term)  ||
        r.duration.toLowerCase().includes(term));
    }
    return result;
  }
 
  @Output() filterChange = new EventEmitter<string>();
 
  setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterChange.emit(filter);
  }
 
  setScreen(screen: string) {
    this.screenChange.emit(screen);
  }
}