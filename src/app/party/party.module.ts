import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyPageRoutingModule } from './party-routing.module';

import { CreatePartyComponent } from './create-party/create-party.component';
import { DetailPartyComponent } from './detail-party/detail-party.component';
import { PartyPage } from './party.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PartyPageRoutingModule],
  declarations: [PartyPage, CreatePartyComponent, DetailPartyComponent],
})
export class PartyPageModule {}
