// JS - 
//import './js/';
import './pages/page.js';
import $ from 'jquery';
global.jQuery = $;
global.$ = $;
global.jQuery = global.$ = $;
window.$ = window.jQuery = $;
import 'jquery/dist/jquery.min.js'

// SCSS
import './index.scss';
// PUG 
//import './index.pug';

//require('jquery-ui/ui/widgets/slider');
//$('#id').slider();


import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
$(document).ready(() => {
	$('.iqdropdown').iqDropdown([
		{
  // max total items
  maxItems: 3,
  // min total items
  minItems: 0,
  // text to show on the dropdown
  selectionText: 'Item',
  // text to show for multiple items
  textPlural: 'items',
  // buttons to increment/decrement
  controls: {
    position: 'right',
    displayCls: 'iqdropdown-item-display',
    controlsCls: 'iqdropdown-item-controls',
    counterCls: 'counter'
  }}
]);
});


