
/*var ma_arrayCard=[];
ma_arrayCard[0]=["img/antonyms/anger.png","ma1"];
ma_arrayCard[1]=["img/antonyms/calm.png","ma1"];
ma_arrayCard[2]=["img/antonyms/fear.png","ma2"];
ma_arrayCard[3]=["img/antonyms/pride.png","ma4"];
ma_arrayCard[4]=["img/antonyms/happiness.png","ma3"];
ma_arrayCard[5]=["img/antonyms/sadness.png","ma3"];
ma_arrayCard[6]=["img/antonyms/surprise.png","ma2"];
ma_arrayCard[7]=["img/antonyms/disappointment.png","ma4"];*/

//var ma_card1, ma_card2, ma_card3, ma_card4, ma_card5, ma_card6, ma_card7, ma_card8;
var ma_currentImg;
var MA_COUNT;
var MA_COUNTFINAL=4;
var cards = [1,2,3,4,5,6,7,8];
var cardsPairs = [[1,2],[2,1],[3,4],[4,3],[5,6],[6,5],[7,8],[8,7]];
var initialImg;
var lastImg;
var changeCard;
var cardHeight;
var cardWidth;

function openAntonymsGame(){

    /*ma_card1=document.getElementById("ma_card1");
    ma_card2=document.getElementById("ma_card2");
    ma_card3=document.getElementById("ma_card3");
    ma_card4=document.getElementById("ma_card4");
    ma_card5=document.getElementById("ma_card5");
    ma_card6=document.getElementById("ma_card6");
    ma_card7=document.getElementById("ma_card7");
    ma_card8=document.getElementById("ma_card8");

    ma_arrayCard=shuffle(ma_arrayCard);

    ma_card1.src=ma_arrayCard[0][0];
    ma_card2.src=ma_arrayCard[1][0];
    ma_card3.src=ma_arrayCard[2][0];
    ma_card4.src=ma_arrayCard[3][0];
    ma_card5.src=ma_arrayCard[4][0];
    ma_card6.src=ma_arrayCard[5][0];
    ma_card7.src=ma_arrayCard[6][0];
    ma_card8.src=ma_arrayCard[7][0];

    ma_card1.setAttribute('data-ma',ma_arrayCard[0][1]);
    ma_card2.setAttribute('data-ma',ma_arrayCard[1][1]);
    ma_card3.setAttribute('data-ma',ma_arrayCard[2][1]);
    ma_card4.setAttribute('data-ma',ma_arrayCard[3][1]);
    ma_card5.setAttribute('data-ma',ma_arrayCard[4][1]);
    ma_card6.setAttribute('data-ma',ma_arrayCard[5][1]);
    ma_card7.setAttribute('data-ma',ma_arrayCard[6][1]);
    ma_card8.setAttribute('data-ma',ma_arrayCard[7][1]);



    ma_card1.addEventListener('click', verifyMatch);
    ma_card2.addEventListener('click', verifyMatch);
    ma_card3.addEventListener('click', verifyMatch);
    ma_card4.addEventListener('click', verifyMatch);
    ma_card5.addEventListener('click', verifyMatch);
    ma_card6.addEventListener('click', verifyMatch);
    ma_card7.addEventListener('click', verifyMatch);
    ma_card8.addEventListener('click', verifyMatch);*/

    var canvas = document.getElementById('cardsContainer');

    while (canvas.firstChild) {
      canvas.removeChild(canvas.firstChild);
    }

    MA_COUNT=0;
    renderCards();
    setCardsDimensions();
    setTimeout(maCountEnd,20000);


}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function verifyMatch(e){
    cardHeight = e.target.height;
    cardWidth = e.target.width;

    if(!ma_currentImg){
        ma_currentImg=e.target;
        new TweenMax.fromTo(ma_currentImg, 0.1, {width:cardWidth, height:cardHeight, borderColor:'rgba(15,94,94,0)', borderStyle:'none', ease:Power0.easeIn}, {width:cardHeight+10, height:cardHeight+10,
          borderStyle:'solid', borderColor:'rgba(15,94,94,1.0)', ease:Power0.easeOut});
        initialImg = ma_currentImg;
    }else if(ma_currentImg.id != e.target.id){
        if(!compareArrays(cardsPairs,[parseInt(ma_currentImg.id),parseInt(e.target.id)])){
            new TweenMax.fromTo(ma_currentImg, 0.1, {width:cardHeight+10, height:cardHeight+10, borderStyle:'solid', borderColor:'rgba(15,94,94,1.0)', ease:Power0.easeIn}, {width:cardWidth, height:cardHeight, borderStyle:'none',
              borderColor:'rgba(15,94,94,0)', ease:Power0.easeOut});
        }else{
          lastImg = e.target;
            new TweenMax.fromTo(e.target, 0.1, {width:cardWidth, height:cardHeight, borderColor:'rgba(15,94,94,0)', borderStyle:'none', ease:Power0.easeIn}, {width:cardHeight+10, height:cardHeight+10,
              borderColor:'rgba(15,94,94,1.0)', borderStyle:'solid', ease:Power0.easeOut, onComplete: function(){
              changeCard = new TweenMax.to([initialImg, e.target], 0.7, {delay:1, rotationY:'-180', onComplete:resizeCards});
              new TweenMax.set([initialImg, e.target], {delay:1.2, borderStyle:'none', onStart:changeForWood});
              e.target.onclick = null;
              initialImg.onclick = null;
            }});
            MA_COUNT++;
            if(MA_COUNT == MA_COUNTFINAL){
                console.log("Ganaste");
                victory("Gatuna",1);
                Win();
            }
        }
        ma_currentImg=null;
    }
}

function changeForWood() {
  initialImg.src = "assets/img/antonyms/wood.png";
  lastImg.src = "assets/img/antonyms/wood.png";
}

function resizeCards() {
  new TweenMax.fromTo([initialImg, lastImg], 0.05, {width:cardHeight+10, height:cardHeight+10, ease:Power0.easeIn}, {width:cardWidth, height:cardHeight, ease:Power0.easeOut});
}

function renderCards() {
  shuffle(cards);
  var canvas = document.getElementById('cardsContainer');
  var html = "";
  var index;
  for (var i = 0; i < 2; i++) {
    html += '<div class="cardsRow">'
    for (var j = 0; j < 4; j++) {
      index = (i===0) ? j : j+4;
      html += `<div id="cardContainer${cards[index]}" class="cardContainer"><img id="${cards[index]}" src="assets/img/antonyms/${cards[index]}.png" class="card" onclick="verifyMatch(event);" /></div>`;
    }
    html += '</div>'
  }
  canvas.innerHTML = html;
}

function setCardsDimensions() {
  var cardContainer = document.getElementById('cardContainer1');
  var cardHeight = cardContainer.clientHeight;
  var cards = document.querySelectorAll('.card');

  for(var i=0; i<cards.length; i++){
      cards[i].style.width = (cardHeight-15) + 'px';
      cards[i].style.height = (cardHeight-15) + 'px';
  }
}

function compareArrays(a, b) {
  var b_string = JSON.stringify(b);
  var contains = a.some(function(ele){
    return JSON.stringify(ele) === b_string;
  });
  return contains;
}

function maCountEnd(){
  var screen=document.getElementById('antonymsScreen');
  if(MA_COUNT != MA_COUNTFINAL && screen.style.display == 'block'){
    console.log("Perdiste");
    victory("Gatuna",0);
    lostGame();
  }
}

