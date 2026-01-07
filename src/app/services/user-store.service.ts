import { Injectable, signal } from '@angular/core';
import { UserResponseDto } from '../http-clients/auth/types/user-response.dto';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userSignal = signal<UserResponseDto | null>(null);

  // Read-only access to the user
  readonly user = this.userSignal.asReadonly();

  setUser(user: UserResponseDto | null) {
    this.userSignal.set(user);
  }

  clearUser() {
    this.userSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.userSignal() !== null;
  }
}
