/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  event.preventDefault();

  const clickedElement = this;

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);
  
  targetArticle.classList.add('active');

};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  for (let activeArticle of articles) {
    //activeArticle.classList.remove('active');

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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
      const linksHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linksHTML;

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  /* END LOOP: for every article;: */
  }
}
generateTags();

function tagClickHandler(event){
 
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href =  clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
  /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  } 
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let link of links) {
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const wrapper = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const author = article.getAttribute('data-author');

    const authorHTML = '<p><a href="#' + author + '"><span>' + author + '</span></a></p>';
    
    html = html + authorHTML;
    
    wrapper.innerHTML = html;

  }
}
generateAuthors();

function authorClickHandler(event){
 
  event.preventDefault();

  const clickedElement = this;

  const href =  clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {

    activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {

    authorLink.classList.add('active');
  } 
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors(){

  const links = document.querySelectorAll('.post-author a');

  for (let link of links) {

    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

