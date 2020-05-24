const random = `-123456`;

const addSearchBar = () => {
    let template = document.createElement('div');
    template.id = 'search-bar-template';
    let closeBtn = document.createElement('span');
    closeBtn.id = `search-bar-close${random}`;
    closeBtn.textContent = 'x';
    template.appendChild(closeBtn);
    let input = document.createElement('input');
    input.placeholder = 'Search keyword...';
    input.id = `search-bar${random}`;
    template.appendChild(input);
    let list = document.createElement('div');
    list.id = `search-keywords${random}`;
    template.appendChild(list);
    document.body.appendChild(template);
};

const draw = (keywords) => {
    let container = document.getElementById(`search-keywords${random}`);
    container.innerHTML = '';
    if (keywords.length === 0) container.innerHTML = 'No keywords found';
    for (let keyword of keywords) {
        container.innerHTML += `
        <div class="keyword btn btn-primary">
            <span class="word">${keyword}</span>
        </div>
        `;
    }
};

let debounce = null;

const getSuggestions = (evt) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        let value = evt.target.value;
        chrome.storage.sync.get(['pairs'], (res) => {
            let keywords = Object.keys(res.pairs);
            draw(keywords.filter((keyword) => keyword.includes(value)));
        });
    }, 300);
};

const toggle = (evt) => {
    if (evt) {
        if (evt.ctrlKey && evt.shiftKey && evt.key === 'F') {
            document.getElementById('search-bar-template').style.display = 'block';
            document.body.removeEventListener('keyup', (evt) => toggle(evt));
        }
    } else {
        document.getElementById('search-bar-template').style.display = 'none';
        document.getElementById(`search-bar-close${random}`).addEventListener('click', () => toggle(false));
    }
};
addSearchBar();
document.body.addEventListener('keyup', (evt) => toggle(evt));
document.getElementById(`search-bar-close${random}`).addEventListener('click', () => toggle(false));
document.getElementById(`search-bar${random}`).addEventListener('keyup', getSuggestions);
