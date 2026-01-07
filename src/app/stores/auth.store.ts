import { Injectable, signal } from '@angular/core';
import { UserResponseDto } from '../http-clients/auth/types/user-response.dto';
import { localStorageKeys } from '../utils/constants/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private userSignal = signal<UserResponseDto | null>(null);
  readonly user = this.userSignal.asReadonly();

  constructor() {
    // get from local storage
    const storedUser = localStorage.getItem(localStorageKeys.user);
    if (storedUser) {
      this.userSignal.set(JSON.parse(storedUser));
    }
  }

  setUser(user: UserResponseDto | null) {
    this.userSignal.set(user);
    if (user) {
      localStorage.setItem(localStorageKeys.user, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(localStorageKeys.user);
  }

  isLoggedIn(): boolean {
    return this.userSignal() !== null;
  }
}
