const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUsers() {
  userList.innerHTML = "Loading users...";
  errorMsg.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(users => {
      userList.innerHTML = "";
      users.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user-card");

        div.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;

        userList.appendChild(div);
      });
    })
    .catch(error => {
      userList.innerHTML = "";
      errorMsg.textContent = "Failed to load users. Please check your connection.";
      console.error("Fetch error:", error);
    });
}

// Load users on page load
fetchUsers();

// Reload users on button click
reloadBtn.addEventListener("click", fetchUsers);
