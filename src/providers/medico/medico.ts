import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class MedicoProvider {
  private PATH = "agenda/medico/";
  uiduser: string;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  save(medico: any) {
    return new Promise((resolve, reject) => {
      if (medico.key) {
        this.db
          .list(this.PATH)
          .update(medico.key, {
            nomeMedico: medico.nomeMedico,
            dataConsulta: medico.dataConsulta,
            horaConsulta: medico.horaConsulta,
            observacao: medico.observacao
          })
          .then(() => resolve())
          .catch(e => reject(e));
      } else {
        this.uiduser = this.afAuth.auth.currentUser.uid;
        let key: string;
        key = this.db.list(this.PATH).push({
          uiduser: this.uiduser,
          nomeMedico: medico.nomeMedico,
          dataConsulta: medico.dataConsulta,
          horaConsulta: medico.horaConsulta,
          observacao: medico.observacao
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
