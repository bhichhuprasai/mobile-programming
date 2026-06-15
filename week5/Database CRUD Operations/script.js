import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, set, get, ref, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// ✅ Your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA0mbmLEkTO8Hdc0t6ZzZjsycrjBGjE3Ew",
  authDomain: "mobile-program-4ae69.firebaseapp.com",
  databaseURL: "https://mobile-program-4ae69-default-rtdb.firebaseio.com",
  projectId: "mobile-program-4ae69",
  storageBucket: "mobile-program-4ae69.firebasestorage.app",
  messagingSenderId: "536089823127",
  appId: "1:536089823127:web:4a30390926c718115426d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- 1. CREATE / WRITE STUDENT DATA (10 Fields) ---
function writeStudentData(studentId, firstName, lastName, age, gender, email, phone, address, course, semester, enrollmentYear) {
  const studentRef = ref(db, 'students/' + studentId);

  set(studentRef, {
    firstName: firstName,
    lastName: lastName,
    age: parseInt(age) || 0,
    gender: gender,
    email: email,
    phone: parseInt(phone) || 0,
    address: address,
    course: course,
    semester: parseInt(semester) || 0,
    enrollmentYear: parseInt(enrollmentYear) || 0
  })
  .then(() => {
    console.log("Student added successfully with ID:", studentId);
    alert("✅ Student Record Saved Successfully!");
  })
  .catch((error) => {
    console.error("Error adding student:", error);
    alert("❌ Error: " + error.message);
  });
}
window.writeStudentData = writeStudentData;

// --- 2. READ ALL STUDENTS ---
function readAllStudents(){
  const studentsRef = ref(db, 'students');
  get(studentsRef).then((snapshot) => {
    if(snapshot.exists()) {
      snapshot.forEach((childsnapshot) => {
        console.log("Student ID:", childsnapshot.key, childsnapshot.val());
      });
      alert("Check your browser console to see all student records!");
    } else {
      console.log("No student data available.");
    }
  });
}
window.readAllStudents = readAllStudents;

// --- 3. READ ONE STUDENT BY ID ---
function readStudentById(studentId) {
  const studentRef = ref(db, 'students/' + studentId);
  get(studentRef).then((snapshot) => {
    if (snapshot.exists()) {
      const student = snapshot.val();
      document.getElementById('read-result').textContent =
        `Name: ${student.firstName} ${student.lastName} | Age: ${student.age} | Gender: ${student.gender} | Email: ${student.email} | Phone: ${student.phone} | Address: ${student.address} | Course: ${student.course} | Sem: ${student.semester} | Year: ${student.enrollmentYear}`;
    } else {
      document.getElementById('read-result').textContent = "❌ Student not found!";
    }
  });
}
window.readStudentById = readStudentById;

// --- 4. FETCH FOR UPDATE ---
function fetchStudentForUpdate(studentId) {
  const studentRef = ref(db, 'students/' + studentId);
  get(studentRef).then((snapshot) => {
    if (snapshot.exists()) {
      const student = snapshot.val();
      document.getElementById('update-firstName').value = student.firstName || '';
      document.getElementById('update-lastName').value = student.lastName || '';
      document.getElementById('update-age').value = student.age || '';
      document.getElementById('update-gender').value = student.gender || '';
      document.getElementById('update-email').value = student.email || '';
      document.getElementById('update-phone').value = student.phone || '';
      document.getElementById('update-address').value = student.address || '';
      document.getElementById('update-course').value = student.course || '';
      document.getElementById('update-semester').value = student.semester || '';
      document.getElementById('update-enrollmentYear').value = student.enrollmentYear || '';
      console.log("Loaded student profile into update forms:", student);
    } else {
      alert("❌ No student record found with this ID");
    }
  });
}
window.fetchStudentForUpdate = fetchStudentForUpdate;

// --- 5. SUBMIT UPDATE DATA ---
function updateStudentData(studentId, updatedData) {
  const studentRef = ref(db, 'students/' + studentId);
  update(studentRef, updatedData)
    .then(() => {
      alert("✅ Student Record Updated Successfully!");
    })
    .catch((error) => {
      console.error("Error updating student:", error);
    });
}
window.updateStudentData = updateStudentData;

// --- 6. DELETE STUDENT ---
function deleteStudentData(studentId) {
  const studentRef = ref(db, 'students/' + studentId);
  remove(studentRef)
    .then(() => {
      alert("✅ Student Record Deleted Permanently!");
    })
    .catch((error) => {
      console.error("Error deleting student:", error);
    });
}
window.deleteStudentData = deleteStudentData;