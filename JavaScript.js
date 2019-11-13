window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id")

    if (search) {
        //console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSingleBand();
    } else {
        //console.log("NOT searching")
        getFrontpageData();
    }
    getNavigation()
}

function getNavigation() {
    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/genre?_embed")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    console.log(oneItem.name)
    //document.querySelector("nav").innerHTML += oneItem.name
    const link = document.createElement("a");
    link.textContent = oneItem.name;
    document.querySelector("nav").appendChild(link);

}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getSearchData")

    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getFrontpageData() {
    //console.log("getFrontpageData")

    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed")
        .then(res => res.json())
        .then(handleData)
}

function getSingleBand() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    //console.log(id)


    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music/" + id)
        .then(res => res.json())
        .then(showMusic)


    function showMusic(music) {
        //console.log(music)
        document.querySelector("article h1").textContent = post.title.rendered
    }
}

function handleData(myData) {
    //Loop it
    myData.forEach(showPost)
}

function showPost(post) {
    // console.log(post)
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
    img.setAttribute("alt", "Poster of the movie " + post.title.rendered);

    const a = postCopy.querySelector("a");
    a.href = "sub.html?id=" + post.id;

    const p1 = postCopy.querySelector("p1");
    p1.innerHTML = post.event_date
    // const p2 = postCopy.querySelector("p2");
    // p2.innerHTML = post.price
    // const p3 = postCopy.querySelector("p3");
    //p3.innerHTML = post.presale_price
    //const p4 = postCopy.querySelector("p4");
    //p4.innerHTML = post.door_opens
    //Append it
    document.querySelector("#music").appendChild(postCopy)
}

//MODAL JS

window.addEventListener("DOMContentLoaded", seegenre);

function seegenre() {
    fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/genre?_embed")
        .then(res => res.json())
        .then(handlemodalData)
}

function handlemodalData(myData) {
    myData.forEach(showgenre)
}

function showgenre(genre) {
    const modal = document.querySelector(".modal-content").content;

    if (genre.count > 0 && genre.parent === 29) {

        const modalContent = document.querySelector(".modal-content");
        modalContent.innerHTML += `<a class="genrename" href = Genre.html?id=${genre.id}><h3>${genre.name}</h3></a>`;}

        document.querySelector(".eventlistener1").addEventListener("click", seemodal);

        function seemodal(myData) {
            const genremodal = document.querySelector(".modal-background");

            //...
            genremodal.classList.remove("hide");
        }

    const genremodal = document.querySelector(".modal-background");
    genremodal.addEventListener("click", () => {
        genremodal.classList.add("hide");
    });
}
