const journalEntries = [];

class JournalEntry {
  constructor( creationDate, confidence, entry ) {
    this.creationDate = creationDate;
    this.confidence = confidence;
    this.entry = entry;
  }
}

const addJournalEntry = () => {
  const validConfidence = ['EASY', 'MEDIUM', 'HARD'];

  let date = prompt( 'Enter a date for your journal entry' );
  if ( date === null || date.toUpperCase() === 'QUIT' ) return;

  let confidence = prompt( 'Enter a confidence level for your journal entry\nAvailable choices are Easy, Medium, and Hard' );
  if ( confidence === null || confidence.toUpperCase() === 'QUIT' ) return;
  while ( validConfidence.indexOf(confidence.toUpperCase()) < 0) {
    confidence = prompt( 'Invalid confidence level. Please enter a valid confidence level.\nAvailable choices are Easy, Medium, and Hard' );
    if ( confidence === null || confidence.toUpperCase() === 'QUIT' ) return;
  }
  let entry = prompt( 'Enter the contents of your journal' );
  if ( entry === null || entry.toUpperCase() === 'QUIT' ) return;

  let userJournal = new JournalEntry( date, confidence, entry );
  let confirmation = confirm( `Do you want to add this journal?\nDate: ${userJournal.creationDate}\nConfidence Level: ${userJournal.confidence}\nJournal Contents: ${userJournal.entry}` );
  if ( confirmation ) journalEntries.push( userJournal );
}

const editJournalEntry = () => {
  const validConfidence = ['EASY', 'MEDIUM', 'HARD'];

  if ( journalEntries.length > 0 ) {
    let idx = parseInt(prompt('Enter the number that corresponds to the entry you want to alter')) - 1;
    if ( idx >= 0 && idx < journalEntries.length ) {
      let date = prompt( `Enter a new date for this journal entry\nCurrent Date: ${journalEntries[idx].creationDate}` );
      if ( date === null || date.toUpperCase() === 'QUIT' ) return;

      let confidence = prompt( `Enter a new confidence level for your journal entry\nCurrent Confidence Level: ${journalEntries[idx].confidence}\nAvailable choices are Easy, Medium, and Hard` );
      if ( confidence === null || confidence.toUpperCase() === 'QUIT' ) return;
      while ( validConfidence.indexOf(confidence.toUpperCase()) < 0) {
        confidence = prompt( `Invalid confidence level. Please enter a valid confidence level.\nCurrent Confidence Level: ${journalEntries[idx].confidence}\nAvailable choices are Easy, Medium, and Hard` );
        if ( confidence === null || confidence.toUpperCase() === 'QUIT' ) return;
      }
      let entry = prompt( `Enter the contents of your journal\nCurrent Content: ${journalEntries[idx].entry}` );
      if ( entry === null || entry.toUpperCase() === 'QUIT' ) return;

      let userJournal = new JournalEntry( date, confidence, entry );
      let confirmation = confirm( `Do you want to confirm this journal edit?\nDate: ${userJournal.creationDate}\nConfidence Level: ${userJournal.confidence}\nJournal Contents: ${userJournal.entry}` );
      if ( confirmation ) journalEntries[idx] = userJournal;

    }

  } else {
    alert("You don't have any journal entries yet! Try adding some before attempting to edit an entry.")
  }
}

const createJournalEntries = () => {
  const journalContainer = document.querySelector( '#journal' );
  journalContainer.innerHTML = '';
  for ( const journal of journalEntries ) {
    let entryContainer = document.createElement( 'div' );
    let entryList = document.createElement( 'ul' );
    let journalDate = document.createElement( 'li' );
    let journalConfidence = document.createElement( 'li' );
    let journalContent = document.createElement( 'li' );

    journalDate.textContent = `Date: ${journal.creationDate}`
    journalConfidence.textContent = `Confidence Level: ${journal.confidence}`
    journalContent.textContent = `Journal Content: ${journal.entry}`

    journalDate.classList.add('capitalize');
    journalConfidence.classList.add('capitalize');

    entryList.append( journalDate, journalConfidence, journalContent );
    entryContainer.append( entryList );
    journalContainer.append( entryContainer );
  }

}

const logJournalEntries = () => {
  for ( const journal of journalEntries ) {
    console.log( `Date: ${journal.creationDate}\nConfidence Level: ${journal.confidence}\nJournal Contents: ${journal.entry}` );
  }
}

const journalProcess = () => {
  addJournalEntry();
  logJournalEntries();
  createJournalEntries();
}

const editJournalProcess = () => {
  editJournalEntry();
  logJournalEntries();
  createJournalEntries();
}

const journalButton = document.querySelector( '#add' );
const editJournalButton = document.querySelector( '#edit' );
journalButton.addEventListener( 'click', journalProcess );
editJournalButton.addEventListener( 'click', editJournalProcess );
