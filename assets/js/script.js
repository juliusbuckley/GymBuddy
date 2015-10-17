$(function (){

    // create global variables
    var exercises = [];
    var groups = [".abdominals",".lats",".calves",".forearms",".biceps",".glutes",".hamstrings",".chest",".quadriceps",".shoulders",".traps",".triceps"];

    // sets highlight and select color for image map
    $('#body').mapster({
        fillOpacity: 0.9,
        render_highlight: {
            fillColor: '2aff00',
            stroke: true,
            altImage: 'assets/images/bodymainhover.png'
        },
        render_select: {
            fillColor: 'ff000c',
            stroke: false,
            altImage: 'assets/images/bodymainhover.png'
        },
        fadeInterval: 50,
        mapKey: 'muscle',
    });

    // get data about our products from workouts.json using ajax
	$.getJSON("workouts.json",function(data) {

		// add array from workouts.json to global varibale
		exercises = data;

        // create HTML on page
        generateAllProductsHTML(exercises);
	});

    // hides exercise elements on load
    function hideGroups(){
        groups.forEach(function(value){
            $(value).hide("fast");
        })
    }

    // divs are created on load and set to hidden
	function generateAllProductsHTML(data){
		var list = $('.all-exercises .exercise-list');
        // grab the template script
        var theTemplateScript = $("#exercise-template").html();
		// compile html template and append to list
		var theTemplate = Handlebars.compile(theTemplateScript);
		list.append(theTemplate(data));
        hideGroups();
        $(".exercise-list").removeClass("hide");
	}

    // when an image map is highlighted, the corresponding checkbox value is checked
    $("map").on("click","area",function(){
        var filterName = $(this).attr('alt');
        var checkbox = $('input:checkbox[name='+filterName+']');
        if(!checkbox.is(':checked')){
            checkbox.prop('checked',true);
            // show selected exercise
            $("."+filterName).slideDown("fast");
        }
        else{
            checkbox.prop('checked',false);
            // hide unselected exercise
            $("."+filterName).slideUp("fast");
        }
    });

    // makes gender radio hidden and addes highlight color
    $('#gender-color input:radio').addClass('input_hidden');
    $('#gender-color label').click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // adds highlight class while mouseenter exercise column
    $(".exercise-list").on("mouseenter",".col",function(){
        $(this).addClass("highlight");
        $(this).animate({"height":"+=10px"},"fast");
    });

    // removes highlight class while mouseenter exercise column
    $(".exercise-list").on("mouseleave",".col",function(){
        $(this).removeClass("highlight");
        $(this).animate({"height":"-=10px"},"fast");
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
    $('.bodymain').on("click","#button",function(){
        location.reload();
    });

    // submit form
    $('.form-btn').click(function(){
        console.log($('form').serializeArray());
    });

});
