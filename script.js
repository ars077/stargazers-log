const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

const formatDate = (date) => new Intl.DateTimeFormat("en", {
  dateStyle: "medium"
}).format(new Date(`${date}T00:00:00`));

const createRepositoryElement = (repository) => {
  const article = document.createElement("article");
  article.className = "repository";
  article.innerHTML = `
    <div>
      <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repo}</a></h3>
      <p class="repository-description">${repository.description}</p>
      <p class="repository-meta">
        <span class="language">${repository.language}</span>
        <span>${repository.stars.toLocaleString()} stars</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </p>
    </div>
  `;
  return article;
};

const renderRepositories = (repositories) => {
  repositoryCount.textContent = `${repositories.length} repositories`;
  repositoryList.replaceChildren(...repositories.map(createRepositoryElement));
};

const showError = () => {
  repositoryCount.textContent = "";
  repositoryList.innerHTML = '<p class="status">The repository list could not be loaded.</p>';
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load events.json: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);