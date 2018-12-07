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
export { viewEllipsis }