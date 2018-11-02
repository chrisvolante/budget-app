// Exports module to be used in other files.
window.HTTP_MODULE = {
  signupUser,
  loginUser,
  createTransaction
};

function signupUser(options) {
  const { userData, onSuccess, onError } = options;
  $.ajax({
    type: 'POST',
    url: '/users/',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
          onError(err);
      }
    }
  });
};

function loginUser(options) {
  const { userData, onSuccess, onError } = options;
  $.ajax({
    type: 'POST',
    url: '/auth/login',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

// function getUserNotes(options) {
//   const { jwtToken, onSuccess, onError } = options;
//   $.ajax({
//       type: 'GET',
//       url: '/api/note',
//       contentType: 'application/json',
//       dataType: 'json',
//       data: undefined,
//       beforeSend: function (xhr) {
//           xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
//       },
//       success: onSuccess,
//       error: err => {
//           console.error(err);
//           if (onError) {
//               onError(err);
//           }
//       }
//   });
// }

// function getNoteById(options) {
//   const { noteId, onSuccess } = options;
//   $.getJSON(`/api/note/${noteId}`, onSuccess);
// }

function createTransaction(options) {
  const { jwtToken, newTransaction, onSuccess, onError } = options;

  $.ajax({
    type: 'POST',
    url: '/transactions',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newTransaction),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
          onError();
      }
    }
  });
};