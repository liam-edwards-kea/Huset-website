window.addEventListener("DOMContentLoaded", init);

function init() {
    getSearchData();
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)


    if (search) {
        console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSingleBand();
    } else {
        //console.log("NOT searching")
        getFrontpageData();
    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")

    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getFrontpageData() {
    //console.log("getData")

    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed")
        .then(res => res.json())
        .then(handleData)
}

function getSingleBand() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id)


    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music/" + id)
        .then(res => res.json())
        .then(showMusic)


    function showMusic(music) {
        console.log(music)
        document.querySelector("article h1").textContent = post.title.rendered
    }
}

function handleData(myData) {
    //Loop it
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)
    //Clone it
    const template = document.querySelector(".musicTemplate").content;
    const postCopy = template.cloneNode(true);
    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.title.rendered;
    const h2 = postCopy.querySelector("h2");
    h2.innerHTML = post.content.rendered;
    const imgPath = post.poster.guid;
    const img = postCopy.querySelector("img.cover");
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster of the movie " + post.title.rendered)
    const p1 = postCopy.querySelector("p1");
    p1.innerHTML = post.event_date
    const p2 = postCopy.querySelector("p2");
    p2.innerHTML = post.price
    const p3 = postCopy.querySelector("p3");
    p3.innerHTML = post.presale_price
    const p4 = postCopy.querySelector("p4");
    p4.innerHTML = post.door_opens
    //Append it
    document.querySelector("#music").appendChild(postCopy)
}
