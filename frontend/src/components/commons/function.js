let axios = require('axios');

function isEllipsisActive(element){
    return element.offsetWidth < element.scrollWidth;
}

function viewEllipsis(){
    console.log('viewEllipsis');
    Array.from(document.querySelectorAll('.ellipsis'))
    .forEach(element => {
        console.log(element);
        if (isEllipsisActive(element)) {
            element.title = element.innerText;
        }
    });
}

//Session
function _setSession(key, value){
    console.log(key, value);
    localStorage.setItem(key, value);
}

function _getSession(key){
    return localStorage.getItem(key);
}

//HTTP Client
async function _get(detail){
    let baseURL = `http://localhost:3000/api/${detail}`;

    let result = await axios.get(baseURL, {
        headers:{'Content-Type': 'application/json'}
    }) 

    return result;
}

async function _put(detail, body){
    let baseURL = `http://localhost:3000/api/${detail}`;

    let result = await axios.put(baseURL, {
        headers:{'Content-Type': 'application/json'},
        body
    }) 

    return result;
}

async function _delete(detail){
    let baseURL = `http://localhost:3000/api/${detail}`;

    let result = await axios.delete(baseURL, {
        headers:{'Content-Type': 'application/json'},
    }) 

    return result;
}

export { viewEllipsis, _get, _put, _delete, _setSession, _getSession }