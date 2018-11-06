import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable} from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from 'angularfire2/database';

import { AtualizaUsuarioPage } from '../atualiza-usuario/atualiza-usuario';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public listagemUsuario: Observable<any[]>;
  public uiduser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db : AngularFireDatabase,
    public afAuth: AngularFireAuth,) 
  {
    this.listagemUsuario = db.list('/usuario/').valueChanges();
    this.uiduser = this.afAuth.auth.currentUser.uid;
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public editUsuario(u: any): void {
    this.navCtrl.push(AtualizaUsuarioPage, { usuario: u });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
