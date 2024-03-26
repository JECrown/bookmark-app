const bookmarkBtn = document.querySelector('#bookmarkBtn');
const bookmarkList = document.querySelector('.bookmarks');

bookmarkBtn.addEventListener('click', addBookmark);

document.addEventListener('DOMContentLoaded', getBookMarks);

function getBookMarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks){
        bookmarks = [];
    }

    bookmarks.forEach(bookmark => {
        const markup = `<div class="bookmark-card">
        <p>
            ${bookmark.text} <span id="bookmarkId">${bookmark.id}</span>
        </p>
        <p id="date">
            Added On: ${bookmark.date}
        </p>
            <a href="${bookmark.url}" class="btn btn-primary" target="_blank" id="viewBookmark">View</a>
            <a href="#" class="btn btn-danger" target="_blank" id="deleteBookmark">Delete</a>
        </div>`;

        bookmarkList.insertAdjacentHTML('afterbegin', markup);
    });

}

function addBookmark(){
    const text = document.querySelector('#textField').value;
    const url = document.querySelector('#urlField').value;
    const date = new Date(Date.now()).toString().substring(0, 24);

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let id;

    if(!bookmarks || bookmarks.length === 0){
        bookmarks = [];
        id = 0;
    } else {
        id = parseInt(bookmarks[bookmarks.length - 1].id) + 1;
    }

    let bookmark = {
        "id" : id,
        "text": text,
        "url": url,
        "date": date
    };

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    const markup = `<div class="bookmark-card">
    <p>
        ${text} <span id="bookmarkId">${id}</span>
    </p>
    <p id="date">
        Added On: ${date}
    </p>
        <a href="${url}" class="btn btn-primary" target="_blank" id="viewBookmark">View</a>
        <a href="#" class="btn btn-danger" target="_blank" id="deleteBookmark">Delete</a>
    </div>`;

    bookmarkList.insertAdjacentHTML('afterbegin', markup);

}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
});

document.addEventListener('click', e => {

    e.preventDefault();

    if(e.target.matches('#deleteBookmark')){
        let id = document.querySelector('#bookmarkId').textContent;
        e.target.parentElement.remove();

        removeBookmark(id);

        // console.log(id);
    }

});

function removeBookmark(id){

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks){
        bookmarks = [];
    }
    
    bookmarks.forEach( (bookmark, index) => {
        if( bookmark.id === parseInt(id) ){
            bookmarks.splice(index, 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}