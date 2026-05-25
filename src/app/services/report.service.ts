import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // Uncomment and use this when you connect your real backend URL
  // private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // ─── DASHBOARD METHODS ───

  getDashboardStats(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/stats`);
    return of({
      totalReports: 303,
      ranToday: 47,
      scheduledJobs: 12,
      migratedPercentage: 100
    });
  }

  getRecentActivity(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.apiUrl}/activity`);
    return of([
      { title: 'Daily Transaction Summary', action: 'exported as PDF by J. Mwangi', time: '2m ago', color: 'green' },
      { title: 'Schedule: Weekly FCR Digest', action: 'ran successfully — sent to 3 recipients', time: '18m ago', color: 'blue' },
      { title: 'Customer Risk Score', action: 'ran — 4,821 rows returned in 1.4s', time: '1h ago', color: 'amber' },
      { title: 'AML Suspicious Activity', action: 'exported as Excel by T. Banda', time: '2h ago', color: 'green' }
    ]);
  }

  // ─── REPORT METHODS ───

  getReports(country?: string): Observable<any[]> {
    // let url = `${this.apiUrl}/reports`;
    // if (country && country !== 'All') url += `?country=${country}`;
    // return this.http.get<any[]>(url);
    
    return of([
      { name: 'Daily Transaction Summary', type: 'FCC', country: 'Kenya', lastRun: '2 min ago', duration: '0.8s' },
      { name: 'Customer Risk Score Report', type: 'FCR', country: 'Uganda', lastRun: '15 min ago', duration: '1.4s' },
      { name: 'AML Suspicious Activity', type: 'FCC', country: 'NBC', lastRun: '1 hr ago', duration: '2.1s' },
      { name: 'Monthly Compliance Summary', type: 'FCR', country: 'Mozambique', lastRun: '2 hrs ago', duration: '0.6s' }
    ]);
  }

  runReport(reportParams: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/reports/run`, reportParams);
    return of({ success: true, message: 'Report started successfully' });
  }

  // ─── SCHEDULE METHODS ───

  getSchedules(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.apiUrl}/schedules`);
    return of([
      { name: 'Daily Transaction Summary — Kenya', schedule: 'Every day at 06:00', type: 'Email to 4 recipients · PDF', status: 'Active', icon: 'ti-refresh' },
      { name: 'Weekly FCR Digest — Uganda', schedule: 'Every Monday at 07:30', type: 'Email to 2 recipients · Excel', status: 'Active', icon: 'ti-calendar' },
      { name: 'Monthly Compliance Summary — Mozambique', schedule: '1st of month at 08:00', type: 'Network path · PDF', status: 'Active', icon: 'ti-calendar-month' }
    ]);
  }
}
