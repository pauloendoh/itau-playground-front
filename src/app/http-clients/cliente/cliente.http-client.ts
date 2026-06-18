import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { urls } from '../../utils/constants/urls';
import { ClienteResponseDto } from './types/cliente-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteHttpClient {
  constructor(private http: HttpClient) {}

  getClienteByDocumento(documento: string): Promise<ClienteResponseDto> {
    return firstValueFrom(
      this.http.get<ClienteResponseDto>(urls.api.clienteByDocumento(documento)),
    );
  }
}
