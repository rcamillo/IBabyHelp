import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Observable} from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth } from "@angular/fire/auth";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { CadastroPage } from '../pages/cadastro/cadastro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  public listagemUsuario: Observable<any[]>;
  public uiduser: string;

  @ViewChild(Nav) public navCtrl: Nav;

  constructor
    (
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      public afAuth: AngularFireAuth,
      private db : AngularFireDatabase,
      ) 
    {

      this.listagemUsuario = db.list('/usuario/').valueChanges();

      platform.ready().then(() => {

        afAuth.auth.onAuthStateChanged((user) => {

          if(user != null) {
              // está logado:
            this.rootPage = TabsPage;
              this.uiduser = this.afAuth.auth.currentUser.uid;

          }
          else {
              // não está logado:
            this.rootPage = LoginPage;
          }

        });

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }

    public logout(): void {
      this.afAuth.auth.signOut();
    }
  
    public editUsuario(u: any): void {
      this.navCtrl.push(CadastroPage, { usuario: u });
    }

}

