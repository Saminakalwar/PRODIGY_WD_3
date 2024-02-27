let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");

let popupRef = document.querySelector(".pop-up");
let newgameBtn = document.getElementById("new-btn");
let msgRef = document.getElementById("msg");

let turnO=true;
let count=0;

// here , it is 2D arrray so , the indexes of its each row will be like : [0,1,2]
const winPatterns = [
    [0,1,2],      
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    if(turnO){
        box.innerText="O";
        box.style.color="green";
        box.disabled=true;
        turnO=false;
    }
    else{
        box.innerText="X";
        box.style.color="red";
        box.disabled=true;
        turnO=true;
    }

 //Increment count on each click
 count += 1;
 if (count === 9) {
   GameDraw();
 }
  //Check for win on every click
    checkWinner();

  });
});

//  Below , as we know winPatterns is an Array of array , means on each index of winPatterns there is 
// a 1D array which will be assigned in pattern one by one on each iteration,  while, each pattern will be assigned with an array of 0,1,2 indexes as well .
const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPatterns){
        // here , we are comaparing values on each index of winPatterns assigned in pattern
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText; 

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
               winFunction(pos1Val);  
               winnerFound=true;
               break;                  
            }
        }
    }
     // If no winner is found and all boxes are filled, it's a draw
     if (!winnerFound && count === 9) {
        GameDraw();
    }
};

//Function for draw

const GameDraw=()=>{
disableBtns();
msgRef.innerHTML = "&#x1F60E; <br> It's a Draw !!";
};

//New Game

newgameBtn.addEventListener("click",()=>{
    count=0;
    enableBtns();
});

// Restart Game 
resetBtn.addEventListener("click",()=>{
    count=0;
    enableBtns();
});


//Enable all buttons (For New Game and Restart)

const enableBtns = ()=>{
    boxes.forEach((btn)=>{
btn.innerText="";
btn.disabled=false;
    });
    //disable popup
    popupRef.classList.add("hide");
}

//Disable All Buttons
const disableBtns = ()=>{
    boxes.forEach((btn)=>{
btn.disabled=true;
    });
    //disable popup
    popupRef.classList.remove("hide");
}


//This function is executed when a player wins

const winFunction=(i)=>{
    disableBtns();
    if(i=="X"){
        msgRef.innerHTML = "&#x1F389;  <br> 'X' Wins Wow!!&#x1F44F <br> Congratulations&#x1F478;&#x1F3FB";
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins Wow!!&#x1F44F <br> Congratulations&#x1F478;&#x1F3FB;"; 
    }
};




//Enable Buttons and disable popup on page load
window.onload = enableBtns;







