import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(function() {
	(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'Items',
		
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

  $.fn.iqDropdownMy = function (options) {
    this.each(function () {
      const $this = $(this);
			//console.log($this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      //console.log($menu);
			const $items = $menu.find('div.iqdropdown-menu-option');
			//console.log($items);			
			const dataId=[];
			const idDeclination=[];//массив строк, элемент хранит строку склонения каждого элемента меню
			const idDeclinationArray=[];//2-мерный массив строк, строки склонения превращены в массивы
			var lengthItems =$($items).length;
			//console.log('lengthItems', lengthItems);
			for(var i = 0; i < lengthItems; i++) 
			{
				dataId.push($($items[i]).attr('data-id'));
				idDeclination.push($($items[i]).attr('id-declination'));
			}
			
			var length=idDeclination.length-1
			for(var i = 0; i < lengthItems; i++) 
			{//console.log('i', i);
			idDeclinationArray[i] = new Array(3);
			idDeclinationArray[i] = idDeclination[i].split(',');
			console.log('idDeclinationArray[i]', idDeclinationArray[i]);	
			}		
				//console.log('idDeclinationArray', idDeclinationArray);		
			//$items.each(function ()			{console.log('Атрибут $items', $($items).attr('data-id'));}) - не работает
						
      const settings = $.extend(true, {}, defaults, options);//опции
      const itemCount = {};//ассоциативный массив {'спальни':1,'кровати':2,'ванные комнаты':0}
      let totalItems = 0; //общее количество элементов

      function updateDisplay () {
        //const usePlural = totalItems !== 2 && settings.textPlura.length > 0;
        //const text = usePlural ? settings.textPlura1 : settings.selectionText;
				//console.log('itemCount', itemCount);
				
				var idDisplay = [];
				//var itemDeclination =[];
				for(var i = 0; i < lengthItems; i++) 
				{//console.log(lengthItems, 'idDeclinationArray[i]', idDeclinationArray[i]); //idDeclinationArray[i],dataId[i]);
				var key=dataId[i];
				//itemDeclination=idDeclinationArray[i];
				console.log('itemCount', itemCount, 'itemCount[key]', itemCount[key],); 
				idDisplay[i]=(itemCount[key]=0)? idDeclinationArray[i][2]:
					(itemCount[key]=1)?idDeclinationArray[i][0]:
													(itemCount[key]<5)? idDeclinationArray[i][1]:idDeclinationArray[i][2];
				console.log('idDisplay', idDisplay, 'itemCount', itemCount, 'itemCount[i]', itemCount[key], key);									
				
				}
        if (totalItems !== 2) 
				{$selection.html(`${itemCount[dataId[0]]} ${idDisplay[0]} ${itemCount[dataId[1]]} ${idDisplay[1]} ${itemCount[dataId[2]]} ${idDisplay[2]}`);} else {
					$selection.html(`${settings.selectionText}`);
					
				console.log('idDisplay', idDisplay, 'itemCount', itemCount);	
				
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

        $item.click(event => event.stopPropagation());

        return $item;
      }

      $this.click(() => {
        $this.toggleClass('menu-open');
      });

      $items.each(function () {
        const $item = $(this);//элемент меню
				const id = $item.data('id');//назание
				const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;//назание
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
      });

      updateDisplay();
    });

    return this;
  };
}(jQuery))
	$('.iqdropdown').iqDropdownMy(
	{
  // max total items
  maxItems: 20,
  // min total items
  minItems: 0,
  // text to show on the dropdown
	selectionText: '1 спальня 1 кровать',
   
  // buttons to increment/decrement
  items: {},
	controls: {
    position: 'right',
    displayCls: 'iqdropdown-item-display',
    controlsCls: 'iqdropdown-item-controls',
    counterCls: 'counter'
  },
	
// fires when an item quantity changes
  onChange: (id, count, totalItems) => {
		//console.log(id, ' ', count, ' ', totalItems)
    //console.log(this)
		
	},
  // return false to prevent an item decrement
  beforeDecrement: (id, itemCount) => true,
  // return false to prevent an item increment
  beforeIncrement: (id, itemCount) => {return true;}
}
)


})