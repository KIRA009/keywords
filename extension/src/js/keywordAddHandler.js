let keywordsList = [];
let keywordTemplate = document.querySelector('#keyword-template');
let input = document.getElementById('keyword');
let keywords = document.getElementById('keywords');
let submitBtn = document.querySelector('#form button');
let url = document.getElementById('url');
chrome.storage.sync.set({pairs: {}}, () => {});

keywordsList.__proto__.add = (el) => {
    keywordsList.push(el);
    addKeywordToPage(el);
};

keywordsList.__proto__.contains = (el) => keywordsList.indexOf(el) !== -1;

keywordsList.__proto__.del = (el) => {
    let index = keywordsList.indexOf(el);
    if (index === -1) return;
    keywordsList.splice(index, 1);
    let allKeywords = Array.from(document.querySelectorAll('.keyword'));
    allKeywords.slice(index).forEach((el) => el.remove());
    keywordsList.slice(index).forEach((el) => addKeywordToPage(el));
};

keywordsList.__proto__.empty = () => {
    keywordsList = keywordsList.slice(keywordsList.length);
    keywords.innerHTML = '';
};

url.value = window.location.href;
submitBtn.onclick = (evt) => addKeywordUrlPairToStorage(evt);

const addKeywordToPage = (keyword) => {
    let clone = keywordTemplate.content.cloneNode(true);
    clone.querySelector('.word').textContent = keyword;
    clone.querySelector('.close').onclick = (e) => delKeyWord(keyword);
    keywords.appendChild(clone);
    input.value = '';
};

export const addKeyword = (evt) => {
    if (evt.keyCode === 13 && input.value !== '') keywordsList.add(input.value);
};

const delKeyWord = (word) => {
    keywordsList.del(word);
};

const addKeywordUrlPairToStorage = (evt) => {
    evt.preventDefault();
    let urlValue = url.value;
    chrome.storage.sync.get(['pairs'], (res) => {
        let pairs = res.pairs;
        for (let keyword of keywordsList) {
            if (keyword in pairs) pairs[keyword].push(urlValue);
            else pairs[keyword] = [urlValue];
        }
        chrome.storage.sync.set({pairs: pairs}, () => {
            keywordsList.empty();
            url.value = '';
            input.value = '';
        });
    });
};
