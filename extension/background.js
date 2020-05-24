chrome.commands.onCommand.addListener((command) => {
    dispatch(command);
});

let dispatched = {
    toggle_search_bar: [],
};

chrome.storage.sync.set({pairs: {}}, () => {});
const dispatch = (cmd) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let tab = tabs[0];
        let jsfilename = '',
            cssfilename = '';
        switch (cmd) {
            case 'toggle_search_bar':
                if (dispatched[cmd].indexOf(tab.id) !== -1) {
                    return;
                }
                dispatched[cmd].push(tab.id);
                jsfilename = 'src/scripts/searchBar/index.js';
                cssfilename = 'src/scripts/searchBar/style.css';
                break;
        }
        chrome.tabs.executeScript(tab.id, {
            file: jsfilename,
        });
        chrome.tabs.insertCSS(tab.id, {
            file: cssfilename,
        });
    });
};
