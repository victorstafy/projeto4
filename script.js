let n_cartas
let id_list
let parrots_pairs=["1.gif","1.gif","2.gif","2.gif","3.gif","3.gif","4.gif","4.gif","5.gif","5.gif","6.gif","6.gif","7.gif","7.gif"];
let card_back="front.png";

n_cartas=ask_stack_size()
console.log(n_cartas)
let shown_parrots=hide_unused_cards(n_cartas)

function ask_stack_size() {
    n_cartas=prompt("Com quantas cartas quer jogar?");
    if ( (n_cartas%2)!==0 || n_cartas<4 || n_cartas>14){
        alert("É necessário um número par de cartas, entre 4 e 14")
        ask_stack_size()
        return n_cartas
    }
    else {
        return n_cartas
    }
}

function hide_unused_cards(n_cartas){
    cards_list=document.querySelectorAll(".carta")
    max_cards=cards_list.length;
    id_list=Array.from({length: n_cartas}, (_, i) => i + max_cards-n_cartas)

    let shown_parrots=[];
    for (let i = 0; i < max_cards-n_cartas; i++) {
        cards_list[i].classList.add("hiden_div")
    }
    for (let j = 0; j < n_cartas; j++) {
        shown_parrots.push(parrots_pairs[j+max_cards-n_cartas])
    }
    shown_parrots.sort(comparador); 
    console.log(shown_parrots)
    console.log(id_list)
    return shown_parrots
}

function comparador() { 
	return Math.random() - 0.5; 
}

function select_card(element){
    element.classList.toggle("turn-over");
    let el_img=element.getElementsByTagName("img");
    // image_back_list=document.querySelectorAll(".turn-over img");
    
    // for (let i = 0; i < image_back_list.length; i++) {
    //     img_id=image_back_list[i].id;
    // }
    let img_id=el_img[0].id;
    let img_src=el_img[0].src;
    
    console.log(img_src)
    console.log(img_id)
    if (img_src.split('\\').pop().split('/').pop()===card_back){
        console.log(img_src.split('\\').pop().split('/').pop())
        el_img[0].src=shown_parrots[id_list.indexOf(Number(img_id))];
    }
    else {
        el_img[0].src=card_back;
    }
}
