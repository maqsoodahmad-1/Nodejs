//Challange 1:Your Age in Days
let birthYear,current_Year,age_in_days ,h1,textAnswer;//declraing variable 

function ageInDays(){
     birthYear=prompt('what is your year of birth dear');//askiing user for birth year and storing in variable
     current_Year=prompt('what is current year');//asking user for current year
     age_in_days = (current_Year-birthYear)*365;//calculating age in years
     h1 =document.createElement('h1');
     textAnswer = document.createTextNode('You are ' + age_in_days+' days old')
     h1.setAttribute('id','age_in_days');
     h1.appendChild(textAnswer);
     document.getElementById('flex-box-result').appendChild(h1);
     console.log(age_in_days);
}

function reset()
    {
        document.getElementById('age_in_days').remove();
    }
// Challange 2: Cat Generator
var image,div;

function generateCat()
{
 image = document.createElement('img') ;
 div = document.getElementById('flex-cat-gen');
 image.src="img.gif";
 div.appendChild(image);
}
//challange 3: Rock ,Paper,Scissor
var result;

function rpsGame(yourChoice)
{
var humanChoice,botChoice;
humanChoice=yourChoice.id;
 botChoice=numberToChoice(randomToRpsInt());
//alert('boatchoice '+boatchoice);
result = decidewinner(humanChoice,botChoice);//[1,0]  or something like that
console.log(result);
message = finalMessage(result);/*messsage:you won or something 
like that 'color':'green' */
console.log(message);

rpsFrontEnd(humanChoice.id,botChoice.id,message);
}
function randomToRpsInt()
{
    return Math.floor(Math.random()*3);
}
function numberToChoice(number)
{
    return['rock','paper','scissor'][number]
}

function decidewinner(yourchoice,computerChoice)
{
    var rpsdatabase = 
    {//little datastructure
        'rock':{'scissor':1,'rock':0.5,'paper':0},
        'paper':{'scissor':0,'paper':0.5,'rock':1},
        'scissor':{'scissor':0.5,'paper':1,'rock':0},
    };
    var yourscore = rpsdatabase[yourchoice][computerChoice];
    var computerscore = rpsdatabase[computerChoice][yourchoice];
    return[yourscore,computerscore];
}
function finalMessage([yourscore,computerscore])
{
    if (yourscore===0)
    {
        return {'message':'you lost','color':'red'};
    }
    else if(yourscore===0.5)
    {
        return {'message':'tied try again','color':'yellow'};
    }
    else 
    {
        return {'message':'you won','color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage)
{
    var imagesDatabase = 
    {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    };
    //let's remove alll the images 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src =`" + imagesDatabase[humanImageChoice] + "` height =120 width=120 style ='box-shadow: 0px,10px,50px,rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style = 'color:" + finalMessage['color'] + ";font-size 60px; padding:30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML="<img src =`"+imagesDatabase[botImageChoice]+"` height =120 width =100 style ='box-shadow: 0px,10px,50px,rgba(37,50,233,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4: Chamge the color of buttons 

var all_buttons = document.getElementsByTagName('button') ;

var copyAllButtons = [];
for(let i = 0;i<all_buttons.length;i++)
{
    copyAllButtons.push(all_buttons[i].classList[1]);
    
}

function buttonColorChange(buttonThingy) {
  
    if(buttonThingy.value === 'red')
    {
        buttonsRed();
    }

    else if(buttonThingy.value === 'green')
    {
        buttonsgreen();
    }

    else if(buttonThingy.value === 'reset')
    {
        resetButtonsColor();
    }

    else if(buttonThingy.value === 'random')
    {
        randomColors();
    }
    
}

function buttonsRed(){
    for(let i = 0;i < all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsgreen()
{
    for(let i = 0 ; i < all_buttons.length ; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
 
function resetButtonsColor()
{
    for(let i = 0 ;i < all_buttons.length ; i++)
    {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors()
{
    let choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i = 0 ;i < all_buttons.length ; i++)
    {
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}
// Challenge 5:Black jack project 

let blackjackGame ={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
};

const YOU  = blackjackGame['you']
const DEALER  = blackjackGame['dealer']

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
   let card = randomCard();
    console.log(card);
    showCard(card,YOU);
  //  showCard(DEALER);
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer)
{
    let cardImage = document.createElement('img');
    cardImage.src = `blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() 
{
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i = 0 ; i < yourImages.length ; i++)
    {
       yourImages[i].remove();
    }

    for(let i = 0 ; i < dealerImages.length ; i++)
    {
       dealerImages[i].remove();
    }
}

