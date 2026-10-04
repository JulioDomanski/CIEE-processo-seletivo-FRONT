import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Curriculo } from '../../models/curriculo';
import { CurriculoService } from '../../services/curriculo.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-curriculos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './curriculos.html',
  styleUrl: './curriculos.css'
})

export class Curriculos {

  arquivoPdf: File | null = null;

  curriculo: Curriculo = {
    nomeCompleto: '',
    email: '',
    telefone: '',
    areaInteresse: '',
    resumoProfissional: ''
  };

  constructor(
    private curriculoService: CurriculoService,
    private cdr: ChangeDetectorRef
  ) {}

  selecionarPdf(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.arquivoPdf = input.files[0];

    this.curriculoService.lerPdf(this.arquivoPdf).subscribe({
      next: (resposta) => {

        console.log('Resposta backend:', resposta);

        this.curriculo = {
          ...this.curriculo,
          nomeCompleto: resposta.nomeCompleto ?? '',
          email: resposta.email ?? '',
          telefone: resposta.telefone ?? ''
        };

        console.log('Objeto do formulário:', this.curriculo);

        this.cdr.detectChanges();
      },

      error: (erro) => {
        console.error('Erro ao ler o PDF:', erro);

        if (erro.status === 400) {
          alert(
            typeof erro.error === 'string'
              ? erro.error
              : erro.error?.message ?? 'Arquivo inválido.'
          );

          return;
        }

        alert('Não foi possível ler os dados do currículo.');
      }
    });
  }

  cadastrar(): void {
    this.curriculoService.cadastrar(this.curriculo).subscribe({
      next: (curriculoCadastrado) => {
        console.log('Currículo cadastrado:', curriculoCadastrado);
        alert('Currículo cadastrado com sucesso!');
        this.limparFormulario();
      },

    error: (erro) => {
      console.error('Erro ao cadastrar currículo:', erro);

      if (erro.status === 400 && erro.error?.errors) {
        const errors = erro.error.errors;

        const mensagens: string[] = [];

        if (errors.NomeCompleto) {
          mensagens.push(...errors.NomeCompleto);
        }

        if (errors.Email) {
          mensagens.push(...errors.Email);
        }

        alert(mensagens.join('\n'));

        return;
      }

      alert('Erro ao cadastrar currículo.');
    }
    });
  }

  limparFormulario(): void {
    this.curriculo = {
      nomeCompleto: '',
      email: '',
      telefone: '',
      areaInteresse: '',
      resumoProfissional: ''
    };

    this.arquivoPdf = null;
  }
}