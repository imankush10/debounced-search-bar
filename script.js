const userCardTemplate = document.querySelector("[data-user-card]");
const searchInput = document.querySelector("[data-search]");

let users = [];

async function dataFetch(url) {
  const res = await fetch(url);
  const data = await res.json();

  data.forEach((data) => {
    const html = `<div class="card">
            <div class="header" data-header="${data.name}">${data.name}</div>
            <div class="body" data-body="${data.name}">${data.email}</div>
            </div>`;
    users.push({
      name: data.name,
      email: data.email,
    });
    document
      .querySelector(".user-cards")
      .insertAdjacentHTML("afterbegin", html);
  });
}

dataFetch("https://jsonplaceholder.typicode.com/users");

let timeout;
function debouncedFunctionCaller(value) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    searchingFunction(value);
  },1000);
}

function searchingFunction(value){
  console.log("Searches now");
  users.forEach((user) => {
    const card = document.querySelector(
      `.header[data-header="${user.name}"`
    ).parentNode;

    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);

    card.classList.toggle("hidden", !isVisible);
  });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  debouncedFunctionCaller(value);
});
