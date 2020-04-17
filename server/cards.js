const cards = {
  guard: {
    id: "guard",
    label: "Guard",
    strength: "1",
    effect:
      "Player designates another player and names a type of card. If that player's hand matches the type of card specified, that player is eliminated from the round. However, Guard cannot be named as the type of card.",
  },
  priest: {
    id: "priest",
    label: "Priest",
    strength: "2",
    effect: "Player is allowed to see another player's hand.",
  },
  baron: {
    id: "baron",
    label: "Baron",
    strength: "3",
    effect:
      "Player will choose another player and privately compare hands. The player with the lower-strength hand is eliminated from the round.",
  },
  handmaid: {
    id: "handmaid",
    label: "Handmaid",
    strength: "4",
    effect:
      "Player cannot be affected by any other player's card until the next turn.",
  },
  prince: {
    id: "prince",
    label: "Prince",
    strength: "5",
    effect:
      "Player can choose any player (including themselves) to discard their hand and draw a new one. If the discarded card is the Princess, the discarding player is eliminated.",
  },
  king: {
    id: "king",
    label: "King",
    strength: "6",
    effect: "Player trades hands with any other player.",
  },
  countess: {
    id: "countess",
    label: "Countess",
    strength: "7",
    effect:
      "If a player holds both this card and either the King or Prince card, this card must be played immediately.",
  },
  princess: {
    id: "princess",
    label: "Princess",
    strength: "8",
    effect:
      "If a player plays this card for any reason, they are eliminated from the round.",
  },
};

const new_deck = [
  ...Array.from({ length: 5 }).fill(cards.guard),
  ...Array.from({ length: 2 }).fill(cards.priest),
  ...Array.from({ length: 2 }).fill(cards.baron),
  ...Array.from({ length: 2 }).fill(cards.handmaid),
  ...Array.from({ length: 2 }).fill(cards.prince),
  ...Array.from({ length: 1 }).fill(cards.king),
  ...Array.from({ length: 1 }).fill(cards.countess),
  ...Array.from({ length: 1 }).fill(cards.princess),
];

const shuffle = (cards) =>
  cards
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

module.exports = {
  new_deck,
  cards,
  shuffle,
};
