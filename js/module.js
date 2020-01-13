
 export function newItem(name , text ) {
    let item = document.createElement(name);
    item.innerHTML = text ;
    return item ;
}

export function createItemWork( direction , nameAddres) {

        let nodeItem = document.createElement('div');
        nodeItem.className = 'project wow fadIn' ;
        nodeItem.setAttribute('data-wow-duration' , '2s');
        
        nodeItem.innerHTML = `<iframe class="framer_"  scrolling="no" src="../Works/${direction}" frameborder="0"></iframe>
                                <div class="btn-modify d-flex">
                                    <i class="fas fa-cog edit-btn"></i>
                                    <div>
                                        <button class="btn btn-sm btn-primary edit-project" data-toggle="modal" data-target="#edit-work">edit</button><br>
                                        <button class="btn btn-sm btn-danger mt-1 btn-remove" data-toggle="modal" data-target="#modal-confirm">Remove</button>
                                    </div>
                                </div>
                                <span class="bar-address">${nameAddres}</span>`

        return nodeItem ; 
}


// method create pagination
export function createPagination(current) {
    let parentPagi = document.createElement('li');
    parentPagi.className = 'page-item number-slide';
    parentPagi.innerHTML = `<a class="page-link" href="#">${current}</a>`
    return parentPagi ;
}



// method only switch slide 
export function switchSlide( elm , transNumber) {
   elm.style.transform = `translateX(${transNumber}%)`;
}



// method create ELment and set class and append child 
export function elmentCreate(name , nameClass , appendElement){
    let elm = document.createElement(name);
    elm.className = nameClass ;
    appendElement.appendChild(elm);
    return elm ;
}


// local storage 
export class Storage {
    // key   , object , variable save items
    static save( keyName , obj = false , storageValue ){


                        /* if obj = false meaning edit and save direct 
                        if = obj not false meaning add new value with array in storage */
        if(!obj){

        }else if(this.load(keyName) == null){
            storageValue = [];
            storageValue.push(obj);
        }else{
            storageValue = this.load(keyName);
            storageValue.push(obj);
        }
        
        

      

      let value = JSON.stringify(storageValue);
      localStorage.setItem(keyName , value );

    }
 
      static  remove(name , nameKey){ 


        console.log(nameKey)
        // receive item 
        let localLoad = this.load(name);


        // filter the array and remove item inside the name target
        const dataObject = localLoad.filter( elm => elm.name !== nameKey );

        // this mean empty storage 
        if(dataObject == null) return ;

        this.save(name , false , dataObject);

        
    }
    

     static load(key){
        return JSON.parse(localStorage.getItem(key));
    }


    static edit(name ,keyName , newObject){


        let arrayItems = this.load(name);

        // value previous inside input
        let nameKey = keyName ;

        // search index object has nameKey value prev 
        let index = arrayItems.findIndex((elm) => elm.name == nameKey);

        arrayItems[index] = newObject ;

        this.save(name , false , arrayItems );
        

        //Storage.save(... , arrayObject);

        //  step func editor :
        // 1- recieve name object .
        // 2- select name value address on click edit 
        // 3- findindex value name 2 
        // 4- edit value and set in HTML 
        // 5- save new value .
    
    }

}