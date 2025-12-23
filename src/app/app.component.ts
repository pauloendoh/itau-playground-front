import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `<div>
    <h1>Fetch Data Example</h1>
    <button mat-raised-button color="primary" (click)="fetchData()">
      Get Data
    </button>

    <pre *ngIf="data()">{{ data() | json }}</pre>
  </div>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data = signal<any>(null);

  constructor(private http: HttpClient) {}

  fetchData() {
    this.http
      .get('http://localhost:5079/WeatherForecast')
      .subscribe((data) => this.data.set(data));
  }
}
