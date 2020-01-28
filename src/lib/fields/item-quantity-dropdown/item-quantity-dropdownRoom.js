import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(function() {
        
        $('.room .iqdropdown').iqDropdownRoom({
          // min total items
					minItems: 2,
          // max total items
					maxItems: 20,
					// text to show on the dropdown
          selectionText: '1 спальня 1 кровать',
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
				// Функция iqDropdownMy в качестве параметра получает ассоциатиный массив
      });

/* global jQuery */

// plugin styles
//import 'styles/main.scss';

/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
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

  $.fn.iqDropdownRoom = function (options) {
    this.each(function () {
      const $this = $(this);
			//console.log($this);
      const $selection = $this.find('p.iqdropdown-selection').last();
			//console.log($selection);
      const $menu = $this.find('div.iqdropdown-menu');
			//console.log($menu);
      const $items = $menu.find('div.iqdropdown-menu-option');
			//console.log($items);//Атрибуты
			//0: <div class="iqdropdown-menu-option" 
								//data-id="спальни" 
								//data-defaultcount="1" 
								//data-mincount="1" 
								//id-declination="спальня,спальни,спален" - моё добавление
			
			//Мои добавления ------начало
			const dataId=[];//массив строк, хранит ключи
			const idDeclination=[];//массив строк, элемент хранит строку склонения каждого элемента меню
			const idDeclinationArray=[];//2-мерный массив строк, строки склонения превращены в массивы
			var lengthItems =$($items).length;
			//console.log('lengthItems', lengthItems);
			for(var i = 0; i < lengthItems; i++) 
			{
				dataId.push($($items[i]).attr('data-id'));
				idDeclination.push($($items[i]).attr('id-declination'));
			};
			//console.log('dataId', dataId, 'idDeclination', idDeclination,);
			for(var i = 0; i < lengthItems; i++) 
			{//console.log('i', i);
				idDeclinationArray[i] = new Array(3);
				idDeclinationArray[i] = idDeclination[i].split(',');
				//console.log('i', i, 'idDeclinationArray[i]', idDeclinationArray[i]);	
			};
			var idDisplay=['спальня','кровать','ванных комнат'] ;	// элемент массива содержит текст для ключа согласно склонению	
			//Мои добавления ------конец
			
      const settings = $.extend(true, {}, defaults, options);//опции
      const itemCount = {};//ассоциативный массив {'спальни':1,'кровати':2,'ванные комнаты':0}
      let totalItems = 0;//общее количество элементов
//Заполнение поля input
      function updateDisplay (id, idDeclinationArray, count, ItemCount) {
        //console.log('upid', id, 'count', count);
				const usePlural = totalItems !== 2 && settings.textPlural.length > 0;
        const text = settings.selectionText;
				
				 
				 //Формирование текста для ключей согласно склонению
				 
					var indexId=dataId.indexOf(id);
					//console.log('id', id, 'indexId', indexId, 'count', count);
					
						if (indexId>-1){
							idDisplay[indexId]=	(count==1)?idDeclinationArray[indexId][0]:
												((count>1)&&(count<5))? idDeclinationArray[indexId][1]:idDeclinationArray[indexId][2];
							//console.log('key', id, 'count', count, 'indexId', indexId, 'idDisplay[i]', idDisplay[indexId]);					
						}		
				//Формироание текста для ключей согласно склонению-----конец
				//console.log('usePlural', usePlural);
				if (usePlural){$selection.html(`${ItemCount['спальни']} ${idDisplay[0]} ${ItemCount['кровати']} ${idDisplay[1]} ${' ...'}`)} else
				 $selection.html(`${text}`);
      };

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
				
				//Мои добавления Замена иконки в button-increment----начало
				$($incrementButton).html('+').css({'color':'rgba(31, 32, 65, 0.50)','font-size':'1rem','display':'inline-block'});
				//Мои добавления----конец
				
				//Мои добавления Замена иконки в button-decrement----начало
				$($decrementButton).html('-').css({'color':'rgba(31, 32, 65, 0.05)','font-size':'1rem','display':'inline-block'});
				//Мои добавления----конец
				
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

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
					//console.log('-items', items, 'id', id, 'items[id]', items[id],'allowClick', allowClick, 'totalItems', totalItems, 'minItems', minItems, 'itemCount[id]', itemCount[id]);
					if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
						$counter.html(itemCount[id]);
						
//Мои добавления----начало
						//Изменение цвета кнопки decrement----начало
						if(itemCount[id]==items[id].minCount){						
						$("div[data-id = '" +id+ "'] .button-decrement").css({'border':'1px solid rgba(31, 32, 65, 0.05)'});
						
						$($decrementButton).css({'color':'rgba(31, 32, 65, 0.05)'});
						};
						//Изменение цвета кнопки decrement----конец
//Мои добавления----конец
						var count=itemCount[id];
						//console.log('-id', id);
						updateDisplay(id, idDeclinationArray, count, itemCount);
            onChange(id, itemCount[id], totalItems);
					}

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);
					//console.log('+items', items, 'id', id, 'items[id]', items[id],'allowClick', allowClick, 'totalItems', totalItems, 'maxItems', maxItems, 'itemCount[id]', itemCount[id]);
          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
						$counter.html(itemCount[id]);
						
//Мои добавления----начало
						//Изменение цвета кнопки decrement----начало
												
						$("div[data-id = '" +id+ "'] .button-decrement").css({'border':'1px solid rgba(31, 32, 65, 0.5)'});
						
						/* $("div[data-id = '" +id+ "'] .icon-decrement").css({'color':'rgba(31, 32, 65, 0.50)'}); */
						
						$($decrementButton).css({'color':'rgba(31, 32, 65, 0.50)'});
						
						//Изменение цвета кнопки decrement----конец
//Мои добавления----конец
						
						var count=itemCount[id]
						//console.log('+id', id, 'count', count);
						
						
						updateDisplay(id, idDeclinationArray, count, itemCount);
            onChange(id, itemCount[id], totalItems);
						
						
          }

          event.preventDefault();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }

      $this.click(() => {
        $this.toggleClass('menu-open');
      });

      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
				//console.log('!id', id);
      });
      
			updateDisplay();
    });

    return this;
  };
}(jQuery));
