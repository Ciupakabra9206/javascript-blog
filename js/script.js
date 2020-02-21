
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
  optCloudClassPrefix = 'tag-size-.';


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
    console.log(tag + ' is used ' + tags[tag] + ' times');
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

  optCloudClassPrefix + classNumber;
}
function generateTags(){
  
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  
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
      const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  /* END LOOP: for every article;: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';
  console.log(allTagsHTML);


  for(let tag in allTags){
    allTagsHTML += `<li><a href="#tag-${tag}">${tag} (${allTags[tag]})</a></li>`;
  }

  const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
  console.log('tagLinkHTML:', tagLinkHTML);
  
  
  allTagsHTML += tagLinkHTML;
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