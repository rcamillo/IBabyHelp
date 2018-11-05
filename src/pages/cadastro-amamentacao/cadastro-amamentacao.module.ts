import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAmamentacaoPage } from './cadastro-amamentacao';

@NgModule({
  declarations: [
    CadastroAmamentacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAmamentacaoPage),
  ],
})
export class CadastroAmamentacaoPageModule {}
