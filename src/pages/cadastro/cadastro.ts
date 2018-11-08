import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { Camera, CameraOptions } from "@ionic-native/camera";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";

import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: "page-cadastro",
  templateUrl: "cadastro.html"
})
export class CadastroPage {
  public fotoPerfil: any;
  form: FormGroup;
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController,
    public afAuth: AngularFireAuth,
    public camera: Camera
  ) {
    this.usuario = this.navParams.data.usuario || {};
    this.createForm(this.fotoPerfil);
  }

  abreCamera() {
    //options do role
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 600,
      allowEdit: true,
      correctOrientation: true,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.fotoPerfil = base64Image;
        this.createForm(this.fotoPerfil);
      },
      err => {
        // Handle error
      }
    );
  }

  createForm(imagem) {
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, Validators.required],
      senha: [this.usuario.senha, Validators.required],
      babyname: [this.usuario.babyname, Validators.required],
      sexo: [this.usuario.sexo, Validators.required],
      babyDate: [this.usuario.babyDate, Validators.required],
      fotoPerfil: [imagem, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider
        .save(this.form.value)
        .then(() => {
          this.toast
            .create({ message: "Usuario salvo com sucesso.", duration: 3000 })
            .present();
          this.navCtrl.pop();
        })
        .catch(e => {
          this.toast
            .create({ message: "Erro ao salvar usuário.", duration: 3000 })
            .present();
          console.error(e);
        });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CadastroPage");
  }
}
