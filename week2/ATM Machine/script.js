let balance = 10000;
let correctPin = "1234";

// PIN verification function using PROMPT
function verifyPin() {
    let pin = prompt("Enter your PIN:");

    if (pin === correctPin) {
        return true;
    } else {
        alert("Incorrect PIN!");
        return false;
    }
}

// WITHDRAW FUNCTION
function withdraw() {

    let amount = Number(document.getElementById("amount").value);

    // PIN check first
    if (!verifyPin()) return;

    // validation
    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount % 100 !== 0) {
        alert("Amount must be multiple of 100");
        return;
    }

    if (amount > balance) {
        alert("Insufficient Balance");
        return;
    }

    // process withdrawal
    balance = balance - amount;

    document.getElementById("balance").innerHTML =
        "Balance: Rs. " + balance;

    alert("Withdraw Successful");
}

// DEPOSIT FUNCTION
function deposit() {

    let amount = Number(document.getElementById("amount").value);

    // PIN check first
    if (!verifyPin()) return;

    // validation
    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount % 100 !== 0) {
        alert("Amount must be multiple of 100");
        return;
    }

    // process deposit
    balance = balance + amount;

    document.getElementById("balance").innerHTML =
        "Balance: Rs. " + balance;

    alert("Deposit Successful");
}