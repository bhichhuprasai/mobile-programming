function calculate(operation) {

    let num1 = Number(document.getElementById("s1").value);

    let num2 = Number(document.getElementById("s2").value);

    let result = document.getElementById("result");

    let answer;

    result.style.color = "black";

    if (operation === "add") {

        answer = num1 + num2;

    }

    else if (operation === "subtract") {

        answer = num1 - num2;

    }

    else if (operation === "multiply") {

        answer = num1 * num2;

    }

    else if (operation === "divide") {

        if (num2 === 0) {

            result.style.color = "red";

            answer = "Cannot divide by zero";

        }

        else {

            answer = num1 / num2;

        }
    }

    result.innerHTML = "Result: " + answer;
}