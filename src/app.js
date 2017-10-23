var multipliableItem = require('./jquery.crp.multipliableItem');
require("./../node_modules/bootstrap/dist/css/bootstrap.min.css");
require('./jquery.crp.multipliableItem.css');
require('./demo.css');
$("#demo1").multipliableItem({
	typeLabelText: "参数类型",
	itemLabelText: "类型",
	validate: true,
	leftName: "paramName",
	rightName: "paramValue",
	data: {
		types: [{
			name: "string",
			title: "字符串"
		}, {
			name: "password",
			title: "非明文"
		}, {
			name: "radio",
			title: "单选按钮组"
		}, {
			name: "checkbox",
			title: "多选按钮组"
		}],
		items: null
	}
});
$("#demo1").on("item.addLine", function(e, a1, a2, a3, a4) {
	console.log(a1, a2, a3, a4);
})

$("#demo2").multipliableItem({
	typeLabelText: "参数类型",
	itemLabelText: "类型",
	validate: true,
	leftName: "paramName",
	rightName: "paramValue",
	data: {
		types: [{
			name: "string",
			title: "字符串"
		}, {
			name: "password",
			title: "非明文"
		}, {
			name: "radio",
			title: "单选按钮组"
		}, {
			name: "checkbox",
			title: "多选按钮组"
		}],
		items: {
			"string": [{
				"paramName": "key",
				"paramValue": "32"
			}, {
				"paramName": "key1",
				"paramValue": "323"
			}],
			"password": [{
				"paramName": "server",
				"paramValue": "********"
			}, {
				"paramName": "server1",
				"paramValue": "********"
			}],
			"radio": [{
				"paramName": "key3",
				"paramValue": "32dasd",
			}, {
				"paramName": "key3",
				"paramValue": "asdf",
			}, {
				"paramName": "key5",
				"paramValue": "asddasdf"
			}],
			"checkbox": [{
				"paramName": "key4",
				"paramValue": "32dasd",
			}, {
				"paramName": "key4",
				"paramValue": "asdf",
			}, {
				"paramName": "key4",
				"paramValue": "asdf",
			}, {
				"paramName": "key4",
				"paramValue": "asdasdasd",
			}, {
				"paramName": "key4",
				"paramValue": "as000df",
			}, {
				"paramName": "key4",
				"paramValue": "as000df",
			}, {
				"paramName": "key8",
				"paramValue": "asddasdf"
			}, {
				"paramName": "key8",
				"paramValue": "asddasdf"
			}]
		}
	}
});