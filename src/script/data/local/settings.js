const dataSettings = {
  colors: {
    fallbackDefaultNoteColor: '#FFFA99',
    defaultNoteColor: 'rgb(255,250,153)',
    additionNotes: 'lightgray',
    additionNotesHover: 'aqua',
    buttonColor: 'aqua',
    buttonColorHover: '#248EA8',
    negativeButton: '#77070B',
    negativeButtonHover: '#F3686D',
    secretActButtonColor: 'red',
    titleFallbackColor: 'aqua',
    titleColor:
      ' radial-gradient(circle, rgb(72,69,252) 0%, rgba(29,253,239) 79%, rgba(72,69,252) 100%);',
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
