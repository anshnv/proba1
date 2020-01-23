import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(function() {
        
        $('.guest .iqdropdown').iqDropdownGuest({
          // min total items
					minItems: 0,
          // max total items
					maxItems: 20,
					// text to show on the dropdown
          selectionText: 'Сколько гостей',
					textPlural: 'гость',
					textPluralDeclination:['гость','гостя','гостей'],
          items: {},
					controls: {
						position: 'right',
						displayCls: 'iqdropdown-item-display',
						controlsCls: 'iqdropdown-item-controls',
						counterCls: 'counter'
					},
          // buttons to increment/decrement
					// fires when an item quantity changes
					onChange: function(id, count, totalItems) {
            //console.log(id, count, totalItems);
          },
					// return false to prevent an item decrement
          beforeDecrement: (id, itemCount) => true,
					// return false to prevent an item increment
					beforeIncrement: (id, itemCount) => {return true;}
        });
				// Функция iqDropdown в качестве параметра получает ассоциатиный массив
      });

/* global jQuery */

// plugin styles


/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
		textPluralDeclination:['item','items','items'],
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
  };

  $.fn.iqDropdownGuest = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      const $items = $menu.find('div.iqdropdown-menu-option');
      const settings = $.extend(true, {}, defaults, options);
      const itemCount = {};
      let totalItems = 0;
			
			//Мои добавления ------начало
			
			const Declinations=settings.textPluralDeclination; //строка хранит склонения
			//console.log('textPluralDeclination', settings.textPluralDeclination, Declinations);
			
			//Мои добавления ------конец
			
      function updateDisplay () {
				var Display;
				Display =	(totalItems==1)?Declinations[0]:
												((totalItems>1)&&(totalItems<5))? Declinations[1]:Declinations[2];
				//console.log('totalItems', totalItems, 'Display', Display);
        const usePlural = totalItems !== 0 && settings.textPlural.length > 0;
        const text = usePlural ? Display : settings.selectionText;
				if (totalItems!== 0){
					$selection.html(`${totalItems} ${text}`);
					} else {
						$selection.html(`${text}`);
					}
      }

      function setItemSettings (id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls (id, $item) {
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
				/* console.log('$item', $item, '$controls', $controls, 'controlsCls', settings.controls.controlsCls); */
        const $decrementButton = $(`
          <button class="button-decrement">
            <i class="icon-decrement"></i>
          </button>
        `);
        const $incrementButton = $(`
          <button class="button-increment">
            <i class="icon-decrement icon-increment"></i>
          </button>
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);
				//console.log('$counter', $counter);

        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }

        $decrementButton.click((event) => {
          const { items, minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });
//Мои добавления ------начало
				
	/* $cleanButton.click(event => event.stopPropagation()); */
				
	// return $cleanButton;
				
				// $cleanButton.click((event) => {
          // const { items, maxItems, beforeIncrement, onChange } = settings;
          //const allowClick = beforeIncrement(id, itemCount);

          //if (totalItems !== 0 && itemCount[id] < items[id].maxCount) {
           // itemCount[id] = 0;
            ////totalItems += 1;
            //$counter.html(itemCount[id]);
           // updateDisplay();
            //onChange(id, itemCount[id], totalItems);
         // }

         // event.preventDefault();
        //});
				
//Мои добавления ------конец

        $item.click(event => event.stopPropagation());
				
        return $item;
			
				
      }
// Открывает или закрывает меню (добавляет или удаляет класс)
      $this.click(() => {
        $this.toggleClass('menu-open');
      });
//Мои добавления Снимаем обработку click с дочернего элемента------начало			
	const $cleanButton = $('.textClean');
			//console.log('$cleanButton', $cleanButton);
			$cleanButton.click(event => event.stopPropagation()); 
			
			const $makeButton = $('.textMake');
			//console.log('$makeButton', $makeButton);
			$makeButton.click(event => event.stopPropagation()); 
			
//Мои добавления Снимаем обработку click с дочернего элемента------конец			
      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
      });
//Мои добавления ------начало
			
		
//Мои добавления ------конец				
      updateDisplay();
    });
		
    return this;
		
  };
	
}(jQuery));

    
