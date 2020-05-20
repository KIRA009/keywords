let form = document.getElementById('form');
let input = document.getElementById('keyword');
let keywordTemplate = document.querySelector('#keyword-template');
let keywords = document.getElementById('keywords');

input.onkeypress = (e) => addKeyword(e);

form.onsubmit = addKeyword;

let keywordsList = [];

keywordsList.__proto__.add = (el) => {
    keywordsList.push(el);
    addKeywordToPage(el);
};

keywordsList.__proto__.del = (el) => {
    let index = keywordsList.indexOf(el);
    if (index === -1) return;
    keywordsList.splice(index, 1);
    let allKeywords = Array.from(document.querySelectorAll('.keyword'));
    allKeywords.slice(index).forEach((el) => el.remove());
    keywordsList.slice(index).forEach((el) => addKeywordToPage(el));
};

const addKeywordToPage = (keyword) => {
    let clone = keywordTemplate.content.cloneNode(true);
    clone.querySelector('.word').textContent = keyword;
    clone.querySelector('.close').onclick = (e) => keywordsList.del(keyword);
    keywords.appendChild(clone);
    input.value = '';
};

const addKeyword = (evt) => {
    if (evt.keyCode === 13) keywordsList.add(input.value);
};

keywordsList.add('example');
