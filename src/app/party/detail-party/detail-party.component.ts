import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-detail-party',
  templateUrl: './detail-party.component.html',
  styleUrls: ['./detail-party.component.scss'],
})
export class DetailPartyComponent {
  private partyId?: string;

  currentParty$: Observable<Party> = this.route.params.pipe(
    switchMap((params: { [key: string]: string }) => {
      this.partyId = params['partyId'];
      return this.partyService.getPartyDetail(params['partyId']);
    })
  );
  alertButtons = [
    { text: 'Cancel', role: 'cancel' },
    {
      text: 'Delete Party',
      role: 'confirm',
      handler: () => this.removeParty(),
    },
  ];
  constructor(
    private readonly partyService: PartyService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async addTicketOperation(type: string, currentParty: Party) {
    try {
      await this.partyService.addTicketOperation(
        currentParty.id,
        currentParty.ticketPrice,
        type
      );
    } catch (error) {
      console.log(error);
    }
  }

  async removeParty() {
    if (!this.partyId) {
      return;
    }

    try {
      await this.partyService.deleteParty(this.partyId);
      this.router.navigateByUrl('party');
    } catch (error) {
      console.log(error);
    }
  }
}
