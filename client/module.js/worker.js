async function addWorker() {
    let user = JSON.parse(localStorage.getItem("user"))
    const name = document.getElementById("name").value
    const salary = document.getElementById("salary").value
    let object = {
        name: name,
        salary: salary,
        token: user.token
    }
    const response = await fetch("http://localhost:4000/workers/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
    })
    const result = await response.json();
    console.log(result)
    getAllWorkers()
}


function addToTable(object) {
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
    <td>${object.name}</td>
    <td>${object.salary}</td>
  `;

    const tdRemove = document.createElement("td")
    const buttonRemove = document.createElement("button");
    buttonRemove.innerHTML = "Remove";
    buttonRemove.addEventListener("click", (e) => {
        removeFromCart(e, object)
    })
    tdRemove.appendChild(buttonRemove)
    cartRow.appendChild(tdRemove)

    const td = document.createElement("td")
    const buttonUpdate = document.createElement("button");
    buttonUpdate.innerHTML = "Edit";
    buttonUpdate.addEventListener("click", (e) => {
        updateFromCart(e, object)
    })
    td.appendChild(buttonUpdate)
    cartRow.appendChild(td)
    document.getElementById('cart-items').appendChild(cartRow);
}


async function removeFromCart(event, element) {
    let user = JSON.parse(localStorage.getItem("user"))
    const row = event.target.parentNode.parentNode;
    row.remove();
    await fetch(`http://localhost:4000/workers/delete/${element._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token })

    })
}

function updateFromCart(event, element) {
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(element)
    const row = event.target.parentNode.parentNode;
    const name = row.children[0];
    name.setAttribute("contenteditable", "true")
    const date = row.children[1];
    date.setAttribute("contenteditable", "true")
    const description = row.children[2];
    description.setAttribute("contenteditable", "true")
    const price = row.children[3];
    price.setAttribute("contenteditable", "true")
    event.target.innerHTML = "Update";
    if (event.target.textContent == "Update") {
        event.target.addEventListener("click", async () => {
            let object = {
                name: name.textContent,
                salary: date.textContent,
                token: user.token
            }
            console.log(object)
            const response = await fetch(`http://localhost:4000/workers/update/${element._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            })
            const result = await response.json();
            console.log(result)
            getAllWorkers()
        })
    }
}


async function getAllWorkers() {
    let user = JSON.parse(localStorage.getItem("user"))
    if (!user.admin) {
        document.getElementById('notAdmin').innerHTML = "You not an admin";
        return
    }
    document.getElementById('cart-items').innerHTML = ""
    const response = await fetch("http://localhost:4000/workers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: user.token,
        })
    });
    const result = await response.json()
    console.log(result)
    for (let worker of result) {
        addToTable(worker)
    }
}

window.addEventListener("load", () => {
    getAllWorkers()
})