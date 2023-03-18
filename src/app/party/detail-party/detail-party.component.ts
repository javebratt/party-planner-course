import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, switchMap } from 'rxjs';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-detail-party',
  templateUrl: './detail-party.component.html',
  styleUrls: ['./detail-party.component.scss'],
})
export class DetailPartyComponent {
  // We're creating a class variable for the currentParty
  currentParty$: Observable<Party> = this.route.params.pipe(
    switchMap((params: { [key: string]: string }) =>
      this.partyService.getPartyDetail(params['partyId'])
    )
  );
  // We're injecting Angular's ActivatedRoute into the constructor.
  constructor(
    private readonly route: ActivatedRoute,
    private readonly partyService: PartyService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController
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

  async removeParty(partyId: string) {
    try {
      await this.partyService.deleteParty(partyId);
      this.router.navigateByUrl('party');
    } catch (error) {
      console.log(error);
    }
  }

  async removePartyAlert(partyId: string) {
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete this document?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete Party',
          handler: () => this.removeParty(partyId),
        },
      ],
    });
    await alert.present();

    await alert.onDidDismiss();
  }
}
