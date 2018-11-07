import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable} from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from 'angularfire2/database';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  form: FormGroup;
  usuario: any; 

  public listagemUsuario: Observable<any[]>;
  public uiduser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db : AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController) 
  {
    this.usuario = this.navParams.data.usuario || { };
    this.listagemUsuario = db.list('/usuario/').valueChanges();
    this.uiduser = this.afAuth.auth.currentUser.uid;
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
          this.navCtrl.popToRoot();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public editUsuario(u: any): void {
    this.navCtrl.push(PerfilPage, { usuario: u });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
