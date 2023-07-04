import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderLoginComponent } from './header-login/header-login.component';



@NgModule({
  declarations: [HeaderComponent, HeaderLoginComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [HeaderComponent,HeaderLoginComponent, FooterComponent]
})
export class SharedComponentsModule { }
