"user strict"

let c = (e)=>document.querySelector(e);
let cs = (e)=>document.querySelectorAll(e);


pizzajson.map((item, index)=>{
    let pizzaItem = c('.pizzaItem').cloneNode(true);
    
    pizzaItem.querySelector('.pizzaItemImg img').src = item.img;
    pizzaItem.querySelector('.pizzaItem-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizzaItem-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizzaItem-description').innerHTML = item.description;

    c('.pizzaWindowArea').append(pizzaItem);
});