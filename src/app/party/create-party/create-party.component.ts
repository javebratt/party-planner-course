import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class CreatePartyComponent {
  private readonly partyService = inject(PartyService);
  private readonly router = inject(Router);

  name: string | undefined;
  ticketPrice: number | undefined;
  cost: number | undefined;
  date: number | undefined;

  async createEvent(party: Partial<Party>) {
    party.revenue = 0;
    await this.partyService.createParty(party);
    console.log(party);
    await this.router.navigateByUrl('party');
  }
}
