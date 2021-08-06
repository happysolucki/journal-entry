const journalEntries = [];

class JournalEntry {
  constructor(creationDate, confidence, entry) {
    this.creationDate = creationDate;
    this.confidence = confidence;
    this.entry = entry;
  }
}

const addJournalEntry = () => {
  // array for valid confidence entries
  const validConfidence = ["EASY", "MEDIUM", "HARD"];

  let date = prompt("Enter a date for your journal entry");
  // check for prompt cancel or 'quit'
  if (date === null || date.toUpperCase() === "QUIT") return;

  let confidence = prompt(
    "Enter a confidence level for your journal entry\nAvailable choices are easy, medium, and hard."
  );
  // check for prompt cancel or 'quit'
  if (confidence === null || confidence.toUpperCase() === "QUIT") return;
  // while confidence isn't easy, medium, or hard
  while (validConfidence.indexOf(confidence.toUpperCase()) < 0) {
    confidence = prompt(
      "Invalid confidence level. Please enter a valid confidence level.\nAvailable choices are easy, medium, and hard."
    );
    // check for prompt cancel or 'quit'
    if (confidence === null || confidence.toUpperCase() === "QUIT") return;
  }
  let entry = prompt("Please enter the contents of your journal.");
  // check for prompt cancel or 'quit'
  if (entry === null || entry.toUpperCase() === "QUIT") return;

  // create new journal entry from user input
  let userJournal = new JournalEntry(date, confidence, entry);
  let confirmation = confirm(
    `Do you want to add this journal?\nDate: ${userJournal.creationDate}\nConfidence Level: ${userJournal.confidence}\nJournal Contents: ${userJournal.entry}`
  );
  // if user confirms, add userJournal to journalEntries array
  if (confirmation) journalEntries.push(userJournal);
};

const editJournalEntry = () => {
  // array for valid confidence entries
  const validConfidence = ["EASY", "MEDIUM", "HARD"];

  // check if there are any journal entries
  if (journalEntries.length > 0) {
    let idx = prompt(
      `Enter the number that corresponds to the entry you want to alter.\nAvailable numbers are 1 through ${journalEntries.length}.`
    );
    // check for prompt cancel or 'quit'
    if (idx === null || idx.toUpperCase() === "QUIT") return;
    // while idx is out of range
    while (
      parseInt(idx) - 1 < 0 ||
      parseInt(idx) - 1 >= journalEntries.length
    ) {
      let idx = prompt(
        `The number you entered is out of range.\nEnter the number that corresponds to the entry you want to alter.\nAvailable numbers are 1 through ${journalEntries.length}.`
      );
      // check for prompt cancel or 'quit'
      if (idx === null || idx.toUpperCase() === "QUIT") return;
    }
    // reassign idx to parsed integer minus 1
    idx = parseInt(idx) - 1;
    let date = prompt(
      `Enter a new date for this journal entry\nCurrent Date: ${journalEntries[idx].creationDate}`
    );
    // check for prompt cancel or 'quit'
    if (date === null || date.toUpperCase() === "QUIT") return;

    let confidence = prompt(
      `Enter a new confidence level for your journal entry\nCurrent Confidence Level: ${journalEntries[idx].confidence}\nAvailable choices are easy, medium, and hard.`
    );
    // check for prompt cancel or 'quit'
    if (confidence === null || confidence.toUpperCase() === "QUIT") return;
    // while confidence isn't easy, medium, or hard
    while (validConfidence.indexOf(confidence.toUpperCase()) < 0) {
      confidence = prompt(
        `Invalid confidence level. Please enter a valid confidence level.\nCurrent Confidence Level: ${journalEntries[idx].confidence}\nAvailable choices are easy, medium, and hard.`
      );
      // check for prompt cancel or 'quit'
      if (confidence === null || confidence.toUpperCase() === "QUIT") return;
    }
    let entry = prompt(
      `Please enter the new contents of your journal\nCurrent Content: ${journalEntries[idx].entry}`
    );
    // check for prompt cancel or 'quit'
    if (entry === null || entry.toUpperCase() === "QUIT") return;

    // create new journal entry from user input
    let userJournal = new JournalEntry(date, confidence, entry);
    let confirmation = confirm(
      `Do you want to confirm this journal edit?\nDate: ${userJournal.creationDate}\nConfidence Level: ${userJournal.confidence}\nJournal Contents: ${userJournal.entry}`
    );
    // if user confirms, replace selected journal entry with userJournal
    if (confirmation) journalEntries[idx] = userJournal;
  } else {
    alert(
      "You don't have any journal entries yet! Try adding some before attempting to edit an entry."
    );
  }
};

const createJournalEntries = () => {
  const journalContainer = document.querySelector("#journal");
  journalContainer.innerHTML = "";
  for (const journal of journalEntries) {
    let entryContainer = document.createElement("div");
    let entryList = document.createElement("ul");
    let journalDate = document.createElement("li");
    let journalConfidence = document.createElement("li");
    let journalContent = document.createElement("li");

    journalDate.textContent = `Date: ${journal.creationDate}`;
    journalConfidence.textContent = `Confidence Level: ${journal.confidence}`;
    journalContent.textContent = `Journal Content: ${journal.entry}`;

    entryContainer.classList.add("journal-entry");
    journalDate.classList.add("capitalize");
    journalConfidence.classList.add("capitalize");

    entryList.append(journalDate, journalConfidence, journalContent);
    entryContainer.append(entryList);
    journalContainer.append(entryContainer);
  }
};

const logJournalEntries = () => {
  for (const journal of journalEntries) {
    console.log(
      `Date: ${journal.creationDate}\nConfidence Level: ${journal.confidence}\nJournal Contents: ${journal.entry}`
    );
  }
};

const journalProcess = () => {
  addJournalEntry();
  logJournalEntries();
  createJournalEntries();
};

const editJournalProcess = () => {
  editJournalEntry();
  logJournalEntries();
  createJournalEntries();
};

const journalButton = document.querySelector("#add");
const editJournalButton = document.querySelector("#edit");
journalButton.addEventListener("click", journalProcess);
editJournalButton.addEventListener("click", editJournalProcess);
