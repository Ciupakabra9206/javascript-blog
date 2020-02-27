
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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector ='.list.authors',
  optCloudClassAuthorPrefix = 'author-size-';



function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  for (let activeArticle of articles) {

    const articleId = activeArticle.getAttribute('id');

    const articleTitle = activeArticle.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    html = html + linkHTML;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
  }

  titleList.innerHTML = html;
}
generateTitleLinks();

function calculateTagsParams(tags){

  const params = {max: 0, min: 999999};
  
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  
  let allTags = {};
  
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const wrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){

      const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      html = html + linkHTML;

      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    wrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  for(let tag in allTags){
    allTagsHTML += `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
  }

  tagList.innerHTML = allTagsHTML;
   

}

generateTags();


function tagClickHandler(event){
 
  event.preventDefault();

  const clickedElement = this;

  const href =  clickedElement.getAttribute('href');

  const tag = href.replace('#', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  } 

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const links = document.querySelectorAll('.post-tags a');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function calculateAuthorsParams(authors){

  const params = {max: 0, min: 999999};
  
  for(let author in authors){
    if(authors[author] > params.max){
      params.max = authors[author];
    } else if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorsClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassAuthorPrefix + classNumber;
}

function generateAuthors(){

  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const wrapper = article.querySelector(optArticleAuthorSelector);
    
    let html = '';

    const author = article.getAttribute('data-author');
    console.log(author);
    const authorHTML = '<p><a href="#' + allAuthors + '"><span>' + author + '</span></a></p>';
    html = html + authorHTML;

    if(!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    
    wrapper.innerHTML = html;
  }
  const authorsList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);

  let allAuthorsHTML = '';

  for(let author in allAuthors){
    allAuthorsHTML += `<li><a class="${calculateAuthorsClass(allAuthors[author], authorsParams)}" href="#author-${author}">${author}</a></li>`;
  }

  authorsList.innerHTML = allAuthorsHTML;
  
}
generateAuthors();

function authorClickHandler(event){
 
  event.preventDefault();

  const clickedElement = this;

  const href =  clickedElement.getAttribute('href');

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

