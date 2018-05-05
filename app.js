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
    },
    budget:0
}

var calculateTotal = function(type){
    var sum=0;
    data.allItems[type].forEach(function(cur){
         sum+=cur.value;
    })
    data.totals[type]  = sum;
}

return {
            addItem : function(type, des, val){
                var newItem, ID;
                //create new ID

                if(data.allItems[type].length>0){
                    ID= data.allItems[type][data.allItems[type].length - 1].id +1;
                }else{
                    ID= 0;
                }
                

                //create item based on inc or exp;
                        if(type=== "exp"){
                            newItem = new Expense(ID, des, val);
                        }else if(type==="inc"){
                            newItem = new Income(ID, des, val);
                        }
                //pushing into data structures
                        data.allItems[type].push(newItem);

                // returning new element
                        return newItem;
                    
                    },

    calculateBudget: function(){
         //calculate total income and expenditure

                 calculateTotal("inc");
                 calculateTotal("exp");

         
         //calculate budget

       data.budget = data.totals.inc- data.totals.exp;

         //calculate percentage of income that spent
                    }
            }



   
})();

var UIController = (function(){
var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue : ".add__value",
    inputBtn : ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
}
return{

    getInput: function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
        }
    },
    addListItem: function(obj, type){
       var html, newHtml, element

        if(type==="inc"){
            element = DOMstrings.incomeContainer;
            html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }else if(type ==="exp"){
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }   

            newHtml= html.replace("%id%", obj.id);
            newHtml= newHtml.replace("%description%", obj.description);
            newHtml= newHtml.replace("%value%", obj.value);
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        },
        clearFields: function (){
            var fields, fieldsArr
            fields = document.querySelectorAll(DOMstrings.inputDescription +", " + DOMstrings.inputValue);
            fieldsArr= Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
            current.value = "";
            });
            fieldsArr[0].focus();

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





var updateBudget= function (){
    //calculate budget

    //return budget

    //display budget on ui
}





var ctrlAddItem = function(){

    var input, newItem;
// getting the input field

input = UICtrl.getInput();

console.log(input);


if(input.description!=="" && !isNaN(input.value) && input.value>0){

    //Adding item to budget controller
    
    newItem = budgetController.addItem(input.type, input.description, input.value);

//adding to ui

UICtrl.addListItem(newItem, input.type);

//clear the input fields
UICtrl.clearFields();

//calculate and update budget

updateBudget();


}


}

return {
    init: function(){
        console.log("application started");
        setupEventListeners();
    }
}



}) (budgetController, UIController);

controller.init();