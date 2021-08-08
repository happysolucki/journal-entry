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
      idx = prompt(
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

const isRequired = (value) => value === '' ? false : true;
const isValid = (value) => ["EASY","MEDIUM","HARD"].includes(value.toUpperCase());
const isBetween = (num, min, max) => num - 1 < min || num > max ? false : true;

// const addJournalEntryForm = (e) => {
//   e.preventDefault();
// 
//   const validConfidence = ["EASY", "MEDIUM", "HARD"];
//   const date = e.target.date.value.trim();
//   const confidence = e.target.confidence.value.trim();
//   const contents = e.target.content.value.trim();
// 
// }

const dateAddEl = document.querySelector('#add-date');
const confidenceAddEl = document.querySelector('#add-confidence');
const contentsAddEl = document.querySelector('#add-content');
const indexEditEl = document.querySelector('#edit-index');
const dateEditEl = document.querySelector('#edit-date');
const confidenceEditEl = document.querySelector('#edit-confidence');
const contentsEditEl = document.querySelector('#edit-content');

const checkDate = (el) => {
  let valid = false;
  const date = el.value.trim();
  if (!isRequired(date)) {
    showError(el, 'Date cannot be blank.')
  } else {
    showSuccess(el);
    valid = true
  }
  return valid;
}

const checkConfidence = (el) => {
  let valid = false;
  const confidence = el.value.trim();
  if (!isValid(confidence)) {
    showError(el, 'Choose easy, medium, or hard.')
  } else {
    showSuccess(el);
    valid = true
  }
  return valid;
}

const checkContents = (el) => {
  let valid = false;
  const contents = el.value.trim();
  if (!isRequired(contents)) {
    showError(el, 'Contents cannot be blank.')
  } else {
    showSuccess(el);
    valid = true;
  }
  return valid;
}

const checkIndex = () => {
  let valid = false;
  const index = indexEditEl.value.trim();
  if(!isBetween(parseInt(index), 0, journalEntries.length)) {
    showError(indexEditEl, 'Index is out of range');
  } else {
    showSuccess(indexEditEl);
    valid = true;
  }
  return valid;
}

const showError = (input, message) => {
  const formField = input.parentElement;

  input.classList.remove('success');
  input.classList.add('error')

  const error = formField.querySelector('small');
  error.textContent = message;
}

const showSuccess = (input) => {
  const formField = input.parentElement;

  input.classList.remove('error');
  input.classList.add('success');

  const error = formField.querySelector('small');
  error.textContent = '';
}

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

// const journalProcess = () => {
//   addJournalEntry();
//   logJournalEntries();
//   createJournalEntries();
// };
// 
// const editJournalProcess = () => {
//   editJournalEntry();
//   logJournalEntries();
//   createJournalEntries();
// };

const journalButton = document.querySelector("#add");
const addFormContainer = document.querySelector("#add-form");
const editJournalButton = document.querySelector("#edit");
const editFormContainer = document.querySelector("#edit-form");
journalButton.addEventListener("click", (e) => {
  addFormContainer.classList.remove('hide');
});
editJournalButton.addEventListener("click", (e) => {
  editFormContainer.classList.remove('hide');
});

const addForm = document.querySelector('#add-entry');
addForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isDateValid = checkDate(dateAddEl);
  let isConfidenceValid = checkConfidence(confidenceAddEl);
  let isContentValid = checkContents(contentsAddEl);

  let isFormValid = isDateValid && isConfidenceValid && isContentValid;

  if (isFormValid) {
    let userJournal = new JournalEntry(dateAddEl.value.trim(), confidenceAddEl.value.trim(), contentsAddEl.value.trim());
    addFormContainer.classList.add('hide');
    journalEntries.push(userJournal);
    createJournalEntries();
    logJournalEntries();
  }
});

const editForm = document.querySelector('#edit-entry');
editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isIndexValid = checkIndex();
  let isDateValid = checkDate(dateEditEl);
  let isConfidenceValid = checkConfidence(confidenceEditEl);
  let isContentValid = checkContents(contentsEditEl);

  let isFormValid = isIndexValid && isDateValid && isConfidenceValid && isContentValid;

  if (isFormValid) {
    let userJournal = new JournalEntry(dateEditEl.value.trim(), confidenceEditEl.value.trim(), contentsEditEl.value.trim());
    editFormContainer.classList.add('hide');
    journalEntries[parseInt(indexEditEl.value.trim()) - 1] = userJournal;
    createJournalEntries();
    logJournalEntries();
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return(...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay);
  }
}

addForm.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'add-date':
      checkDate(dateAddEl);
      break;
    case 'add-confidence':
      checkConfidence(confidenceAddEl);
      break;
    case 'add-content':
      checkContents(contentsAddEl);
      break
  }
}));

editForm.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'edit-index':
      checkIndex();
      break;
    case 'edit-date':
      checkDate(dateEditEl);
      break;
    case 'edit-confidence':
      checkConfidence(confidenceEditEl);
      break;
    case 'edit-content':
      checkContents(contentsEditEl);
      break
  }
}));
