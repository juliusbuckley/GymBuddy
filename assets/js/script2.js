$(function (){

    // create global variables
    var userInput,userInput2,newUser,newFood,update = false,activityConstants = {"none":1.2,"low":1.375,"mod":1.55,"high":1.725,"extreme":1.9},foodList = [];

    // get data about our products from workouts.json using ajax
	$.getJSON("food.json",function(data) {
		// add array from food.json to global varibale
		foodList = data;
	});

    // makes gender radio hidden and addes highlight color
    $('#gender-color input:radio').addClass('input_hidden');
    $('#gender-color label').click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // adds highlight class while mouseenter button
    $('#button').on("mouseenter",function(){
        $(this).addClass("highlight-button");
    });

    // removes highlight class while mouseenter button
    $('#button').on("mouseleave",function(){
        $(this).removeClass("highlight-button");
    });

    // refresh page
    $('.form-reset').on("click","#button",function(){
        location.reload();
    });

    // adds highlight class while mouseenter button
    $('.form-reset').on("mouseenter",function(){
        $(this).addClass("highlight-button");
    });

    // removes highlight class while mouseenter button
    $('.form-reset').on("mouseleave",function(){
        $(this).removeClass("highlight-button");
    });

    // adds highlight class while mouseenter button
    $('.form-btn').on("mouseenter",function(){
        $(this).addClass("highlight-button");
    });

    // removes highlight class while mouseenter button
    $('.form-btn').on("mouseleave",function(){
        $(this).removeClass("highlight-button");
    });

    // creates a new person object with serialized array
    function createObject(array){
        var object = {};
        array.forEach(function(val){
            if(val.name === "age" || val.name === "weight" || val.name === "feet" || val.name ==="inches" || val.name ==="cal" || val.name ==="fat" || val.name ==="sodium" || val.name ==="carbs" || val.name ==="protein" || val.name ==="serving"){
                var numVal = Number(val.value);
                object[val.name] = numVal;
            }
            else {
                object[val.name] = val.value;
            }
        });
        return object;
    }

    // calculates basal metabolic rate
    function calcBMR(gender,feet,inches,weight,age,callback){
        var bmi = 0;
        if(gender==="female"){
            bmi = Math.floor(655+(4.7*callback(feet,inches))+(4.35*weight)-(4.7*age));
        }
        else{
            bmi = Math.floor(66+(12.7*callback(feet,inches))+(6.23*weight)-(6.8*age));
        }
        return bmi;
    }

    // converts height to inches
    function totalInches(feet,inches){
        return (feet*12)+inches;
    }

    // calculates calories to maintain weight
    function maintainWeight(level,callback){
        return Math.floor(activityConstants[level]*callback);
    }

    // updates calorie information once
    function updateCalories(){
        if(!update){
            $(".footer .maintain").append(maintainWeight(newUser.level,calcBMR(newUser.gender,newUser.feet,newUser.inches,newUser.weight,newUser.age,totalInches)));
            $(".footer .lose").append(maintainWeight(newUser.level,calcBMR(newUser.gender,newUser.feet,newUser.inches,newUser.weight,newUser.age,totalInches))-500);
            $(".footer .gain").append(maintainWeight(newUser.level,calcBMR(newUser.gender,newUser.feet,newUser.inches,newUser.weight,newUser.age,totalInches))+500);
        }
        update = true;
    }

    // if value is NaN return value; else return value with number function applied
    function numTest(value){
        if(isNaN(value)){
            return value;
        }
        else{
            return Number(value);
        }
    }

    // filters array by form values
    function filterFood(array){
        var filterArray = foodList.filter(function(value){
            return value.group === array[0][1] && value.calories <= array[1][1] && value.fat <= array[2][1] && value.sodium <= array[3][1] && value.carbs <= array[4][1] && value.protein <= array[5][1] && value.serving <= array[6][1];
        });
        // if array is empty return message
        if(filterArray.length===0){
            return "No results within filter criteria...";
        }
        return filterArray;
    }

    // html is created for each element in array
    function updateFood(array){
        $(".food-description").remove();
        var listOfFood = "";
        array.forEach(function(food){
            listOfFood +=  '<ul class="food-description">'+
                                '<li><span class="red">Type: </span>'+food.group+'</li>'+
                                '<li><span class="white">Name: </span>'+food.name+'</li>'+
 						        '<li><span class="blue">Calories: </span>'+food.calories+'</li>'+
                                '<li><span class="blue">Fat: </span>'+food.fat+' grams</li>'+
                                '<li><span class="blue">Sodium: </span>'+food.sodium+' milligrams</li>'+
						        '<li><span class="green">Carbs: </span>'+food.carbs+' grams</li>'+
                                '<li><span class="green">Protein: </span>'+food.protein+' grams</li>'+
                                '<li><span class="green">Serving Size: </span>'+food.serving+' ounces</li>'+
                            '</ul>';

        });
        return listOfFood;
    }

    // on submit encode form elements as an array of names and values
    $(".cal-form").submit(function(event){
        userInput = $(this).serializeArray();
        newUser = createObject(userInput);
        updateCalories();
        event.preventDefault();
    });

    // sends form data to filter
    $(".food-form").submit(function(event){
        userInput2 = $(this).serializeArray();
        newFood = createObject(userInput2);
        var foodArray = $.map(newFood,function(value,index){
            return [[index,numTest(value)]];
        });
        //console.log(filterFood(foodArray));
        $(".food-list").append(updateFood(filterFood(foodArray)));
        event.preventDefault();
    });

});
