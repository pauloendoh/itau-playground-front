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
import { AuthClient } from '../../../http-clients/auth/auth.client';
import { AuthStore } from '../../../stores/auth.store';
import { ContainerComponent } from '../../_shared/boxes/container/container.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ContainerComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  private _fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthClient);
  private authStore = inject(AuthStore);

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
          this.authStore.setUser(user);
          this.isLoading.set(false);
          this.form.reset();
        })
        .catch((error) => {
          this.errorMessage.set(
            error.error?.message || 'Login failed. Please try again.',
          );
          this.isLoading.set(false);
        });
    }
  }
}
