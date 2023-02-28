import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly rootURL = 'http://localhost:49515/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Retorna todos registros
  getData() {
    return this.http.get(this.rootURL + '/Pagamentos');
  }

  // Cadastra registro
  postData(formData) {
    return this.http.post(this.rootURL + '/Pagamentos', formData);
  }

  // Atualiza dados do registro do id recebido
  putData(id, formData) {
    return this.http.put(this.rootURL + '/Pagamentos/'+id, formData);
  }

  // Apaga registro do id recebido
  deleteData(id) {
    return this.http.delete(this.rootURL + '/Pagamentos/'+id);
  }
}
