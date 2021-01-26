import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComentariosPipe } from './comentarios.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PrincipalPage, ComentariosPipe]
})
export class PrincipalPageModule {}
