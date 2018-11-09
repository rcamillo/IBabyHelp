import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";

import { RecuperaSenhaPage } from "../recupera-senha/recupera-senha";
import { CadastroPage } from "../cadastro/cadastro";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {}

  public login(form: NgForm) {
    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth
      .signInWithEmailAndPassword(email, senha)
      .then(result => {})
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: "Erro ao realizar Login",
          message: error,
          subTitle: "Tente Novamente !",
          buttons: ["OK"]
        });
        alert.present();
      });
  }

  public goToSignup(): void {
    this.navCtrl.push(CadastroPage);
  }

  public recuperar() {
    this.navCtrl.push(RecuperaSenhaPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
}
