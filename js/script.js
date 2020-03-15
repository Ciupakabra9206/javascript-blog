const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-tag-article-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-author-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)

};

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

    const linkHTMLData = {id: articleId, title: articleTitle};
    
    const linkHTML = templates.articleLink(linkHTMLData);

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

      const linkHTMLData = {dataTags: tag, tag: tag};

      const linkHTML = templates.articleTagLink(linkHTMLData);

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

  const allTagsData = {tags: []};

  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      className: calculateTagClass(allTags[tag], tagsParams)
    });  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  
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

  const links = Array.from(document.querySelectorAll('.post-tags a'));

  const sidebarLinks = Array.from(document.querySelectorAll('.list.tags a'));

  const allLinks = links.concat(sidebarLinks);


  for (let link of allLinks) {
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

    const linkHTMLData = {dataAuthors: allAuthors, author: author};
      
    const authorHTML = templates.articleAuthorLink(linkHTMLData);

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

  const allAuthorsData = {authors: []};
  console.log(allAuthorsData);
  for(let author in allAuthors){

    allAuthorsData.authors.push({
      author: author,
      className: calculateAuthorsClass(allAuthors[author], authorsParams)
    }); 
  }

  authorsList.innerHTML = templates.authorListLink(allAuthorsData);

  
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