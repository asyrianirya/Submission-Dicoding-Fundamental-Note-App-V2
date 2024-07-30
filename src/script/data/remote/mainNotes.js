import Swal from 'sweetalert2';
const baseUrl = 'https://notes-api.dicoding.dev/v2';

const getNotes = () => {
  return fetch(`${baseUrl}/notes`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        throw new Error(responseJson.error);
      } else {
        return responseJson.data;
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const getArchivedNotes = () => {
  return fetch(`${baseUrl}/notes/archived`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        throw new Error(responseJson.error);
      } else {
        return responseJson.data;
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const insertNote = async (note) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();
    showResponseMessage(responseJson.message, 'Success!', 'success');
    getNotes();
  } catch (error) {
    showResponseMessage(error);
  }
};

const removeNote = (noteId) => {
  return fetch(`${baseUrl}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'X-Auth-Token': '12345',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message, 'Success!', 'success');
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const archiveNote = (noteId) => {
  return fetch(`${baseUrl}/notes/${noteId}/archive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': '12345',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message, 'Success!', 'success');
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const unArchiveNote = (noteId) => {
  return fetch(`${baseUrl}/notes/${noteId}/unarchive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': '12345',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message, 'Success!', 'success');
      getNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const showResponseMessage = (
  message = 'Check your internet connection',
  title = 'Error!',
  type = 'error',
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'OK',
  });
};

const mainNotes = () => {
  return {
    getNotes,
    insertNote,
    removeNote,
    archiveNote,
    getArchivedNotes,
    unArchiveNote,
  };
};

export default mainNotes;
