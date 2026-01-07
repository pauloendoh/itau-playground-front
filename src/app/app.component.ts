import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthClient } from './http-clients/auth/auth.client';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthClient,
    public userStore: UserStoreService
  ) {}

  private _fb = inject(NonNullableFormBuilder);
  form = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService
        .login(this.form.getRawValue())
        .then((user) => {
          this.userStore.setUser(user);
          this.isLoading.set(false);
          this.form.reset();
        })
        .catch((error) => {
          this.errorMessage.set(
            error.error?.message || 'Login failed. Please try again.'
          );
          this.isLoading.set(false);
        });
    }
  }

  onLogout() {
    this.userStore.clearUser();
  }
}
