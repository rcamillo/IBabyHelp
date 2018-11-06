import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { DicasPage } from '../dicas/dicas';
import { AmamentacaoPage } from '../amamentacao/amamentacao';
import { AgendaPage } from '../agenda/agenda';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = DicasPage;
  tab2 = AgendaPage;
  tab3 = AmamentacaoPage;
  tab4 = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
