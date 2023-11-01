"user strict"

let c = (e)=>document.querySelector(e);
let cs = (e)=>document.querySelectorAll(e);


pizzajson.map((item, index)=>{
    let pizzaItem = c('.pizzaItem').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizzaItemImg img').src = item.img;
    pizzaItem.querySelector('.pizzaItem-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizzaItem-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizzaItem-description').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (item)=>{
        item.preventDefault();
        
        let key = item.target.closest('.pizzaItem').getAttribute('data-key');  // acesse o alvo(target) mais próximo (closest) do .pizzaItem e pega seu atributo.
        
        c('.modalImg img').src = pizzajson[key].img;
        c('.modalInfo h2').innerHTML = pizzajson[key].name;
        c('.modalInfo>p').innerHTML = pizzajson[key].description;
        c('.price').innerHTML = `R$ ${pizzajson[key].price.toFixed(2)}`;

        c('.modalPizza').style.opacity = 0;
        c('.modalPizza').style.display = 'flex';
        setTimeout(()=>{
            c('.modalPizza').style.opacity = 1;
            c('.pizzaWindowArea').style.opacity = 0.3;
        },200)
    });


    c('.pizzaWindowArea').append(pizzaItem);
});

cs('.cancel').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

function closeModal(){
    c('.modalPizza').style.opacity = 0;
    setTimeout(()=>{
        c('.modalPizza').style.display = 'none';
        c('.pizzaWindowArea').style.opacity = 1;
    },200)
}