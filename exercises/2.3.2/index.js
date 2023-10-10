const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
    div.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.style.width = '100px';
        e.target.style.height = '100px';
        e.target.innerHTML = div.style.backgroundColor;
    });
});
