"user strict"

let cart = [];
let modalQt = 1;
let modalKey = 0;

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
        modalQt = 1;
        modalKey = key;

        c('.modalImg img').src = pizzajson[key].img;
        c('.modalInfo h2').innerHTML = pizzajson[key].name;
        c('.modalInfo>p').innerHTML = pizzajson[key].description;
        c('.price').innerHTML = `R$ ${pizzajson[key].price.toFixed(2)}`;
        c('.pizzaInfo-size.selected').classList.remove('selected');
        cs('.pizzaInfo-size').forEach((sizes, sizeIndex)=>{
            if(sizeIndex == 2){
                sizes.classList.add('selected')
            }
            sizes.querySelector('span').innerHTML = pizzajson[key].size[sizeIndex];
        });

        c('.qt').innerHTML = modalQt;

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

c('.btn-menos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.qt').innerHTML = modalQt;
    }
});


c('.btn-mais').addEventListener('click', ()=>{
    modalQt++;
    c('.qt').innerHTML = modalQt;
});

cs('.pizzaInfo-size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo-size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});


c('.add-carrinho').addEventListener('click', (e)=>{
    let size = parseInt(c('.pizzaInfo-size.selected').getAttribute('data-key'));

    let indentifier = pizzajson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>{
        return item.indentifier == indentifier
    });

    if(key > -1){
        cart[key].Qt += modalQt;
    }else{
        cart.push({
            indentifier,
            id:pizzajson[modalKey].id,
            size,
            Qt:modalQt
        });
    }
   
    updateCard();
    closeModal();
});

c('.add-carrinho').addEventListener('click', ()=>{
    c('aside').style.width = '100%';
});

c('.carVolte').addEventListener('click', ()=>{
    c('aside').style.width = '0px';
    c('header ul').style.marginRight = '0px';
    c('.pizzaWindowArea').style.marginRight = '0px'
});

c('.fa-solid.fa-cart-shopping').addEventListener('click', ()=>{
    updateCard();
});


function updateCard(){
    c('.menuCar span').innerHTML = cart.length;
    if(cart.length > 0){
        c('aside').style.width = '400px';
        c('header ul').style.marginRight = '430px';
        c('.pizzaWindowArea').style.marginRight = '400px'
        c('.carModel').innerHTML = '';


        let desconto = 0;
        let subTotal = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzajson.find((item) => item.id == cart[i].id);
            
            subTotal += pizzaItem.price * cart[i].Qt;

            let cartItem = c('.modelPizza .pizzaCart').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            };
            
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cartItem-name').innerHTML = pizzaName;
            cartItem.querySelector('.cart-qt').innerHTML = cart[i].Qt;

            cartItem.querySelector('.cartQt-menos').addEventListener('click', (e)=>{
                e.preventDefault()
                if(cart[i].Qt > 1){
                    cart[i].Qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCard()
            });

            cartItem.querySelector('.cartQt-mais').addEventListener('click', (e)=>{
                e.preventDefault()
                cart[i].Qt++;
                updateCard()
            });


            c('.carModel').append(cartItem)
        }

        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.priceSubt').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        c('.priceDesconto').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.priceTotal').innerHTML = `R$ ${total.toFixed(2)}`;
        
    }else{
        c('aside').style.width = '0px';
        c('header ul').style.marginRight = '0px';
        c('.pizzaWindowArea').style.marginRight = 'auto'
    }
}



c('.fa-solid.fa-bars').addEventListener('click', ()=>{
    const menu = c('ul')
    menu.style.display = 'flex'
    c('.fa-solid.fa-bars').style.display = 'none'
    c('.fa-solid.fa-xmark').style.display = 'flex'
});

c('.fa-solid.fa-xmark').addEventListener('click', ()=>{
    c('.fa-solid.fa-xmark').style.display = 'none'
    c('.fa-solid.fa-bars').style.display = 'flex'
    const menu = c('ul')
    menu.style.display = 'none'
});