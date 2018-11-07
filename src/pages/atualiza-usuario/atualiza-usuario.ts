import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the AtualizaUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atualiza-usuario',
  templateUrl: 'atualiza-usuario.html',
})
export class AtualizaUsuarioPage {
  title: string;
  form: FormGroup;
  usuario: any;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController)  
    {
      this.usuario = this.navParams.data.usuario || { };
      this.createForm();
    }

    createForm() {
      this.form = this.formBuilder.group({      
        key: [this.usuario.key],
        nome: [this.usuario.nome, Validators.required],
        babyname: [this.usuario.babyname, Validators.required],
        sexo: [this.usuario.sexo, Validators.required],
        babyDate: [this.usuario.babyDate, Validators.required],
      });
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({ message: 'Usuario salvo com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
            console.error(e);
          })
      }
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AtualizaUsuarioPage');
  }

}

