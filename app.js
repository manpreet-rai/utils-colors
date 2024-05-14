let hexField = document.getElementById('hexField');
let rgbField = document.getElementById('rgbField');
let hexValidator = false;
let rgbValidator = false;
let hexMatch = new RegExp('^#?([0-9a-f]{3}|[0-9a-f]{6})$');
let rgbMatch = /^rgb\s?\(\s?(0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\s?,\s?(0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\s?,\s?(0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\s?\)$/ 
let currentColor = '#009197';
var hexValue = '';
var red = 0, green = 0, blue = 0;
let hexChart = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function defaultLook () {
	currentColor = '#009197';
	document.body.style.backgroundColor = currentColor;
	document.body.classList.add('dark');
	hexField.classList.add('dark');
	rgbField.classList.add('dark');
	hexField.value = '';
	rgbField.value = '';
	red = 0, green = 0, blue = 0;
	rgbValidator = false;
	hexValidator = false;
}

hexField.onkeyup = function hexCheck(){
	hexValidator = false;
	hexValue = hexField.value.toLowerCase();
	if (hexMatch.test(hexValue)){
		hexValidator = true;
		rgbValidator = true;
		if (hexValue.includes('#')){
			hex2rgb(hexValue.substring(1));
			if (hexField.value.length ===  4){
				red = hexa2decimal(''+hexField.value[1].toUpperCase()+hexField.value[1].toUpperCase());
				green = hexa2decimal(''+hexField.value[2].toUpperCase()+hexField.value[2].toUpperCase());
				blue = hexa2decimal(''+hexField.value[3].toUpperCase()+hexField.value[3].toUpperCase());
			} else {
				red = hexa2decimal(hexField.value.substring(1,3).toUpperCase());
				green = hexa2decimal(hexField.value.substring(3,5).toUpperCase());
				blue = hexa2decimal(hexField.value.substring(5).toUpperCase());
			}
		} else {
			hex2rgb(hexValue)
			if (hexField.value.length ===  3){
				red = hexa2decimal(''+hexField.value[0].toUpperCase()+hexField.value[0].toUpperCase());
				green = hexa2decimal(''+hexField.value[1].toUpperCase()+hexField.value[1].toUpperCase());
				blue = hexa2decimal(''+hexField.value[2].toUpperCase()+hexField.value[2].toUpperCase());
			} else {
				red = hexa2decimal(hexField.value.substring(0,2).toUpperCase());
				green = hexa2decimal(hexField.value.substring(2,4).toUpperCase());
				blue = hexa2decimal(hexField.value.substring(4).toUpperCase());
				
			}
		}

		rgbField.value = 'rgb('+red+', '+green+', '+blue+')';
		
		distWhite = Math.sqrt(Math.pow(red-255, 2)+Math.pow(green-255, 2)+Math.pow(blue-255, 2));
		distBlack = Math.sqrt(Math.pow(red, 2)+Math.pow(green, 2)+Math.pow(blue, 2));
		
		if (distWhite > distBlack) {
			document.body.classList.add('dark');
			hexField.classList.add('dark');
			rgbField.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
			hexField.classList.remove('dark');
			rgbField.classList.remove('dark');
		}

	} else {
		document.body.style.backgroundColor = '#009197';
		document.body.classList.add('dark');
		hexField.classList.add('dark');
		rgbField.classList.add('dark');
	}
}

rgbField.onkeyup = function rgbCheck (){
	rgbValidator = false;
	rgbValue = rgbField.value.toLowerCase();

	components = rgbComponents();

	if (components !== null) {
		rgbValidator = true;
		hexValidator = true;

		red = parseInt(components[1]);
		green = parseInt(components[2]);
		blue = parseInt(components[3]);

		redHex = (red).toString(16).length === 1 ? '0'+(red).toString(16).toUpperCase() : (red).toString(16).toUpperCase();
		greenHex = (green).toString(16).length === 1 ? '0'+(green).toString(16).toUpperCase() : (green).toString(16).toUpperCase();
		blueHex = (blue).toString(16).length === 1 ? '0'+(blue).toString(16).toUpperCase() : (blue).toString(16).toUpperCase();

		currentColor = '#' + redHex + greenHex + blueHex;
		hexField.value = currentColor;

		document.body.style.backgroundColor = currentColor;

		distWhite = Math.sqrt(Math.pow(red-255, 2)+Math.pow(green-255, 2)+Math.pow(blue-255, 2));
		distBlack = Math.sqrt(Math.pow(red, 2)+Math.pow(green, 2)+Math.pow(blue, 2));

		if (distWhite > distBlack) {
			document.body.classList.add('dark');
			hexField.classList.add('dark');
			rgbField.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
			hexField.classList.remove('dark');
			rgbField.classList.remove('dark');
		}

	} else {
		document.body.style.backgroundColor = '#009197';
		document.body.classList.add('dark');
		hexField.classList.add('dark');
		rgbField.classList.add('dark');
	}
}

hexField.addEventListener('focusout', (ev) => {
	if (hexValidator) {
		hexValue = hexField.value.toString();
		if (hexValue.includes('#')){
			hexField.value = '#'+hexValue.substring(1).toUpperCase();
		} else {
			hexField.value = '#'+hexValue.toUpperCase();
		}
	} else {
		defaultLook();
	}
});

rgbField.addEventListener('focusout', (ev) => {
	if (rgbValidator) {
		rgbField.value = 'rgb('+ red +', '+ green +', '+ blue +')';
	} else {
		defaultLook();
	}
});

function hex2rgb(color) {
	currentColor = '#'+color;
	document.body.style.backgroundColor = currentColor;
}

function hexa2decimal(digit){
	let decimal = 16*(hexChart.indexOf(digit[0])) + hexChart.indexOf(digit[1])
	return decimal;
}

function rgbComponents (){
	return rgbField.value.toString().match(rgbMatch);
}