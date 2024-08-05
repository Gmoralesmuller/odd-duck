'use strict';
const img = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

const state={
    totalProducts:[],
};
class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.vote = 0;
        this.views = 0;
        this.renderVotes();
    }
    renderVotes() {
        if (this.vote != 0) {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: ${this.vote}`;
            }
        } else {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: 0`;
            }
        }
    }
}
function objMaker(){
    for( let i=0;i<img.length;i++){
        let product= new Products(img[i],`./img/${img[i]}.jpg`);
        if(img[i]===`sweep`){
            let product2= new Products(img[i],`./img/${img[i]}.png`);
            state.totalProducts.push(product2)
        }else{
            state.totalProducts.push(product);
        }
    }
}
function imgGenerator(){
    const calls = []
    let leftImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    let midImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    let rightImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    if(leftImg != midImg && midImg != rightImg && leftImg != rightImg){
        calls.push(leftImg);
        calls.push(midImg);
        calls.push(rightImg);
    }else{
        return imgGenerator();
    }
    return calls;
}
function objRender() {
    let call = imgGenerator();
    for (let i = 0; i < 3; i++) {
      const id = document.getElementById(`opcion${i + 1}`);
      const images = call[i].route;
      const name = call[i].name;
      if (id) {
        id.src = images;
        id.alt = name;
      }
      call[i].views++;
    }
}
objMaker();
objRender();