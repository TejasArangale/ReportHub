import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
   encapsulation: ViewEncapsulation.None 
})
export class Login {
  @Output() login = new EventEmitter<{ name: string; role: string; location: string }>();

  submitLogin(name: string, password: string, country: string) {
    const trimmedName = name?.trim();
    const trimmedPassword = password?.trim();
    if (!trimmedName || !trimmedPassword) {
      return;
    }

    this.login.emit({
      name: trimmedName,
      role: 'Report Admin',
      location: country?.trim() || 'Kenya'
    });
  }
}
