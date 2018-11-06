import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { variable } from '@angular/compiler/src/output/output_ast';

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
    private toast: ToastController,
    private camera: Camera,
    public alertCtrl: AlertController,
    private domSanitizer: DomSanitizer,
    public afAuth: AngularFireAuth)  
    {
      this.usuario = this.navParams.data.usuario || { };
    }

    public atualizar(form: NgForm): void {
      let nome = form.value.nome;
      let babyname = form.value.babyname;
      let sexo = form.value.sexo;
      let datanasc = form.value.datanasc;

      let user = {
        nome: nome,
        babyname: babyname,
        sexo: sexo,
        datanasc: datanasc,
     };
     if (user) {
      this.provider.save(user)
        .then(() => {
          this.toast.create({ message: 'Usuario salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
          console.error(e);
        })
    };
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AtualizaUsuarioPage');
  }


  // onSubmit() {
  //   if (this.user) {
  //     this.provider.save(this.user.value)
  //       .then(() => {
  //         this.toast.create({ message: 'Usuario salvo com sucesso.', duration: 3000 }).present();
  //         this.navCtrl.pop();
  //       })
  //       .catch((e) => {
  //         this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
  //         console.error(e);
  //       })
  //   }
  // }

}

