$(function (){

    // create global variables
    var userInput,newUser,activityConstants = {"none":1.2,"low":1.375,"mod":1.55,"high":1.725,"extreme":1.9};

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

    // creates a new person object with serialized array
    function createUser(array){
        var user = {};
        array.forEach(function(val){
            if(val.name === "age" || val.name === "weight" || val.name === "feet" || val.name ==="inches"){
                var numVal = Number(val.value);
                user[val.name] = numVal;
            }
            else {
                user[val.name] = val.value;
            }
        });
        return user;
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

    // on submit encode form elements as an array of names and values
    $("form").submit(function(event){
        userInput = $(this).serializeArray();
        newUser = createUser(userInput);
        console.log(newUser);
        console.log(maintainWeight(newUser.level,calcBMR(newUser.gender,newUser.feet,newUser.inches,newUser.weight,newUser.age,totalInches)));
        event.preventDefault();
    });


});
