import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './types/login.dto';
import { UserResponseDto } from './types/user-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  private apiUrl = 'http://localhost:5079/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginDto): Promise<UserResponseDto> {
    return firstValueFrom(
      this.http.post<UserResponseDto>(`${this.apiUrl}/login`, credentials)
    );
  }
}
