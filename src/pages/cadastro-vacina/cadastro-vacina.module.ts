import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroVacinaPage } from './cadastro-vacina';

@NgModule({
  declarations: [
    CadastroVacinaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroVacinaPage),
  ],
})
export class CadastroVacinaPageModule {}
