
var ma_arrayCard=[];
ma_arrayCard[0]=["img/antonyms/anger.png","ma1"];
ma_arrayCard[1]=["img/antonyms/calm.png","ma1"];
ma_arrayCard[2]=["img/antonyms/fear.png","ma2"];
ma_arrayCard[3]=["img/antonyms/fear.png","m4"];
ma_arrayCard[4]=["img/antonyms/happiness.png","m3"];
ma_arrayCard[5]=["img/antonyms/sadness.png","m3"];
ma_arrayCard[6]=["img/antonyms/surprise.png","m2"];
ma_arrayCard[7]=["img/antonyms/surprise.png","m4"];

var ma_card1, ma_card2, ma_card3, ma_card4, ma_card5, ma_card6, ma_card7, ma_card8;
var ma_currentImg;

window.onload=init;

function init(){

    ma_card1=document.getElementById("ma_card1");
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
    ma_card8.addEventListener('click', verifyMatch);

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

function verifyMatch(){
    if(!ma_currentImg){
        ma_currentImg=this;
        var ma_id=String(this.id);
        new TweenMax.fromTo(ma_currentImg, 2, {width:"79%"},{width:"85%"});
    }else{

    }

}
