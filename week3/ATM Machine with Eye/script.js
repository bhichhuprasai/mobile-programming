let balance = 10000;
let correctPin = "1234";
let balanceVisible = true;

// SHOW/HIDE BALANCE (Eye icon)
$("#eyeIcon").click(function () {

    if (balanceVisible) {

        $("#balanceText").text("Balance: ******");
        $("#eyeIcon").removeClass("fa-eye").addClass("fa-eye-slash");
        balanceVisible = false;

    } else {

        $("#balanceText").text("Balance: Rs. " + balance);
        $("#eyeIcon").removeClass("fa-eye-slash").addClass("fa-eye");
        balanceVisible = true;
    }
});

// SHOW INPUT ON BUTTON CLICK
$("#withdrawBtn").click(function () {
    $("#amount").show();
    withdraw();
});

$("#depositBtn").click(function () {
    $("#amount").show();
    deposit();
});

// PIN CHECK
function verifyPin() {
    let pin = prompt("Enter your PIN:");

    if (pin === correctPin) {
        return true;
    } else {
        alert("Incorrect PIN!");
        return false;
    }
}

// WITHDRAW
function withdraw() {

    let amount = Number($("#amount").val());

    if (!verifyPin()) return;

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

    balance -= amount;

    updateBalance();

    alert("Withdraw Successful");
}

// DEPOSIT
function deposit() {

    let amount = Number($("#amount").val());

    if (!verifyPin()) return;

    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount % 100 !== 0) {
        alert("Amount must be multiple of 100");
        return;
    }

    balance += amount;

    updateBalance();

    alert("Deposit Successful");
}

// UPDATE BALANCE
function updateBalance() {

    if (balanceVisible) {
        $("#balanceText").text("Balance: Rs. " + balance);
    } else {
        $("#balanceText").text("Balance: ******");
    }
}