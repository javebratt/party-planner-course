import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
})
export class CreatePartyComponent {
  name: string | undefined;
  ticketPrice: number | undefined;
  cost: number | undefined;
  date: number | undefined;

  constructor(
    private readonly router: Router,
    private readonly partyService: PartyService
  ) {}

  async createEvent(party: Partial<Party>) {
    party.revenue = 0;
    await this.partyService.createParty(party);
    console.log(party);
    await this.router.navigateByUrl('party');
  }
}
