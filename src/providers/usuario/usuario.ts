import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
  private PATH = `/usuario/`;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) 
  {}

  save(usuario: any) {
    return new Promise((resolve, reject) => {
      if (usuario.key) {
        this.db.list(this.PATH)
          .update(usuario.key, {nome: usuario.nome, babyname: usuario.babyname, sexo: usuario.sexo, babyDate: usuario.babyDate})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((resolve) => { 
          let iduser = resolve.user.uid;
          let key: string;

          key = this.db.list(this.PATH).push({iduser: iduser, nome: usuario.nome, email: usuario.email, senha: usuario.senha, babyname: usuario.babyname, sexo: usuario.sexo, babyDate: usuario.babyDate}).key;

          this.db.list(this.PATH)
         .update(key, {key:key})
          .catch((e) => reject(e));
        })
      .catch((error) => {
      })
      }
    }
    )
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
