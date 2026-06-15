import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    push, 
    update 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA0mbmLEkTO8Hdc0t6ZzZjsycrjBGjE3Ew",
  authDomain: "mobile-program-4ae69.firebaseapp.com",
  databaseURL: "https://mobile-program-4ae69-default-rtdb.firebaseio.com",
  projectId: "mobile-program-4ae69",
  storageBucket: "mobile-program-4ae69.firebasestorage.app",
  messagingSenderId: "536089823127",
  appId: "1:536089823127:web:4a30390926c718115426d2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let currentKey = null;

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', saveData);
    document.getElementById('updateBtn').addEventListener('click', updateData);
    document.getElementById('editBtn').addEventListener('click', editData);
});

// Save Data
async function saveData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !contact || !message) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const newRef = push(ref(db, 'contacts'));
        await set(newRef, {
            name,
            email,
            contact,
            message,
            timestamp: Date.now()
        });

        currentKey = newRef.key;
        updateDisplay(name, email, contact, message);
        
        alert("✅ Data saved successfully!");
        console.log("Saved with key:", currentKey);
        
    } catch (error) {
        console.error("Save Error:", error);
        alert("Error saving data! Check console (F12)");
    }
}

function updateDisplay(name, email, contact, message) {
    document.getElementById("dName").textContent = name;
    document.getElementById("dEmail").textContent = email;
    document.getElementById("dContact").textContent = contact;
    document.getElementById("dMessage").textContent = message;
}

// Edit Data
function editData() {
    document.getElementById("name").value = document.getElementById("dName").textContent;
    document.getElementById("email").value = document.getElementById("dEmail").textContent;
    document.getElementById("contact").value = document.getElementById("dContact").textContent;
    document.getElementById("message").value = document.getElementById("dMessage").textContent;
}

// Update Data
async function updateData() {
    if (!currentKey) {
        alert("Please save data first!");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !contact || !message) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const contactRef = ref(db, 'contacts/' + currentKey);
        await update(contactRef, { name, email, contact, message });

        updateDisplay(name, email, contact, message);
        alert("✅ Data updated successfully!");
        
    } catch (error) {
        console.error("Update Error:", error);
        alert("Error updating data! Check console (F12)");
    }
}