import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AmamentacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AmamentacaoProvider {
  private PATH = 'agenda/amamentacao/';
  public uiduser: string;
  

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) 
  { }

  save(amamentacao: any) {
    return new Promise((resolve, reject) => {
      if (amamentacao.key) {
        this.db.list(this.PATH)
          .update(amamentacao.key, {diaAmamentacao: amamentacao.diaAmamentacao, inicioAmamentacao: amamentacao.inicioAmamentacao, terminoAmamentacao: amamentacao.terminoAmamentacao, observacao: amamentacao.observacao})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.uiduser = this.afAuth.auth.currentUser.uid;
        let key: string;
         key = this.db.list(this.PATH).push({uiduser: this.uiduser, diaAmamentacao: amamentacao.diaAmamentacao, inicioAmamentacao: amamentacao.inicioAmamentacao, terminoAmamentacao: amamentacao.terminoAmamentacao, observacao: amamentacao.observacao}).key;
         this.db.list(this.PATH)
         .update(key, {key:key})
         .then(() => resolve())
          .catch((e) => reject(e));
      }
    }
    )
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
