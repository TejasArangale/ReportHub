import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() login = new EventEmitter<{ name: string; role: string; location: string }>();

  submitLogin(name: string, role: string, location: string) {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      return;
    }

    this.login.emit({
      name: trimmedName,
      role: role?.trim() || 'Report Admin',
      location: location?.trim() || 'Kenya'
    });
  }
}
