import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import 'firebase/storage';

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

  //Update Imagem
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

}
