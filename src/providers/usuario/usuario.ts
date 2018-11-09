import { Injectable } from "@angular/core";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { VacinaProvider } from "../vacina/vacina";
@Injectable()
export class UsuarioProvider {
  private PATH = `/usuario/`;
  private pathVacinas = "/agenda/";

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public providers: VacinaProvider
  ) {}

  save(usuario: any) {
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
            let key: string;
            key = this.db.list(this.PATH).push({
              iduser: iduser,
              nome: usuario.nome,
              email: usuario.email,
              babyname: usuario.babyname,
              sexo: usuario.sexo,
              babyDate: usuario.babyDate,
              fotoPerfil: usuario.fotoPerfil,
              carteiraVacinas: usuario.listaVacinas
            }).key;
            this.db
              .list(this.PATH)
              .update(key, { key: key })
              .catch(e => reject(e));
          })
          .catch(error => {});
        //this.providers.save(usuario.listaVacinas);
        // this.db.list(this.pathVacinas + this.afAuth.auth.currentUser.uid).push({
        //   aplicacao: usuario.listaVacinas.aplicacao,
        //   dose: usuario.listaVacinas.dose,
        //   nomeVacina: usuario.listaVacinas.nomeVacina
        // });
      }
    });
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
