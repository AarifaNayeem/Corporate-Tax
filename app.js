document.getElementById("questionnaire").addEventListener("submit", function (e) {
    e.preventDefault();

    let result = document.getElementById("result");

    // Collecting values from the questionnaire
    let q1 = document.querySelector('input[name="q1"]:checked').value;
    let q2 = document.querySelector('select[name="q2"]').value;
    let q3 = document.querySelector('input[name="q3"]:checked').value;
    let q4 = document.querySelector('select[name="q4"]').value;
    let q5 = document.querySelector('input[name="q5"]:checked').value;
    let q6 = document.querySelector('input[name="q6"]:checked').value;
    let q7 = document.querySelector('input[name="q7"]:checked').value;
    let q8 = document.querySelector('input[name="q8"]:checked').value;
    let q9 = document.querySelector('input[name="q9"]:checked').value;
    let q10 = document.querySelector('input[name="q10"]:checked').value;

    // Checking the eligibility logic
    if (q1 === "Yes" && q2 === "qualifying" && q3 === "Yes" &&
        q4 !== "less50" && q5 !== "more5" && q6 === "Yes" &&
        q7 !== "No" && q8 === "Yes" && q9 === "Yes" && q10 === "No") {
        
        result.innerHTML = "You are eligible for the 0% corporate tax rate!";
        result.style.color = "green";
    } else {
        result.innerHTML = "Unfortunately, you do not qualify for the 0% corporate tax rate.";
        result.style.color = "red";
    }
});
