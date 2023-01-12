const firebaseConfig = {
  apiKey: "AIzaSyBjtpGxF9ihX5DY7FCFxTJOc6QTVNvc1b8",
  authDomain: "shibeprime-f4fd0.firebaseapp.com",
  databaseURL: "https://shibeprime-f4fd0-default-rtdb.firebaseio.com",
  projectId: "shibeprime-f4fd0",
  storageBucket: "shibeprime-f4fd0.appspot.com",
  messagingSenderId: "31986328863",
  appId: "1:31986328863:web:cb25dde398d29df667fc2a",
  measurementId: "G-746032TVEC"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var notesRef = database.ref("users");

notesRef.on("value", function(snapshot) {
  updatePage(snapshot.val());
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function updatePage(data) {
  var notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";
  var keys = Object.keys(data);
  keys.reverse(); // reverse the order of the keys
  for (var i = 0; i < keys.length; i++) {
    var note = data[keys[i]];
    var noteElem = document.createElement("div");
    noteElem.className = "note";
    var avatarElem = document.createElement("img");
    avatarElem.className = "av";
    avatarElem.src = note.user_avatar_url;
    var titleElem = document.createElement("h2");
    titleElem.innerHTML = note.user_name;
    var messageElem = document.createElement("p");
    messageElem.innerHTML = note.words;
    noteElem.appendChild(avatarElem);
    noteElem.appendChild(titleElem);
    noteElem.appendChild(messageElem);
    notesContainer.appendChild(noteElem);
  }
}

function deleteNote(key) {
  var noteRef = database.ref("users/" + key);
  noteRef.remove();
}
