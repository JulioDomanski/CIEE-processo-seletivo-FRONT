import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {

  private apiUrl = 'http://localhost:5034/api/curriculos';

  constructor(private http: HttpClient) {}

  cadastrar(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo);
  }

  lerPdf(arquivo: File): Observable<any> {
    const formData = new FormData();

    formData.append('arquivo', arquivo);

    return this.http.post<any>(
      `${this.apiUrl}/ler-pdf`,
      formData
    );
  }
}