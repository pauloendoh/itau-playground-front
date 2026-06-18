import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { urls } from '../../utils/constants/urls';
import { LoginDto } from './types/login.dto';
import { UserResponseDto } from './types/user-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpClient {
  constructor(private http: HttpClient) {}

  login(credentials: LoginDto): Promise<UserResponseDto> {
    return firstValueFrom(
      this.http.post<UserResponseDto>(`${urls.api.authLogin}`, credentials),
    );
  }
}
