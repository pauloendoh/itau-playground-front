import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { urls } from '../../utils/constants/urls';
import { CreateFormularioDto } from './types/create-formulario.dto';
import { FormularioResponseDto } from './types/formulario-response.dto';

@Injectable({
  providedIn: 'root',
})
export class FormularioHttpClient {
  constructor(private http: HttpClient) {}

  getFormularios(): Observable<FormularioResponseDto[]> {
    return this.http.get<FormularioResponseDto[]>(urls.api.formularios);
  }

  createFormulario(body: CreateFormularioDto): Promise<FormularioResponseDto> {
    return firstValueFrom(
      this.http.post<FormularioResponseDto>(urls.api.formularios, body),
    );
  }
}
