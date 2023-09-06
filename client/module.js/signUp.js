// Simple form validation using JavaScript
async function validateForm() {
    const name = document.forms["signupForm"]["name"].value;
    const email = document.forms["signupForm"]["email"].value;
    const password = document.forms["signupForm"]["password"].value;
    const password2 = document.forms["signupForm"]["confrimPassword"].value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    }

    if (email == "") {
        alert("Email must be filled out");
        return false;
    }

    if (password == "") {
        alert("Password must be filled out");
        return false;
    }

    if (password != password2) {
        alert("The password do not match.")
        return false
    }
    const response = await fetch("http://localhost:4000/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    const result = await response.json();
    console.log(result)
    window.location.href = "login.html"
}

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}