async function login() {
    const email = document.forms["loginForm"]["email"].value;
    const password = document.forms["loginForm"]["password"].value;
    const response = await fetch("http://localhost:4000/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const result = await response.json();
    console.log(result)
    if (result.message == "An error occurred") alert("The field  is not correct")
    else {
        localStorage.setItem("user", JSON.stringify(result))
        window.location.href = "index.html"
    }
}

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}