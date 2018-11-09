import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable } from "rxjs";

import { CadastroMedicoPage } from "../cadastro-medico/cadastro-medico";
import { CadastroVacinaPage } from "../cadastro-vacina/cadastro-vacina";

import { MedicoProvider } from "../../providers/medico/medico";
import { VacinaProvider } from "../../providers/vacina/vacina";

@IonicPage()
@Component({
  selector: "page-agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage {
  public listvacinas: Observable<any[]>;
  public listmedicos: Observable<any[]>;
  public uiduser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private providervacina: VacinaProvider,
    private providermedico: MedicoProvider,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.listmedicos = db.list("/agenda/medico").valueChanges();
    this.uiduser = afAuth.auth.currentUser.uid;
    this.listvacinas = db.list("/agenda/vacina").valueChanges();
  }

  newVacina() {
    this.navCtrl.push(CadastroVacinaPage);
  }

  newMedico() {
    this.navCtrl.push(CadastroMedicoPage);
  }

  editVacina(v: any) {
    this.navCtrl.push(CadastroVacinaPage, { vacina: v });
  }

  editMedico(m: any) {
    this.navCtrl.push(CadastroMedicoPage, { medico: m });
  }

  removeVacina(key: string) {
    if (key) {
      this.providervacina
        .remove(key)
        .then(() => {
          this.toast
            .create({ message: "Vacina removida com sucesso.", duration: 3000 })
            .present();
        })
        .catch(() => {
          this.toast
            .create({ message: "Falha ao remover o vacina.", duration: 3000 })
            .present();
        });
    }
  }

  removeMedico(key: string) {
    if (key) {
      this.providermedico
        .remove(key)
        .then(() => {
          this.toast
            .create({
              message: "Agenda médica removida com sucesso.",
              duration: 3000
            })
            .present();
        })
        .catch(() => {
          this.toast
            .create({
              message: "Falha ao remover o agenda médica.",
              duration: 3000
            })
            .present();
        });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AgendaPage");
  }
}
