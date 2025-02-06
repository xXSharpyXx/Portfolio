document.addEventListener("DOMContentLoaded", function () {
    new kursor({
        type: 4, // Par exemple, un type différent pour voir si le rendu est meilleur
        removeDefaultCursor: true,
        color: "#ffffff"
    });    
});



const cursor = document.querySelector(".kursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});



