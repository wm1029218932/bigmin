/**
 * jSelect 
 * wang ye
 * v-1.1
 */
+function($){  
	
	$.sinosoft = $.sinosoft || {version: '@VERSION'};
	
	var tool = $.sinosoft.select = {
		conf: {
			anim:true,
			animTime:200,
			disable : false,
			options:[
			         
			],
			valName: 'value',
			onSelect:function(){},
			beforeSelect:function(){return true;},//ѡ��ǰ���������������false��������ѡ��
			css:{
				input:'selector',
				text:'text',
				list:'selector-list',
				mask:'selector-mask',
				mask_show:'open',
				list_open:'open',
				item:'list-item',
				last_item:'last',
				hover:'hover',
				disable:'disabled'
			}
		} 		
	};
	
	var border = ['border-top-width','border-top-color','border-top-css',
	              'border-left-width','border-left-color','border-left-css',
	              'border-bottom-width','border-bottom-color','border-bottom-css',
	              'border-right-width','border-right-color','border-right-css'
	              ],
		padding = ['padding-left','padding-top','padding-right','padding-bottom'],
		margin = ['margin-left','margin-top','margin-right','margin-bottom'],
		font = ['font-size','font-variant','font-weight','font-style'];
	
	
	function getScrollWidth() {
	  var noScroll, scroll, oDiv = document.createElement("DIV");
	  oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
	  noScroll = document.body.appendChild(oDiv).clientWidth;
	  oDiv.style.overflowY = "scroll";
	  scroll = oDiv.clientWidth;
	  document.body.removeChild(oDiv);
	  return noScroll-scroll;
	}
	
	function getUppercase(str){
		var index = 0;
		while((index = str.indexOf('-')) != -1){
			var char = str.charAt(index+1);
			
			var _str1 = str.substring(0,index);
			var _str2 = str.substr(index+2);
			str = _str1 + char.toUpperCase() + _str2;
		}
		return str;
	}
	
	function getCss(style,src,obj){
		for ( var i = 0; i < style.length; i++) {
			obj[getUppercase(style[i])] = src.css(style[i]);
		}
	}
	
	function buildOptions(list,items,css){
		var txt = '<div>',
			default_select = 0;

		for(var i = 0; i < items.length ; i++){
			var item = $(txt).addClass(css.item);
			item.text(items[i].name);
			item.attr(tool.conf.valName,items[i].value);
			item.attr('title',items[i].name);
			if(items[i].selected && (items[i].selected == true || items[i].selected == 'true')){
				default_select = i;
			}
			
			if(i == items.length - 1){
				item.addClass(css.last_item);
			}
			list.append(item);
		}
		return default_select;
	}
	
	function buildOptionsFromSelect(list,select,css){
		var txt = '<div>',
			items = select.find('option'),
			default_select = 0;
		
		for(var i = 0; i < items.length ; i++){
			var item = $(txt).addClass(css.item),
				opt = items.eq(i),
				name = opt.text();
			item.text(name);
			item.attr(tool.conf.valName,opt.val());
			item.attr('title',name);
			if(opt.attr('selected') || (opt.attr('selected') == 'selected')){
				default_select = i;
			}
			
			if(i == items.length - 1){
				item.addClass(css.last_item);
			}
			list.append(item);
		}
		return default_select;
	}
	
	function getNum(data,unit){
		if(!unit){
			unit = 'px';
		}
		return parseInt(data.replace(unit,''));
	}
	
	function cloneOuterStyle(src,dst){
		var width = src.outerWidth();
		var style = {
				width:width,
				float:src.css('float'),
				display:src.css('display')
		};
		getCss(margin,src,style);
		dst.css(style);
	}
	
	function cloneInnerStyle(src,dst){
		var style = {
				height:src.css('height')
		};
		getCss(padding,src,style);
		dst.css(style);
	}
	
	function cloneTextStyle(src,dst){
		
		var style = {
			lineHeight:src.css('height')
		};
		getCss(font,src,style);
		dst.css(style);
	}
	
	function calcListPosition(src,dst){
	  var scrollWidth = getScrollWidth();
		if(document.documentElement.clientWidth < 768 - scrollWidth){
//			dst.css({
//				'top':document.documentElement.clientHeight - dst.outerHeight(),
//				'left':0,
//				'min-width':0,
//				'width':'100%'
//			});
			
		}else{

			var top = src.offset().top + src.outerHeight(),
				width = getNum(src.css('width')) +getNum(src.css('padding-left'))+getNum(src.css('padding-right')),
				left = src.offset().left;
				
			if(width < 80){
				width = 80;
			}
			dst.css({
				'top':top,
				'left':left,
				'min-width':width,
				'width':width
			});
		}
	}
	
	function disableWindowScroll(){
	  $('body').addClass('mask-open');
	}
	function enableWindowScroll(){
	  $('body').removeClass('mask-open');
  }
	
	
	function JSelect(input ,conf){
		var self = this,  
			css = conf.css, 
			options = conf.options,
			root = $("<div><div><div></div><b></b></div></div>").data("jSelect", self),
			open = false,
			firstInit = true,
			default_select = 0,
			disable = conf.disable;
		
		// create range	 
		input.before(root);	
		var text = root.addClass(css.input).find('>div').eq(0),
			text_input = text.find('div'),
			text_icon = text.find('b'),
			list = $('<div>'),
			mask = $('.' + css.mask);
		
    if(mask.length == 0){
      mask = $('<div class="'+css.mask+'">');
      input.parents('body').append(mask);
    }
		
		input.parents('body').append(list);
		
		if(disable){
			root.addClass(css.disable);
		}
		
		text.addClass(css.text);
		
		list.addClass(css.list);
    
		if(input.is('select')){
			default_select = buildOptionsFromSelect(list,input,css);
		}else{
			default_select = buildOptions(list,options,css);
		}
		
		function openSelect(){
			
			text.addClass(css.hover);
			root.addClass(css.list_open);
			mask.addClass(css.mask_show);
			
			mask.css('height',document.body.scrollHeight);
			
			calcListPosition(text,list);
			disableWindowScroll();
			function openEnd(){
				open = true;
			}
			
			if(conf.anim){
				list.show(conf.animTime,function(){
					openEnd();
				});
			}else{
				list.show();
				setTimeout(function(){
					openEnd();
				});
			}
		}
		
		function closeSelect(){
			function closeEnd(){
				var height = getNum(text.css('height'));
				text.removeClass(css.hover);
				root.removeClass(css.list_open);
				mask.removeClass(css.mask_show);
				enableWindowScroll();
				open = false;
			}
			
			if(conf.anim){
				list.hide(conf.animTime,function(){
					closeEnd();
				});
			}else{
				list.hide();
				closeEnd();
			}
		}
		
		function select(item){
			if(conf.beforeSelect && conf.beforeSelect(item.attr(conf.valName)) === false){
				return;
			}
			select_by_value(item.text(),item.attr(conf.valName));
		}
		
		function select_by_value(name,value){
			text_input.text(name);
			text_input.attr('title',name.trim());
			
			input.val(value);
			input.change();
			
			if(conf.onSelect && !firstInit){
				conf.onSelect(self);
			}
		}
		
		function focus(){
			openSelect();
			document.body.scrollTop = (root.position().top-20);
			document.documentElement.scrollTop = (root.position().top-20); 
		}
		root.click(function(){
			if(!open && !disable){
				openSelect();
			}
		});
		
		list.find('.'+css.item).click(function(){
			select($(this));
			closeSelect();
		});
		
		input.parents('body').click(function(){
			if(open){
				closeSelect();
			}
		});
		
		mask.click(function(){
		  if(open){
        closeSelect();
      }
		});
		
		cloneOuterStyle(input,root);
		cloneInnerStyle(input,text);
		cloneTextStyle(input,text_input);
		
//		text.css('padding-right','43px');
//		text_icon.css('background-position-y',(text.outerHeight())/2);
		input.hide();
		
		input.focus(function(){
			focus();
		});
		
		root.css('z-index',1000-input.index('body input,body select'));
		
		$.extend(self, {  
			getValue: function() {
				return input.val();	
			},
			getName: function(){
				return text_input.text();
			},
			setValue: function(val, e) {
				var items = list.find('.'+css.item),
					hasVal = false;
				for(var i = 0 ; i< items.length ; i++){
					if(val == items.eq(i).val()){
						select(items.eq(i));
						hasVal = true;
					}
				}
				return hasVal;
			}, 	
			setFocus:function(){
				focus();
			},
			getOpen: function() {
				return open;
			},
			getConf: function() {
				return conf;	
			},
			getInput: function() {
				return input;	
			},
			update: function(update_options) {
				if(input.is('select')){
					list.empty();
					var i = buildOptionsFromSelect(list,input,css);
					
					list.find('.'+css.item).click(function(){
						select($(this));
					});
					
					select(list.find('.'+css.item).eq(i));
				}else{
					conf.options = update_options;
					list.empty();
					var i = buildOptions(list,update_options,css);
					
					list.find('.'+css.item).click(function(){
						select($(this));
					});
					
					select(list.find('.'+css.item).eq(i));
				}
			},
			clear: function(){
				text_input.text('');
				input.val('');
			},
			disable:function(){
				root.addClass(css.disable);
				disable = true;
			},
			enable:function(){
				root.removeClass(css.disable);
				disable = false;
			}
		});
		
		select(list.find('.'+css.item).eq(default_select));
		
		$(window).resize(function(){
			calcListPosition(text,list);
		});
		firstInit = false;
	}
	
	// jQuery plugin implementation
	$.fn.jSelect = function(conf) {

		// already installed
		if (this.data("jSelect")) { return this; } 
		// extend configuration with globals
		conf = $.extend(true, {}, tool.conf, conf);		
		
		var els = [];
		
		this.each(function() {				
			var el = new JSelect($(this), $.extend(true, {}, conf));		 
			el.getInput().data("jSelect", el);
			els.push(el);	
		});		
		
		return els; 
	};	
}(jQuery);