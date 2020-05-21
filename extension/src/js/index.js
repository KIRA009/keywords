import {addKeyword} from './keywordAddHandler';

let input = document.getElementById('keyword');
input.onkeypress = (e) => addKeyword(e);
