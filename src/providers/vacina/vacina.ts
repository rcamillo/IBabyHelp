import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class VacinaProvider {
  private PATH = "/agenda/vacina/";
  uiduser: string;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  save(vacina: any) {
    return new Promise((resolve, reject) => {
      if (vacina.key) {
        this.db
          .list(this.PATH)
          .update(vacina.key, {
            nomeVacina: vacina.nomeVacina,
            aplicacao: vacina.aplicacao,
            dose: vacina.dose
          })
          .then(() => resolve())
          .catch(e => reject(e));
      } else {
        this.uiduser = this.afAuth.auth.currentUser.uid;
        let key: string;
        key = this.db.list(this.PATH).push({
          uiduser: this.uiduser,
          nomeVacina: vacina.nomeVacina,
          aplicacao: vacina.aplicacao,
          dose: vacina.dose
        }).key;
        this.db
          .list(this.PATH)
          .update(key, { key: key })
          .then(() => resolve())
          .catch(e => reject(e));
      }
    });
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
