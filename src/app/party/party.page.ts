import { Component, OnInit } from '@angular/core';
import { PartyService } from './party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  readonly partyList$ = this.partyService.getPartyList();
  constructor(private readonly partyService: PartyService) {}

  ngOnInit() {}
}
