import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mobile-program-4ae69.firebaseapp.com",
  databaseURL: "https://mobile-program-4ae69-default-rtdb.firebaseio.com/",
  projectId: "mobile-program-4ae69",
  storageBucket: "mobile-program-4ae69.firebasestorage.app",
  messagingSenderId: "536089823127",
  appId: "1:536089823127:web:4a30390926c718115426d2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

set(ref(db, 'students/1'), {
  firstName: "Bhichhu",
  lastName: "Prasai",
  age: 21,
  gender: "Female",
  email: "pbhichhu@gmail.com",
  phone: 9876543210,
  address: "Kathmandu",
  course: "Mobile Programming",
  semester: 7,
  enrollmentYear: 2022
})
.then(() => {
  console.log("Data saved successfully!");
})
.catch((error) => {
  console.error("Error saving data:", error);
});