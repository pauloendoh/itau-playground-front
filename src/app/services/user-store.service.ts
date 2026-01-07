import { Injectable, signal } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userSignal = signal<User | null>(null);

  // Read-only access to the user
  readonly user = this.userSignal.asReadonly();

  setUser(user: User | null) {
    this.userSignal.set(user);
  }

  clearUser() {
    this.userSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.userSignal() !== null;
  }
}
