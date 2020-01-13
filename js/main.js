/* --------------- important method module---------------- */
import {newItem , createPagination , switchSlide , elmentCreate ,createItemWork , Storage /* storage class*/} from './module.js'

/* --------------- method shorthand ---------------- */ 
// single node 
const $ = (name) => document.querySelector(name);
// array nodes
const $$ = (elm) => document.querySelectorAll(elm);

/* ----------------------------------------   main varible global  ----------------------------------------*/
// array storage objects
let arrayObject = [];

// constructor input value 
function inputValue(name , direction){

    this.name = $(name).value ;
    this.direction = $(direction).value; 
 
}

/* --------------- create work project  ---------------- */



// create Items func 
function createWork(valueName , valueDirection) {

    // parentNode item work 
    let parentItem = $$('.parent-item-work');

   // inndex current beacuse node has 9 item switch another item and select last item added 
       current = parentItem.length - 1 ;

   // condation if parent node work has item 8 create new parent and set works in 
   if(parentItem[current].children.length === 9 ) {

       // create parent items works
       elmentCreate('div' , 'my-works parent-item-work', $('#switch-slide'));
       // reset variable because add new item 
       parentItem = $$('.parent-item-work');
       // increase current because add inside new parent work
       current++ ;
       // create pagination 
       let parentPagination = $('#parent-pagination');
       // insert pagi in node beacaue add inside parent 
       parentPagination.insertBefore(createPagination(current + 1) , $('#next').parentElement);
       // bus to open move slide to btn click add
       booleanSwitch = false; 
       // increase current i because know length page
       i++ ;


    }

     parentItem[current].appendChild(createItemWork(valueName , valueDirection ));
    // add class show for click to button edit on the project 
     clickEditWork();

     // hundle function edit work 
     editWork();
    
}

// condation switch slide if parent slide has 9 items and active if click only .
let booleanSwitch = true ;
let current  ;

// func create works 
function addWork(){
    
    let btns = new inputValue('#setName' , '#direction-work');


    // save value fisrt in storage
    Storage.save('work', btns , arrayObject);
    

    createWork(btns.direction , btns.name);

     // condation slide switch 
     if(!booleanSwitch){
        slideMove(-110 , current , false );
        booleanSwitch = true ;
    }

   
    

}



/* ---------------------  edit work   ---------------------------*/


    // method for click to button spener inside work show editor and remove 
    function clickEditWork() {
        let btnEdit =  $$('.edit-btn');
        btnEdit.forEach((elment) => elment.onclick =  function () {
         this.parentElement.classList.toggle('show');
        });
     }
 
 
     // editor return information project 
     function editWork() {
         let edit = $$('.edit-project');
         // loop for what btn click 
         edit.forEach((e) => e.onclick = function () {
         
         // access to items easy 
         let siblingNode = this.parentElement.parentElement;
 
         // element address project 
         let addressName = siblingNode.nextElementSibling ;
 
         // elment link project 
         let link = siblingNode.previousElementSibling ;
         
         //  link project
         let srcLink =  link.getAttribute('src').substring(9) ;

 
         $('#direction-edit').value = srcLink ;
         
         $('#name-edit').value = addressName.innerHTML ;



        
                  
         
         });
     }

/* -------------------  partision pagination  --------------------*/


   // init current for link item pagination 
   let i = 0 ;     /* reson counter i global because look two method
                      first if add 9 item switch slide and save i value
                      and click on pagintion know what is value counter */

// init value num translte 
let numMove = 0 ;

// main func to switch another slide 
// bool beacause if true meaning to button next and prev if false meaning pagination clicker 
function slideMove(number , counter , bool) {
    
    let pagiNum = $$('.number-slide');
    // condation teronary if clicker number or button next and previous
    // numMove give value previous  
      !bool ? numMove = number : numMove += number ;

    // remove class active for all pagination first beacause only one has this class 
    pagiNum.forEach(e => e.classList.remove('active'));

    pagiNum[counter].classList.add('active');

    switchSlide( $('#switch-slide') ,-110 * counter );
}




// btn next for pagination 
$('#next').onclick = function (next) {
// pagintaion numbers init
let pagiNum = $$('.number-slide');


next.preventDefault();
// save length pagination numer beacuse know what is the last 
let pagiLength = pagiNum.length ;
if(pagiNum[pagiLength - 1].classList.contains('active')) return ;
i++;
slideMove(-110 , pagiActive() + 1  , true );
}

  

$('#previous').onclick = function (prev) {

// pagintaion numbers init
let pagiNum = $$('.number-slide');

prev.preventDefault();
if(pagiNum[0].classList.contains('active')) return ;
i-- ;
slideMove(110 , pagiActive() - 1 , true);
}




// function return index pagination has class active
function pagiActive() {

    let pagiActive = $$('.number-slide'); 
    for(let index = 0 ; index < pagiActive.length ; index++ ) {
        if(pagiActive[index].classList.contains('active')){
        return index ;
    }
  }
}


/* ------------------- global method ------------------*/

 // func editor work  

 $('#switch-slide').addEventListener('click' , function (event) { 

// variable local because if click one or more save new elment 
let elmentTarget ;


if(event.target.classList.contains('edit-project')){
    elmentTarget = event.target.parentElement.parentElement.parentElement ;

    // event change value in work
    $('#save-editor').onclick = function (){
                    /* name         ,            value previous                        , new object value */
        Storage.edit('work' , elmentTarget.children[2].innerHTML , new inputValue('#name-edit' , '#direction-edit'));
        // here save value change in local storage 
        elmentTarget.children[0].setAttribute('src',`../Works/${$('#direction-edit').value}`);
        elmentTarget.children[2].innerHTML = $('#name-edit').value ;
    }
    
}else if(event.target.classList.contains('btn-remove')){
    elmentTarget = event.target.parentElement.parentElement.parentElement ;
    
    // method remove item & and generete items in slide if slide not has any items 
    // remove parentSlide items and decrease pagination 
    $('#confirm-remove').onclick = () => {
       
        let arrayPagination = Array.from($$('.number-slide'));
        
        Storage.remove('work', elmentTarget.children[2].innerHTML );

     if($('#switch-slide').children.length > 1 ){
                if(elmentTarget.parentElement.children.length === 1 ){
                // slice pagi after active and decrease value meaning pagi num after active dec (- 1) 
                arrayPagination.slice(pagiActive()).forEach((element) => element.children[0].innerHTML -= 1 );
                
                // remove parent items and remove pagination has class active
                elmentTarget.parentElement.remove();
                // remove pagination has class active 
                arrayPagination[pagiActive()].remove();
                
                // slide go to first 
                // reset current because click next know current
                i = 0 ;
                slideMove(0 , 0 , false); 
            
            
               }
              
    }

    elmentTarget.remove() ;

    // location.reload();  

    };
}  

});


$('#saveWork').addEventListener('click', addWork );


// func to fetch items inside storage for load page 


function dataLoad() {
  
 if(localStorage.length <= 0 ) return ;
 let load = Storage.load('work');
 load.forEach((e) => createWork(e.direction , e.name));
}


// handle items for finish load page
document.addEventListener('DOMContentLoaded' , dataLoad);
















