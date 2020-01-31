/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

   /* remove class 'active' from all article links  */


    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages(){
  titleList.innerHTML = '';
  clearMessages();
  }

  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  for (let activeArticle of Articles) {
    activeArticle.classList.remove('active');

  /* get the article id */
  const articleId = activeArticle.getAttribute('id');

  /* find the title element */
  const articleTitle = activeArticle.querySelector(optTitleSelector).innerHTML;

  /* create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

  /* insert link into titleList */
  html = html + linkHTML;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
  }

  titleList.innerHTML = html;
}
generateTitleLinks();
