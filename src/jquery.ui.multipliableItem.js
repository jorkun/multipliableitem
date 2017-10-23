/*
 * jQuery multipliableItem Plugin 1.0.0
 *
 * Copyright 2017, zhaokunkun
 */
(function($, undefined) {
	"use strict";
	var pluginName = "multipliableItem";
	var methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this),
					settings = $this.data(pluginName),
					serializeNum = 1;
				if (typeof settings === 'undefined') {
					var defaults = {
						// left input name
						leftName: "key",
						validate: false,
						// right input name
						rightName: "value",
						typeWrap: null,
						typeLabelText: "类型",
						itemLabelText: "类型",
						leftItemText: "参数名",
						rightItemText: "参数值",
						/*
						 * example: data:{
						 * type: [{
						 * 	 	"name": "string",
						 * 		title: "字符串"
						 * 	 },
						 *   {
						 *   	"name": "password",
						 *   	title: "非明文"
						 *    }
						 *  ],
						 *  items: {
						 *  "string": [{
						 *  	key: ....,
						 *  	value: ....,
						 *  },{
						 *  	key: ....,
						 *  	value: ....,
						 *  },{
						 *  	key: ....,
						 *  	value: ....,
						 *  }]
						 *  }
						 *  }
						 * 
						 */
						data: null
					};
					settings = $.extend({}, defaults, options);
					$this.data(pluginName, settings);
				} else {
					settings = $.extend({}, defaults, options);
				}

				function getFieldsHtml(type, hide, vBox) {
					return '<div class="ui-multipliable-item form-group item-type-' + type + '">' +
						'<label class="type-label ' + (hide ? 'ui-hidden-helper' : '') + '">' + settings.leftItemText + '</label>' +
						'<input type="hidden" name="type" value="' + type + '">' +
						'<input type="text" name="' + settings.leftName + '" value="' + (vBox ? vBox[0] : '') + '" class="left-input form-control ' + (hide ? 'ui-hidden-helper' : '') + '">' +
						'<div class="left-control-box ' + (hide ? 'ui-hidden-helper ' : '') + (type == 'radio' || type == 'checkbox' ? '' : 'ui-hidden-helper') + '"><button class="btn btn-primary add" type="button">+</button><button class="btn btn-default remove" type="button">-</button></div>' +
						'<label>' + settings.rightItemText + '</label>' +
						'<input type="' + (type == 'password' ? 'password' : 'text') + '" name="' + settings.rightName + '" value="' + (vBox ? vBox[1] : '') + '" class="right-input form-control">' +
						'<div class="right-control-box"><button class="btn btn-primary add" type="button">+</button><button class="btn btn-default remove" type="button">-</button></div>' +
						/*(settings.validate ? '<div class="error-box hidden"><span class="left"></span><span class="right"></span></div>' : '') +*/
						'</div>';
				}
				var datas = settings.data,
					typeBox = $this.children("div").eq(0).addClass("ui-multipliable-type"),
					fieldBox = $this.children("div").eq(1).addClass("ui-multipliable-container");
				$this.addClass("ui-multipliable-box");

				// init views
				function initView() {
					if (!fieldBox.children().length) {
						fieldBox.html('<label class="empty">未选择任何配置项！</label>');
					} else {
						fieldBox.find(".empty").remove();
						$.each(typeBox.find("input:checkbox"), function(i, v) {
							var type = $(v).attr("name");
							if (!fieldBox.find(".ui-multipliable-item.item-type-" + type).length && $(v).prop('checked')) {
								$(v).prop('checked', false).change();
							}
						});
					}
				}
				// init items
				function setData(index, typeObj, itemList) {
					if (itemList && itemList.length) {
						var keys = {};
						fieldBox.append('<div data-index="' + index + '" class="ui-multipliable-type item-type-' + typeObj.name + '"><label class="type-label">' + settings.itemLabelText + '</label><span>' + typeObj.title + '</span></div>');
						$.each(itemList, function(i, o) {
							var hide = (typeObj.name == 'checkbox' || typeObj.name == 'radio') && i > 0 && keys[o[settings.leftName]],
								tmpl = getFieldsHtml(typeObj.name, hide, [o[settings.leftName], o[settings.rightName]]);
							if (hide) {
								fieldBox.append($(tmpl).data({
									'type': typeObj.name
								}).addClass('number-' + (serializeNum - 1)));
							} else {
								fieldBox.append($(tmpl).data({
									'type': typeObj.name,
									'serializeNum': serializeNum
								}));
								serializeNum++;
							}
							if (!keys[o[settings.leftName]]) {
								keys[o[settings.leftName]] = true;
							}
						});
					}
				}
				// init types
				if (datas && datas.types) {
					typeBox.append('<label class="type-label">' + settings.typeLabelText + '</label>');
					if (typeof datas.types === 'object') {
						$.each(datas.types, function(i, o) {
							if(settings.typeWrap) {
								typeBox.append($(typeWrap).append('<input type="checkbox" ' + ((i == 0 && !datas.items) || (datas.items && datas.items[o.name] && datas.items[o.name].length) ? 'checked' : '') + ' name="' + o.name + '" data-index="' + i + '" title="' + o.title + '" id="' + o.name + '">')
								.append('<label for="' + o.name + '">' + o.title + '</label>'))
							} else {
								typeBox.append('<input type="checkbox" ' + ((i == 0 && !datas.items) || (datas.items && datas.items[o.name] && datas.items[o.name].length) ? 'checked' : '') + ' name="' + o.name + '" data-index="' + i + '" title="' + o.title + '" id="' + o.name + '">')
									.append('<label for="' + o.name + '">' + o.title + '</label>');
							}
							if (datas.items) {
								setData(i, o, datas.items[o.name]);
							}
						});
					} else {
						$.error('data error!');
					}
				} else {
					typeBox.html('<h5 class="empty">data or data.type option cannot empty.</h5>');
				}

				typeBox.on('change', 'input:checkbox', function() {
					var me = $(this),
						index = me.data("index"),
						type = me.attr("name"),
						title = me.attr("title"),
						nextTarget = fieldBox.find('[data-index="' + (index + 1) + '"]');
					if (me.prop("checked")) {
						var tmpl = $(getFieldsHtml(type)).data({ 'type': type, 'serializeNum': serializeNum });
						if (nextTarget.length) {
							nextTarget.before('<div data-index="' + index + '" class="ui-multipliable-type item-type-' + type + '"><label class="type-label">' + settings.itemLabelText + '</label><span>' + title + '</span></div>').before(tmpl);
						} else {
							fieldBox.append('<div data-index="' + index + '" class="ui-multipliable-type item-type-' + type + '"><label class="type-label">' + settings.itemLabelText + '</label><span>' + title + '</span></div>')
								.append(tmpl);
						}
						$this.trigger('item.addLine', ["init", type, tmpl, serializeNum]);
					} else {
						fieldBox.children(".item-type-" + type).remove();
						$this.trigger('item.removeLine', ["init", type, fieldBox.children(".item-type-" + type)]);
					}
					serializeNum++;
					initView();
				});
				if (datas && !datas.items) {
					typeBox.find("input:checkbox").change();
				}

				// left add
				fieldBox.on('click', '.left-control-box .add', function(e) {
					var $thisLine = $(e.target).closest('.ui-multipliable-item'),
						number = $thisLine.data('serializeNum'),
						type = $thisLine.data("type"),
						newLine,
						targetEl;
					if (type == 'radio' || type == 'checkbox') {
						newLine = $(getFieldsHtml(type)).data({
							'type': type,
							'serializeNum': serializeNum
						});
						targetEl = (targetEl = $thisLine.nextAll('.number-' + number)).length ? targetEl.last() : $thisLine;
						targetEl.after(newLine);
						$this.trigger('item.addLine', ["left", targetEl, newLine, serializeNum]);
					}
					serializeNum++;
				});

				// left remove
				fieldBox.on('click', '.left-control-box .remove', function(e) {
					var $thisLine = $(e.target).closest('.ui-multipliable-item'),
						number = $thisLine.data('serializeNum'),
						type = $thisLine.data("type");
					if (type == 'radio' || type == 'checkbox') {
						$thisLine.nextAll('.number-' + number).remove();
						$thisLine.remove();
						$this.trigger('item.removeLine', ["left", $thisLine, number]);
						initView();
					}
				});
				// right add
				fieldBox.on('click', '.right-control-box .add', function(e) {
					var $thisLine = $(e.target).closest('.ui-multipliable-item'),
						number = $thisLine.data('serializeNum'),
						newLine,
						type = $thisLine.data("type");
					if (type == 'radio' || type == 'checkbox') {
						if (!number) {
							$.each($thisLine.attr('class').split(' '), function() {
								if (this.startsWith('number-')) {
									number = this.split('-')[1];
									return false;
								}
							});
						}
						newLine = $(getFieldsHtml(type, true, [$thisLine.find('.left-input').val(), ""])).data("type", type);
						newLine.addClass('number-' + number);
						$thisLine.after(newLine);
						$this.trigger('item.addLine', ["right", $thisLine, newLine, number]);
					} else {
						newLine = $(getFieldsHtml(type)).data("type", type).data("serializeNum", serializeNum);
						$thisLine.after(newLine);
						$this.trigger('item.addLine', ["right", $thisLine, newLine, serializeNum]);
					}
					serializeNum++;
				});

				// right remove
				fieldBox.on('click', '.right-control-box .remove', function(e) {
					var $thisLine = $(e.target).closest('.ui-multipliable-item'),
						type = $thisLine.data('type'),
						number = $thisLine.data('serializeNum');
					if (type == 'radio' || type == 'checkbox') {
						if (number) {
							var nextLine = $thisLine.next('.number-' + number);
							if (nextLine.length) {
								nextLine.removeClass('number-' + number).data('serializeNum', number).find('.ui-hidden-helper').removeClass('ui-hidden-helper');
							}
						} else {
							$.each($thisLine.attr('class').split(' '), function() {
								if (this.startsWith('number-')) {
									number = this.split('-')[1];
									return false;
								}
							});
						}
					}
					$thisLine.remove();
					$this.trigger('item.removeLine', ['right', $thisLine, number]);
					initView();
				});
				// Synchronous input value
				fieldBox.on("keyup", '.item-type-checkbox .left-input,.item-type-radio .left-input', function(e) {
					var $thisInput = $(e.target),
						$thisLine = $thisInput.closest('.ui-multipliable-item'),
						number = $thisLine.data('serializeNum');
					$thisLine.nextAll('.number-' + number).each(function() {
						$(this).find('.left-input').val($thisInput.val());
					});
				});
			});
		},
		destroy: function() {
			return $(this).each(function() {
				var $this = $(this);
				$this.removeClass().children().removeClass(function(index, oldClass){
					var reg = /\ui-multipliable-\b/;
					return oldClass.replace(reg,'');
				}).removeData().html('');
				$this.removeData(pluginName).removeClass();

			});
		},
		value: function() {}
	};

	$.fn[pluginName] = function() {
		var method = arguments[0];
		if (methods[method]) {
			// 如果方法存在，存储起来以便使用
			return methods[method].call(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			// 如果传入的是一个对象参数，或者根本没有参数，init方法会被调用
			return methods.init.apply(this, arguments);
		} else {
			// 如果方法不存在或者参数没传入，则报出错误。需要调用的方法没有被正确调用
			$.error("Method" + method + "does not exsit on $.multipliableItme");
			return this;
		}
	};
})(jQuery, window, document);