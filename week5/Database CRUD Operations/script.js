// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, set, get, ref, update, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDicfMu3pcz7BC-izW2kMZaiwWxU62rP5U",
  authDomain: "abiralproject-18a16.firebaseapp.com",
  projectId: "abiralproject-18a16",
  storageBucket: "abiralproject-18a16.firebasestorage.app",
  messagingSenderId: "85482426604",
  appId: "1:85482426604:web:b7a287efadee645647d5c9",
  measurementId: "G-DF8V6J4KJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- 1. WRITE/CREATE DATA ---
function writeUserData(userId, name, email, phone, age, gender, address, course, semester, github) {
  const usersRef = ref(db, 'users/' + userId);

  set(usersRef, {
    name: name,
    email: email,
    phone: phone,
    age: age,
    gender: gender,
    address: address,
    course: course,
    semester: semester,
    github: github
  })
  .then(() => {
    console.log("User added successfully with ID:", userId);
    alert("User written successfully!");
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });
}
window.writeUserData = writeUserData;

// --- 2. READ ALL DATA ---
function readUser(){
  const userRef = ref(db, 'users');
  get(userRef).then((snapshot) => {
    if(snapshot.exists()) {
      snapshot.forEach((childsnapshot) => {
        console.log(childsnapshot.key, childsnapshot.val());
      });
    }
  });
}
window.readUser = readUser;

// --- 3. READ SINGLE USER BY ID ---
function readUserById(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const user = snapshot.val();
      console.log("User found:", user);
      document.getElementById('read-result').textContent =
        `Name: ${user.name} | Email: ${user.email} | Phone: ${user.phone} | Age: ${user.age} | Gender: ${user.gender} | Address: ${user.address} | Course: ${user.course} | Sem: ${user.semester} | GitHub: ${user.github}`;
    } else {
      document.getElementById('read-result').textContent = "User not found!";
    }
  });
}
window.readUserById = readUserById;

// --- 4. FETCH FOR UPDATE ---
function fetchUserForUpdate(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const user = snapshot.val();
      document.getElementById('update-name').value = user.name || '';
      document.getElementById('update-email').value = user.email || '';
      document.getElementById('update-phone').value = user.phone || '';
      document.getElementById('update-age').value = user.age || '';
      document.getElementById('update-gender').value = user.gender || '';
      document.getElementById('update-address').value = user.address || '';
      document.getElementById('update-course').value = user.course || '';
      document.getElementById('update-semester').value = user.semester || '';
      document.getElementById('update-github').value = user.github || '';
      console.log("Loaded user into fields:", user);
    } else {
      alert("No user found with this ID");
    }
  });
}
window.fetchUserForUpdate = fetchUserForUpdate;

// --- 5. SUBMIT UPDATE DATA ---
function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
      alert("User updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
window.updateUserData = updateUserData;

// --- 6. DELETE USER ---
function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
      alert("User deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}
window.deleteUserData = deleteUserData;