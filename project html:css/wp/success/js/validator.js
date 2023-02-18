$(document).ready(function(){
	function validateForm(){
		var inputName = $(this).attr('name');
		var val = $(this).val();
		$(this).closest('.input__wrap').addClass('focused');
		switch(inputName){
			// Проверка поля "Имя"
			case 'name':
				// var rv_name = /^[а-яА-ЯёЁa-zA-Z0-9]+$/; // используем регулярное выражение
				if(val.length > 2 && val != '' ){
					$(this).removeClass('error');
					$(this).addClass('not_error');
				}
				else
				{
					$(this).removeClass('not_error').addClass('error');
				}
				break;
				// Проверка email
			case 'email':
				var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
				if(val != '' && rv_email.test(val)){
					$(this).removeClass('error');
					$(this).addClass('not_error');
				}
				else{
					$(this).removeClass('not_error').addClass('error');
				}
				break;
				// Проверка поля "Телефон "
			case 'phone':
				if(val != '' && val.length >= 10){
					$(this).removeClass('error');
					$(this).addClass('not_error');
				}
				else{
					$(this).removeClass('not_error');
					$(this).addClass('error');
				}
				break;
		}
	}

	// Устанавливаем обработчик потери фокуса для всех полей ввода текста
	$('form input').on('input', validateForm)
	$('input.name, input.email, input.phone').unbind().blur(validateForm);
	// $('input.name, input.email, input.phone').keypress(validateForm);
});