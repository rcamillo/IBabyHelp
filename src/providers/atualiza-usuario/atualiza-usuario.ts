import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { UsuarioProvider } from '../usuario/usuario';

/*
  Generated class for the AtualizaUsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AtualizaUsuarioProvider {
  private PATH = '/usuario/';
  uiduser: string;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) 
    { }

  save(usuario: any) {
    if (usuario != null) {
      usuario.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
      });
    }
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}

