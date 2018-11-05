import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VacinaProvider } from '../../providers/vacina/vacina';

/**
 * Generated class for the CadastroVacinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-vacina',
  templateUrl: 'cadastro-vacina.html',
})
export class CadastroVacinaPage {
  title: string;
  form: FormGroup;
  vacina: any;

  constructor( 
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: VacinaProvider,
    private toast: ToastController)  
  {
    this.vacina = this.navParams.data.vacina || { };
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.vacina ? 'Alterando dados de Vacina' : 'Nova Vacina';
  }

  createForm() {
    this.form = this.formBuilder.group({
      
      key: [this.vacina.key],
      nomeVacina: [this.vacina.nomeVacina, Validators.required],
      aplicacao: [this.vacina.aplicacao, Validators.required],
      dose: [this.vacina.dose, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Vacina salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar Vacina.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVacinaPage');
  }

}
