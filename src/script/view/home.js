import Utils from '../components/utils.js';
import { mainNotes } from '../data-index.js';

let previousData;
let isFirstFetch = true;

const home = (showLoading = 0, isArchived = false) => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteQueryWaitingElement = document.querySelector('query-waiting');
  const noteListElement = noteListContainerElement.querySelector('note-list');
  const titleBar = document.querySelector('title-bar');

  const notesModule = mainNotes();

  const fetchNotes = async () => {
    try {
      if (isFirstFetch || showLoading) {
        showQueryWaiting();
      }
      let result;
      if (isArchived) {
        result = await notesModule.getArchivedNotes();
        titleBar.setAttribute(
          'title',
          `${Utils.getSettings('language', 'appTitleArchived')}`,
        );
        titleBar.setAttribute('isArchive', true);
      } else {
        result = await notesModule.getNotes();
        titleBar.setAttribute(
          'title',
          `${Utils.getSettings('language', 'appTitle')}`,
        );
        titleBar.setAttribute('isArchive', false);
      }
      previousData = result;
      displayResult(result);

      if (isFirstFetch || showLoading) {
        if (isFirstFetch) {
          window.setTimeout(showNoteList(), showLoading);
        } else {
          showNoteList();
        }
        isFirstFetch = false;
      }
    } catch (error) {
      console.error('Error displaying notes:', error);
      if (isFirstFetch || showLoading) {
        showNoteList();
        isFirstFetch = false;
      }
    }
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };

  const displayResult = async (notes) => {
    const blankNote = {};
    let noteItemElements = [];
    if (Array.isArray(notes)) {
      const notesWBlank = [...notes, blankNote];
      noteItemElements = notesWBlank.map((note) => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        return noteItemElement;
      });
    } else {
      console.error('Expected an array but got:', notes);
      return blankNote;
    }

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  fetchNotes();
};

export default home;
