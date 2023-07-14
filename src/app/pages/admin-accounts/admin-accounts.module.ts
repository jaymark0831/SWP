import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAccountsPageRoutingModule } from './admin-accounts-routing.module';

import { AdminAccountsPage } from './admin-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAccountsPageRoutingModule
  ],
  declarations: [AdminAccountsPage]
})
export class AdminAccountsPageModule {}
