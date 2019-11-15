 fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/music?_embed&per_page=100")
     .then(res => res.json())
     .then(handleData)

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

     var url_string = (window.location.href).toLowerCase();
     var url = new URL(url_string);
     var id = url.searchParams.get("id");
     console.log(id);

     function appendIngenre() {
         post.genre.forEach(a => {
             if (parseInt(a) === parseInt(id))
                 document.querySelector("#genre").appendChild(postCopy);
         })
     }
     appendIngenre()
 }


 window.addEventListener("DOMContentLoaded", seegenre);

 function seegenre() {
     fetch("http://iesdesigner.eu/wordpress/wp-json/wp/v2/genre?_embed&per_page=100")
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
         modalContent.innerHTML += `<a class="genrename" href = genre.html?id=${genre.id}><h3>${genre.name}</h3></a>`;
     }

     document.querySelector(".eventlistener1").addEventListener("click", seemodal);

     function seemodal(myData) {
         const genremodal = document.querySelector(".modal-content");

         //...
         genremodal.classList.remove("hide");
     }

     const genremodal = document.querySelector(".modal-background");
     genremodal.addEventListener("click", () => {
         genremodal.classList.add("hide");
     });
 }
