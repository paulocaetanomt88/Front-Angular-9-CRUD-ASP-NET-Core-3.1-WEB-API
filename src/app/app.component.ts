import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PagamentoCartao';

  constructor(private AppService: AppService) {}

  data: {};
  CartaoForm: FormGroup;
  submitted = false;
  EventValue: any = "Save";

  ngOnInit(): void {
    this.getData();

    this.CartaoForm = new FormGroup({
      pagamentoId: new FormControl(0),
      nomeTitular: new FormControl("",[Validators.required]),
      numeroCartao: new FormControl("",[Validators.required]),
      dataExpiracao: new FormControl("",[Validators.required]),
      cvv: new FormControl("",[Validators.required]),
    })
  }

  getData() {
    this.AppService.getData().subscribe((data: {}) => {
      this.data = data;
    })
  }

  deleteData(id) {
    this.AppService.deleteData(id).subscribe((data: {}) => {
      this.data = data;
      this.getData();
    })
  }

  Save() {
    this.submitted = true;

    if(this.CartaoForm.invalid) {
      return;
    }

    this.AppService.postData(this.CartaoForm.value).subscribe((data: {}) => {
        this.data = data;
        this.resetForm();
      })
  }

  Update() {
    this.submitted = true;

    if (this.CartaoForm.invalid) {
      return;
    }

    this.AppService.putData(this.CartaoForm.value.pagamentoId,
            this.CartaoForm.value).subscribe((data: {}) => {
              this.data = data;
              this.resetForm();
            })

    this.CartaoForm = new FormGroup({
      pagamentoId: new FormControl(0),
    })
  }

  EditData(dado) {
    this.CartaoForm.controls["pagamentoId"].setValue(dado.pagamentoId);
    this.CartaoForm.controls["nomeTitular"].setValue(dado.nomeTitular);
    this.CartaoForm.controls["numeroCartao"].setValue(dado.numeroCartao);
    this.CartaoForm.controls["dataExpiracao"].setValue(dado.dataExpiracao);
    this.CartaoForm.controls["cvv"].setValue(dado.cvv);
    this.EventValue = "Update";
  }

  resetForm() {
    this.getData();
    this.CartaoForm.reset();
    this.CartaoForm = new FormGroup({
      pagamentoId: new FormControl(0),
      nomeTitular: new FormControl("",[Validators.required]),
      numeroCartao: new FormControl("",[Validators.required]),
      dataExpiracao: new FormControl("",[Validators.required]),
      cvv: new FormControl("",[Validators.required]),
    })
    this.EventValue = "Save";
    this.submitted = false;
  }
}
