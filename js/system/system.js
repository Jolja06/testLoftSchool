var app = (function(){
	"use strict";
	var init = function(){
		_setUpStatic();
		_setUpListners();
	};
  
	var _setUpListners = function(){
		$(".nav").on("click", _navigation);
		$('.check').on('click', _check);

	};
  
	var _setUpStatic = function(){
		_drawSlider();
		_drawText();
		set_user_model();

	};
	
	var _check = function(){
		var num = $(this).parent('.canvas__scene').data('number');
		if(_startCheck(num, this)){
			$(this).siblings('.teacher').children('.text').html(data[num].done);
		} else {
			$(this).siblings('.teacher').children('.text').html(data[num].error);
		}
	};
	
	var _startCheck = function(num, self){
		switch(num){
			case 1:
				$(".text_character").fadeIn('slow');
				if(set_user_model() && set_user_name() &&  set_user_age()){
					localStorage.setItem("genderMale", genderMale);
					return true;
				} else {
					$(self).siblings('.character').children('.text_character').children('.t1-user-name').html(data[num].user);
				}
				return false;				
				break;

//			case 2:
//				$(".answer").fadeIn('slow');
//				if(t2_set_count() && 	t2_set_books()){
//					return true;
//				} else {
//					$(self).siblings('.answer').children('.answer__boxes').html(data[num].user);
//				}
//				return false;				
//				break;

			case 2:
				if(t2_func_check()){
					return true;
				} 
				return false;				
				break;

			case 3:
				if(t3_func_check()){
					return true;
				} 
				return false;				
				break;
		}
		return true;
	};

	
	var _drawText = function(){
		$('.canvas__scene').each(function(index) {
			var num = $(this).data('number');
			$(this).children('.teacher').children('.text').html(data[num].start).fadeIn('slow');
		});
	};
	
  	//оформительство
  	var _drawSlider = function(){
		if($(".canvas").length > 0){
			$(".nav").show();
		}
	};  
  	var _navigation = function(){

		var directionNext = true;
		var thisElem = $(".canvas__scene_active");	
		var number = thisElem.data("number");
		var numberStop = thisElem.data("number");

		if($(this).hasClass("nav_prev")) directionNext = false;


		if(directionNext) {number++;} else {number--;};
		var nextElem = $(".canvas__scene[data-number='" + number + "']");
		if(nextElem.length > 0){
			thisElem.removeClass("canvas__scene_active");
			nextElem.addClass("canvas__scene_active");
		} else {
		  (directionNext)? number-- : number++;
		}	

	};
  
	
	
	/*Обрабочик 1 задания*/
	var set_user_model = function(){
		if(genderMale === null)  return false;
		if(genderMale === "true" || genderMale === true){ 
			$('.model_character').addClass('model_character_male');
		} else { 
			$('.model_character').addClass('model_character_female');
		}
		return true;
	};
	var set_user_name = function(){
		if(name ==  "????")  return false;
		$('.t1-user-name').html("Меня зовут: "+name);
		return true;
	};
	var set_user_age = function(){
		if(age ==  "????")  return false;
		$('.t1-user-age').html("Мне "+age+" лет");
		return true;
	};
	/*Обрабочик 2 задания*/
	var t2_func_check = function(){
		if(typeof t2_func == 'function'){
			t2_func();
			return true;
		}
		return false;
	};
	/*Обрабочик 3 задания*/
	var t3_func_check = function(){
		if(typeof t3_func == 'function'){
			t3_func();
			
			return true;
		}
		return false;
	};
	
	
	
	
	
  
  return {
	init: init
  };
}());





$(document).ready(function(){
		
app.init();

	
});