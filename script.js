let n_cards
let id_list
let cards_state
let parrots_pairs=["1.gif","1.gif","2.gif","2.gif","3.gif","3.gif","4.gif","4.gif","5.gif","5.gif","6.gif","6.gif","7.gif","7.gif"];
let card_back="front.png";
let n_sel_cards=0;
let n_turns=0;
let selected_card=null;
let selected_card_el_list=[];

n_cards=ask_stack_size()
// console.log(n_cards)
let shown_parrots=hide_unused_cards(n_cards)

function ask_stack_size() {
    n_cards=prompt("Com quantas cartas quer jogar?");
    if ( (n_cards%2)!==0 || n_cards<4 || n_cards>14){
        alert("É necessário um número par de cartas, entre 4 e 14")
        ask_stack_size()
        return n_cards
    }
    else {
        return n_cards
    }
}

function hide_unused_cards(n_cards){
    cards_list=document.querySelectorAll(".carta")
    max_cards=cards_list.length;
    id_list=Array.from({length: n_cards}, (_, i) => i + max_cards-n_cards)

    let shown_parrots=[];
    for (let i = 0; i < max_cards-n_cards; i++) {
        cards_list[i].classList.add("hiden_div")
    }
    for (let j = 0; j < n_cards; j++) {
        shown_parrots.push(parrots_pairs[j+max_cards-n_cards])
    }
    shown_parrots.sort(comparador); 
    cards_state=Array(shown_parrots.length).fill(false);
    // console.log(shown_parrots)
    // console.log(id_list)
    return shown_parrots
}

function comparador() { 
	return Math.random() - 0.5; 
}

function select_card(element){
    let selected_card_now;
    let img_id=flip_card(element);
    n_turns++;
    if (element.classList.contains("turn-over")){
        n_sel_cards++;
    }
    else {
        n_sel_cards--;
    }

    // console.log(id_list)
    // console.log(n_sel_cards)

    selected_card_now=shown_parrots[id_list.indexOf(Number(img_id))];
    selected_card_el_list.push(element);

    console.log(n_sel_cards)
    if (n_sel_cards===2) {
        if (selected_card!==selected_card_now){
            n_sel_cards=setTimeout(rec_loop,1000);
            return n_sel_cards
        }    
        else{
            n_sel_cards=0;
            selected_card_el_list=[];
        } 
    }

    cards_state[id_list.indexOf(Number(img_id))]=true;
    selected_card=shown_parrots[id_list.indexOf(Number(img_id))];
    check_game(cards_state)
}

function rec_loop(){
    console.log(selected_card_el_list)
    for (let i = 0; i < n_sel_cards+1; i++) {
        img_id=flip_card(selected_card_el_list[i])
        cards_state[id_list.indexOf(Number(img_id))]=false;
    }
    selected_card_el_list=[];
    n_sel_cards=0;
    return n_sel_cards
}

function check_game(cards_state_vector){
    console.log(cards_state_vector)
    if ( cards_state_vector.every(i => i) ){
        alert(`Você ganhou em ${n_turns} jogadas!`)
    }
}

function flip_card(element){
    if (!element) return null
    // console.log(element)
    element.classList.toggle("turn-over");
    let el_img=element.getElementsByTagName("img");
    let img_id=el_img[0].id;
    let img_src=el_img[0].src;

    // console.log(img_src)
    // console.log(img_id)

    if (img_src.split('\\').pop().split('/').pop()===card_back){
        // console.log(img_src.split('\\').pop().split('/').pop())
        el_img[0].src=shown_parrots[id_list.indexOf(Number(img_id))];
    }
    else {
        el_img[0].src=card_back;
    }
    return img_id
}
