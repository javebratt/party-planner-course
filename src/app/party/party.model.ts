export interface Party {
  id: string; // The ID of the document.
  name: string; // The user friendly name.
  date: number; // The date it is happening.
  ticketPrice: number; // The price for people to go into the party.
  cost: number; // The $$ you're spending throwing the party.
  revenue: number; // The income - the expenses.
}
