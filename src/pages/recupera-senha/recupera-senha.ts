import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the RecuperaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recupera-senha',
  templateUrl: 'recupera-senha.html',
})
export class RecuperaSenhaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth) 
  { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperaSenhaPage');
  }

  public recuperar(recuperasenha: NgForm) {

    let email = recuperasenha.value.email;

    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((error) => {
        alert(error);
      })
  }

}
