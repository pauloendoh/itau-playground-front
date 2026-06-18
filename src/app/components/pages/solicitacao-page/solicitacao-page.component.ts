import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteHttpClient } from '../../../http-clients/cliente/cliente.http-client';
import { FormularioHttpClient } from '../../../http-clients/formulario/formulario.http-client';
import { urls } from '../../../utils/constants/urls';

@Component({
  selector: 'app-solicitacao-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>CPF/CNPJ do cliente</mat-label>
        <input
          matInput
          [formControl]="form.controls.documento"
          placeholder="000.000.000-00"
          (input)="onDocumentoChange()"
        />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Nome do cliente</mat-label>
        <input matInput [formControl]="form.controls.nomeCliente" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>CAR</mat-label>
        <input matInput [formControl]="form.controls.codigoCar" />
      </mat-form-field>

      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="!codCliente() || form.invalid || isSubmitting()"
      >
        Enviar
      </button>
    </form>
  `,
})
export class SolicitacaoPageComponent {
  private fb = inject(NonNullableFormBuilder);
  private clienteHttpClient = inject(ClienteHttpClient);
  private formularioHttpClient = inject(FormularioHttpClient);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  codCliente = signal<string | null>(null);
  isSubmitting = signal(false);

  form = this.fb.group({
    documento: [''],
    nomeCliente: [{ value: '', disabled: true }],
    codigoCar: ['', Validators.required],
  });

  async onDocumentoChange() {
    const digits = this.form.getRawValue().documento.replace(/\D/g, '');
    if (digits.length !== 11 && digits.length !== 14) return;

    try {
      const cliente =
        await this.clienteHttpClient.getClienteByDocumento(digits);
      this.form.controls.nomeCliente.setValue(cliente.nomeCliente);
      this.codCliente.set(cliente.codCliente);
    } catch {
      this.form.controls.nomeCliente.setValue('');
      this.codCliente.set(null);
      this.snackBar.open('Cliente não encontrado', 'Fechar', {
        duration: 4000,
      });
    }
  }

  async onSubmit() {
    const codCliente = this.codCliente();
    if (!codCliente) return;

    this.isSubmitting.set(true);
    try {
      await this.formularioHttpClient.createFormulario({
        codFormulario: this.generateCodFormulario(),
        tipoFormulario: 'Bndes',
        situacaoFormulario: 'Rascunho',
        codCliente,
        codigoCar: this.form.getRawValue().codigoCar,
        detalhesSolicitacao: '',
        detalhesAnalise: '',
      });

      this.snackBar.open('Formulário criado com sucesso!', 'Fechar', {
        duration: 4000,
      });
      this.router.navigate([urls.pages.index]);
    } catch {
      this.snackBar.open('Erro ao criar formulário', 'Fechar', {
        duration: 4000,
      });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private generateCodFormulario(): string {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join('');
  }
}
