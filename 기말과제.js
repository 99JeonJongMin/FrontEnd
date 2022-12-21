//////////////////////////////
//전역변수
let dragging =null; //드래깅 중인 카드 객체 등록
let dragCard = null;
let dragOver = null; // 드래깅 객체가 올라간 객체 등록
// let quizWords = quizSet.quiz.split(" ");


/////////////////////////
//과제 관련
function random (num){
    return Math.floor(Math.random() * num)
}
//words 배열에 있는 단어들로 카드들을 생성하는 HTML 문장을 완성하는 함수
function getCardsWords(words,kor,celebrity) {
    let cardsHTML =[]
    let aCardHTML ="";
    let count=0;
    for (let word of words) {
        aCardHTML = `<div draggable = "true" originalOrder="${count++}"class="card${count}">${word}</div>`;
        
        
        cardsHTML.push(aCardHTML);
        
    }

    console.log(cardsHTML);
    
    // box 안에 위에서 생성한 카드들을 추가한다.
    document.querySelector(".box").innerHTML = cardsHTML.join("","");
    document.querySelector(".kor").innerHTML = kor;
    document.querySelector(".celebrity").innerHTML = celebrity;

}


function selectQuiz(quizNo){
    if(quizNo >= quizSet.quiz.length)
        console.log("에러 1: 퀴즈 번호가 범위를 벗어났습니다.");
    let words = quizSet.quiz[quizNo].eng.split(" ");
    let kor = quizSet.quiz[quizNo].kor;
    let celebrity =quizSet.quiz[quizNo].celebrity;
    getCardsWords(words,kor,celebrity);
}

function qsa(el) {
    return document.querySelectorAll(el);
}


//////////////////
//class card 객체 이벤트 핸들러 영역
function dragStartCard (ev) {
    dragging = this;
    this.classList.add("dragging");
}

function dragEndCard(ev) {
    ev.preventDefault(); // 브라우저의 default값을 미연에 차단 (방해를 받을 수 있음)
    this.classList.remove("dragging");
    dragging = null;
    //dragOver가 null이 아니면 처리할 내용
    if(dragOver) {// != null 이 아니라도 null값이 아닌값이 들어가면 참으로 들어감
        dragOver.classList.remove("dragOver");
        dragOver = null;
    }
    //dragCard가 null이 아니면 처리할 내용
    if(dragCard) {// != null 이 아니라도 null값이 아닌값이 들어가면 참으로 들어감
        dragCard.classList.remove("overCard");
        dragCard = null;
    }
}

/////////////////
//class card 객체 이벤트 핸들러 영역
function dragOverCard(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // dragOverCard 이벤트가 부모 노드로 전파
                            // 되는것을 차단
    dragCard = this;
    this.classList.add("overCard");

}

function dragLeaveCard(ev) {
    ev.preventDefault();
    dragCard = null;
    this.classList.remove("overCard");
}

function dropCard(ev) {
    this.parentNode.insertBefore(dragging,this);
}


///////////////////////////
//class box 객체 이벤트 핸들러 영역
function dragOverBox(ev) {
    ev.preventDefault();
    dragOver = this;
    this.classList.add("dragOver");
} 

function dragLeaveBox(ev){
    ev.preventDefault();
    dragOver = null;
    this.classList.remove("dragOver");
}

// function dropBox(ev) {
//     dragOver.appendChild(dragging);
// }

////////////////

window.onload = function() {
    // 단어 card 들 먼저 생성
    selectQuiz(random(5));
    // card 객체 이벤트 핸들러 연결
    let cardArray = $("[class*='card']");
    for(let card of cardArray){
        card.addEventListener("dragstart", dragStartCard);
        card.addEventListener("dragend",dragEndCard);
        card.addEventListener("dragover",dragOverCard);
        card.addEventListener("dragleave",dragLeaveCard);
        card.addEventListener("drop",dropCard);
    }
    let boxArray = qsa(".box");
    for(let box of boxArray){
        box.addEventListener("dragover", dragOverBox);
        box.addEventListener("dragleave",dragLeaveBox);
        // box.addEventListener("drop",dropBox);

    }
}