import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

import { RecuperaSenhaPage } from '../recupera-senha/recupera-senha';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth) {
  }

  public login(form: NgForm) {
    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then((result) => {
      })
      .catch((error) => {
      })
  }

  public goToSignup():void{
  this.navCtrl.push(CadastroPage);
  }

  public recuperar() {
    this.navCtrl.push(RecuperaSenhaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
