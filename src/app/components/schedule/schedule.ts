import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleModalComponent } from '../schedule-modal/schedule-modal';
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ScheduleModalComponent],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {
  @Input() searchTerm: string = '';
  @Input() currentUserLocation: string = '';

  showModal = false;

  schedules = [
    { icon: 'ti-refresh',        baseName: 'Daily Transaction Summary',       meta: 'Every day at 06:00 · Email to 4 recipients · PDF',     active: true  },
    { icon: 'ti-calendar',       baseName: 'Weekly FCR Digest',              meta: 'Every Monday at 07:30 · Email to 2 recipients · Excel', active: true  },
    { icon: 'ti-calendar-month', baseName: 'Monthly Compliance Summary', meta: '1st of month at 08:00 · Network path · PDF',            active: true  },
    { icon: 'ti-refresh',        baseName: 'AML Screening Report',              meta: 'Every day at 05:00 · Email to 6 recipients · Excel',    active: false },
  ];

  get activeCount(): number {
    return this.schedules.filter(s => s.active).length;
  }

  get filteredSchedules() {
    let result = this.schedules.map(s => ({
      ...s,
      name: this.currentUserLocation ? `${s.baseName} — ${this.currentUserLocation}` : s.baseName
    }));
    
    // Filter by search term
    if (!this.searchTerm) return result;
    const term = this.searchTerm.toLowerCase();
    return result.filter(s => s.name.toLowerCase().includes(term));
  }

  toggleSchedule(schedule: any) {
    // Find the original schedule in this.schedules by baseName
    const original = this.schedules.find(s => s.baseName === schedule.baseName);
    if (original) {
      original.active = !original.active;
    }
  }

  openModal() {
    this.showModal = true;
  }

  onScheduleSaved(newSchedule: any) {
    this.schedules.push(newSchedule);
    this.showModal = false;
  }
}