import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentSnapshot,
  Firestore,
  runTransaction,
} from '@angular/fire/firestore';
import { filter, map, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { isNotNullOrUndefined } from '../shared/utils';
import { Party } from './party.model';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore
  ) {}

  createParty(party: Partial<Party>) {
    const userId: string = this.auth.getUser()?.uid ?? '';
    const partyCollection = collection(
      this.firestore,
      `users/${userId}/party/`
    );
    return addDoc(partyCollection, party);
  }

  getPartyList() {
    return this.auth.getUser$().pipe(
      filter(isNotNullOrUndefined),
      map(({ uid: userId }) =>
        collection(this.firestore, `users/${userId}/party`)
      ),
      switchMap(
        (partyCollection) =>
          collectionData(partyCollection, { idField: 'id' }) as Observable<
            Party[]
          >
      )
    );
  }

  getPartyDetail(partyId: string) {
    return this.auth.getUser$().pipe(
      filter(isNotNullOrUndefined),
      map(({ uid: userId }: User) =>
        doc(this.firestore, `users/${userId}/party/${partyId}`)
      ),
      switchMap(
        (partyDocument) =>
          docData(partyDocument, { idField: 'id' }) as Observable<Party>
      )
    );
  }

  async addTicketOperation(
    partyId: string,
    ticketCost: number,
    type: string = 'add'
  ) {
    try {
      const userId: string = this.auth.getUser()?.uid ?? '';
      const partyDocRef = doc(
        this.firestore,
        `users/${userId}/party/${partyId}`
      );

      await runTransaction(this.firestore, async (transaction) => {
        const partyDoc = (await transaction.get(
          partyDocRef
        )) as DocumentSnapshot<Party>;
        const party = partyDoc.data() as Party;
        const newRevenue =
          type === 'add'
            ? party.revenue + ticketCost
            : party.revenue - ticketCost;
        transaction.update(partyDocRef, { revenue: newRevenue });
      });
    } catch (error) {
      console.log('Transaction failed: ', error);
      throw error;
    }
  }

  deleteParty(partyId: string): Promise<void> {
    const userId: string = this.auth.getUser()?.uid ?? '';
    const documentReference = doc(
      this.firestore,
      `users/${userId}/party/${partyId}`
    );
    return deleteDoc(documentReference);
  }
}
