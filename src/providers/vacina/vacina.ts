import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";
/*
  Generated class for the VacinaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VacinaProvider {
  private PATH =
    "/agenda/0E7tcctKarSd90h8hrY3grJ25Xw2/vacinas/-LQqIBQfL0zeTjb1xbjn/lista";

  constructor(private db: AngularFireDatabase, public auth: AngularFireAuth) {}

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
        let key: string;
        key = this.db.list(this.PATH).push({
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
