var budgetController = (function(){
var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value= value;
};
var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value= value;
};
var data = {

    allItems: {
            exp: [],
            inc: [],
            },
    totals: {
            exp: 0,
            inc: 0,
    }
}

return {
            addItem : function(type, des, val){
                var newItem, ID;
                ID= 0;
                        if(type=== "exp"){
                            newItem = new Expense(ID, des, val);
                        }else if(type==="inc"){
                            newItem = new Income(ID, des, val);
                        }

                        data.allItems[type].push(newItem);
                        return newItem;
                    }
            }



   
})();

var UIController = (function(){
var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue : ".add__value",
    inputBtn : ".add__btn",
}
return{

    getInput: function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    },
    getDOMstrings: function(){
        return DOMstrings;
    }

}
    
})();




var controller = (function(budgetCtrl, UICtrl){

var setupEventListeners = function (){
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    
    document.addEventListener("keypress", function(x){
    if(x.which===13){
    ctrlAddItem();
    }
});


};



var ctrlAddItem = function(){

// getting the input field

var input = UICtrl.getInput();

console.log(input);


}

return {
    init: function(){
        console.log("application started");
        setupEventListeners();
    }
}



}) (budgetController, UIController);

controller.init();