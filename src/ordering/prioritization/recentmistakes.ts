import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const wrong: CardStatus[] = []
      const right: CardStatus[] = []
      // loop through all the cards and see if it was wrong in the last round
      for (let i = 0; i < cards.length; i++) {
        const results = cards[i].getResults()
        if (results.length > 0 && !results[results.length - 1]) {
          wrong.push(cards[i])
        } else {
          right.push(cards[i])
        }
      }
      return wrong.concat(right)
    }
  }
};

export { newRecentMistakesFirstSorter }
