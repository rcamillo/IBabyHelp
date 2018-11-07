import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, normalizeURL } from 'ionic-angular';

// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { DomSanitizer } from '@angular/platform-browser';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the AtualizaUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atualiza-usuario',
  templateUrl: 'atualiza-usuario.html',
})
export class AtualizaUsuarioPage {

  title: string;
  form: FormGroup;
  usuario: any;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController,
    // private camera: Camera,
    public alertCtrl: AlertController,
    // private domSanitizer: DomSanitizer,
    public afAuth: AngularFireAuth,
    public imagePicker: ImagePicker,
    public cropService: Crop,)  
    {
      this.usuario = this.navParams.data.usuario || { };
      this.createForm();
    }

    createForm() {
      this.form = this.formBuilder.group({      
        key: [this.usuario.key],
        nome: [this.usuario.nome, Validators.required],
        babyname: [this.usuario.babyname, Validators.required],
        sexo: [this.usuario.sexo, Validators.required],
        babyDate: [this.usuario.babyDate, Validators.required],
      });
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({ message: 'Usuario salvo com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000 }).present();
            console.error(e);
          })
      }
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AtualizaUsuarioPage');
  }

// Update de Imagem

openImagePickerCrop(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.cropService.crop(results[i], {quality: 75}).then(
                newImage => {
                  this.uploadImageToFirebase(newImage);
                },
                error => console.error("Error cropping image", error)
              );
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
}

openImagePicker(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
}

uploadImageToFirebase(image){
  image = normalizeURL(image);

  //uploads img to firebase storage
  this.usuario.uploadImage(image)
  .then(photoURL => {
    
    let toast = this.toast.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    toast.present();
    })
}

}

