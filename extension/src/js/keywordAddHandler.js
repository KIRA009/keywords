let keywordsList = [];
let keywordTemplate = document.querySelector('#keyword-template');
let input = document.getElementById('keyword');
let keywords = document.getElementById('keywords');
let submitBtn = document.querySelector('#form button');
let url = document.getElementById('url');
let init = false;

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

const addKeywordToPage = (keyword) => {
    let clone = keywordTemplate.content.cloneNode(true);
    clone.querySelector('.word').textContent = keyword;
    clone.querySelector('.close').onclick = (e) => delKeyWord(keyword);
    keywords.appendChild(clone);
    input.value = '';
};

const initScript = () => {
    if (!init) {
        submitBtn.onclick = (evt) => addKeywordUrlPairToStorage(evt);
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            url.value = tabs[0].url;
        });
        init = true;
    }
};

export const addKeyword = (evt) => {
    initScript();
    if (evt.keyCode === 13 && input.value !== '') keywordsList.add(input.value);
};

const delKeyWord = (word) => {
    keywordsList.del(word);
};

const addKeywordUrlPairToStorage = () => {
    let urlValue = url.value;
    chrome.storage.sync.get(['pairs'], (res) => {
        let pairs = res.pairs;
        for (let keyword of keywordsList) {
            if (keyword in pairs) {
                if (pairs[keyword].indexOf(urlValue) === -1) pairs[keyword].push(urlValue);
            } else pairs[keyword] = [urlValue];
        }
        chrome.storage.sync.set({pairs: pairs}, () => {
            keywordsList.empty();
            url.value = '';
            input.value = '';
            console.log(pairs);
        });
    });
};

initScript();
