const dataSettings = {
  colors: {
    fallbackDefaultNoteColor: '#FFFA99',
    defaultNoteColor: 'rgba(255,250,153,0.8)',
    additionNotes: 'lightgray',
    additionNotesHover: 'aqua',
    buttonColor: 'aqua',
    buttonColorHover: '#248EA8',
    negativeButton: '#77070B',
    negativeButtonHover: '#F3686D',
    secretActButtonColor: 'red',
    titleFallbackColor: 'aqua',
    titleColor:
      'radial-gradient(circle, rgb(76,252,69) 0%, rgb(253,29,29) 75%, rgb(131,58,180) 100%)',
    titleArchiveColor: '#096ff5',
  },
  fetchData: {
    boolDefaultAutoRefresh: false,
    intDefaultRefreshInterval: 3000,
  },
  language: {
    appTitle: 'Simple Notes',
    appTitleArchived: 'Simple Archived Notes',
  },
  commons: {
    secretActButtonDelay: 3000,
  },
};
class Settings {
  static getAll() {
    return dataSettings;
  }
}

export default Settings;
