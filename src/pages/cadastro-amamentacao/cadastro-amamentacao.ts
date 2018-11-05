import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import  { AmamentacaoProvider } from '../../providers/amamentacao/amamentacao';

/**
 * Generated class for the CadastroAmamentacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-amamentacao',
  templateUrl: 'cadastro-amamentacao.html',
})
export class CadastroAmamentacaoPage {
  title: string;
  form: FormGroup;
  amamentacao: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: AmamentacaoProvider,
    private toast: ToastController)  
  { 
    this.amamentacao = this.navParams.data.amamentacao || { };
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.amamentacao ? 'Alterando mamada' : 'Nova mamada';
  }

  createForm() {
    this.form = this.formBuilder.group({      
      key: [this.amamentacao.key],
      diaAmamentacao: [this.amamentacao.diaAmamentacao, Validators.required],
      inicioAmamentacao: [this.amamentacao.inicioAmamentacao, Validators.required],
      terminoAmamentacao: [this.amamentacao.terminoAmamentacao, Validators.required],
      observacao: [this.amamentacao.observacao],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Mamada salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar registro.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAmamentacaoPage');
  }

}
