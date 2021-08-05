const journalEntries = [];

class JournalEntry {
  constructor( creationDate, confidence, entry ) {
    this.creationDate = creationDate;
    this.confidence = confidence;
    this.entry = entry;
  }
}

const addJournalEntry = () => {
  let date = prompt('Enter a date for your journal entry');
  let confidence = prompt('Enter a confidence level for your journal entry');
  let entry = prompt('Enter the contents of your journal');

  let userJournal = new JournalEntry( date, confidence, entry );
  let confirmation = confirm(`Do you want to add this journal?\nDate: ${userJournal.creationDate}\nConfidence Level: ${userJournal.confidence}\nJournal Contents: ${userJournal.entry}`);
  if (confirmation) journalEntries.push(userJournal);
}

const createJournalEntries = () => {
  const journalContainer = document.querySelector('#journal');
  journalContainer.innerHTML = '';
  for (const journal of journalEntries) {
    let entryContainer = document.createElement('div');
    let entryList = document.createElement('ul');
    let journalDate = document.createElement('li');
    let journalConfidence = document.createElement('li');
    let journalContent = document.createElement('li');

    journalDate.textContent = `Date: ${journal.creationDate}`
    journalConfidence.textContent = `Confidence Level: ${journal.confidence}`
    journalContent.textContent = `Journal Content: ${journal.entry}`

    entryList.append( journalDate, journalConfidence, journalContent );
    entryContainer.append( entryList );
    journalContainer.append( entryContainer );
  }

}

const logJournalEntries = () => {
  for (const journal of journalEntries) {
    console.log('*************');
    console.log(`Date: ${journal.creationDate}\nConfidence Level: ${journal.confidence}\nJournal Contents: ${journal.entry}`);
  }
}

addJournalEntry();
logJournalEntries();
createJournalEntries();
