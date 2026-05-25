import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './runner.html',
  styleUrl: './runner.css'
})
export class Runner {
  isRunning = false;
  showPreview = true;

  runReport() {
    this.isRunning = true;
    this.showPreview = false;
    setTimeout(() => {
      this.isRunning = false;
      this.showPreview = true;
    }, 1500);
  }
}
