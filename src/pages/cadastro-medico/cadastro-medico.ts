import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MedicoProvider } from '../../providers/medico/medico';

/**
 * Generated class for the CadastroMedicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-medico',
  templateUrl: 'cadastro-medico.html',
})
export class CadastroMedicoPage {
  title: string;
  form: FormGroup;
  medico: any;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: MedicoProvider,
    private toast: ToastController)  
  {    
    this.medico = this.navParams.data.medico || { };
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.medico ? 'Alterando agenda' : 'Nova Consulta Médica';
  }

  createForm() {
    this.form = this.formBuilder.group({      
      key: [this.medico.key],
      nomeMedico: [this.medico.nomeMedico, Validators.required],
      dataConsulta: [this.medico.dataConsulta, Validators.required],
      horaConsulta: [this.medico.horaConsulta, Validators.required],
      observacao: [this.medico.observacao],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Agenda salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar agenda médica.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroMedicoPage');
  }

}
