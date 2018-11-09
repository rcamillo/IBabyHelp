import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class UsuarioProvider {
  private PATH = `/usuario/`;
  private pathVacinas = "/agenda/";

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  save(usuario: any, lista: any[]) {
    return new Promise((resolve, reject) => {
      if (usuario.key) {
        this.db
          .list(this.PATH)
          .update(usuario.key, {
            nome: usuario.nome,
            babyname: usuario.babyname,
            sexo: usuario.sexo,
            babyDate: usuario.babyDate,
            fotoPerfil: usuario.foto
          })
          .then(() => resolve())
          .catch(e => reject(e));
      } else {
        this.afAuth.auth
          .createUserWithEmailAndPassword(usuario.email, usuario.senha)
          .then(resolve => {
            let iduser = resolve.user.uid;
            let teste = this.db
              .list(this.pathVacinas + iduser + "/vacinas/")
              .push({ lista }).key;
            let keyy: string;
            keyy = this.db.list(this.PATH).push({
              iduser: iduser,
              nome: usuario.nome,
              email: usuario.email,
              babyname: usuario.babyname,
              sexo: usuario.sexo,
              babyDate: usuario.babyDate,
              fotoPerfil: usuario.fotoPerfil,
              caminhoVacina: teste
            }).key;
            this.db
              .list(this.PATH)
              .update(keyy, { key: keyy })
              .catch(e => reject(e));
          })
          .catch(error => {});
      }
    });
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
