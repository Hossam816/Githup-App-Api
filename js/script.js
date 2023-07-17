const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getUser("hossam816");


async function getUser(userName) {
    const resp = await fetch(APIURL + userName);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(userName);


}

async function getRepos(userName) {
    const resp = await fetch(APIURL + userName + '/repos');
    const respData = await resp.json();

    console.log(respData)
    addReposToCard(respData);
}


function createUserCard(user){
    const cardHtml = `
        <div class="card"> 
            <div class="img-container"><img src="${user.avatar_url}" alt="${user.name}"></div>
            <div class="text-container">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li><i class="fa-solid fa-user-group"></i> ${user.followers} <strong>follower</strong></li>
                    <li><i class="fa-solid fa-user-group"></i> ${user.following} <strong>followeing</strong></li>
                    <li><i class="fa-solid fa-floppy-disk"></i> ${user.public_repos} <strong>repose</strong></li>
                </ul>
                <h4>Repos:</h4>

                <ul id="repos" class=""repos"></ul>

            </div>
        </div>
    `
    main.innerHTML = cardHtml;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);
        search.value = "";
    }


})