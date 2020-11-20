import "./assets/styles/styles.scss";
import "./index.scss";


const articleContainerElement = document.querySelector(".articles-container");

const createArticles = articles => {
  const articlesDOM = articles.map(article => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
<div class="article-header">
<h2>${article.title}</h2>
<div class="header-author">
<img src="${article.img}" alt="profile"/>
<div class="description-author">
<p class="article-author">Auteur: ${article.author}</p>
<p class="article-author">${article.author} - ${new Date(
  article.createdAt
).toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric"
})}</p>
</div>
</div>
</div>
<div class="article-content">
<p>${article.content}</p>
</div>
<div class="article-actions">
  <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
  <button class="btn btn-primary" data-id=${article._id} >Modifier</button>
</div>
`;
    return articleDOM;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll('.btn-primary');
  // redirection en recuperant l'id de l'article dans l'url
  editButtons.forEach(button => {
    button.addEventListener('click', event => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${ articleId }`);
    });
  });
  deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(
          `https://restapi.fr/api/article/${articleId}`,
          {
            method: "DELETE"
          }
        );
        const body = await response.json();
        console.log(body);
        fetchArticle();
      } catch (e) {
        console.log("e : ", e);
      }
    });
  });
};

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    const articles = await response.json();
    createArticles(articles);
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchArticle();