function seniorEffect(obj, arrJson, fnEnd) {
	var i = 0;
	var _this = this;
	this.B = '';
	this.judge = navigator.userAgent.toLowerCase();
	if (this.judge.indexOf('webkit') != -1) {
		this.B = 'Webkit';
	}
	 else if (this.judge.indexOf('msie') != -1) {
		this.B = 'ms';
	}
	 else if (this.judge.indexOf('firefox') != -1) {
		this.B = 'Moz';
	}
	 else if (this.judge.indexOf('opera') != -1) {
		this.B = 'O';
	}
	 else {
		this.B = '';
	};
	function next() {
		var type = arrJson[i].type;
		var time = arrJson[i].time;
		var end = arrJson[i].end;
		if (typeof time == 'string') {
			if (time.indexOf('ms') != -1) {
				time = parseInt(time);
			}
			 else {
				time = parseInt(time) * 1000;
			}
		};
		delete arrJson[i].type;
		delete arrJson[i].time;
		delete arrJson[i].end;
		_this.move(obj, arrJson[i], {
			time: time,
			type: type,
			end: function() {
				end && end();
				i++;
				if (i < arrJson.length) {
					next();
				}
				 else {
					fnEnd && fnEnd();
				}
			}
		});
	}
	next();
};
seniorEffect.prototype.move = function(obj, json, options) {
	var _this = this;
	options = options || {};
	options.time = options.time || 0.7;
	options.type = options.type || 'ease';
	setTimeout(function() {
		_this.setStyle3(obj, 'transition', options.time + 's all ' + options.type);
		setTimeout(function() {
			for (var i in json) {
				_this.setStyle3(obj, i, json[i]);
			}
			setTimeout(function() {
				_this.setStyle3(obj, 'transition', 'all 0 ease 0');
				options.end && options.end.call(obj);
			},
			options.time * 1000);
		},
		0);
	},
	0);
};
seniorEffect.prototype.setStyle3 = function(obj, name, value) {
	var isCss3 = {
		transform: 1,
		transition: 1,
		filter: 1
	};
	isCss3[name] ? obj.style[this.B + name.charAt(0).toUpperCase() + name.substring(1)] = value: obj.style[name] = value;
};
var s = 0
var arr = ['image/9904.jpg', 'image/6876.jpg', 'image/9903.jpg'];
var typeList = ['ease', 'ease-in', 'ease-out', 'ease-in-out'];
function setStyle(obj, json) {
	for (var i in json) {
		obj.style[i] = json[i];
	};
};
var oDiv = document.getElementById('myWorksdiv1');
var R = 6;
var C = 5;
var k = 0;
function b(n, m)
 {
	return parseInt(Math.random() * (m - n)) + n;
}
setInterval(function() {
	if (s == arr.length - 1) s = -1;
	s++
	for (var i = 0; i < R; i++) {
		for (var j = 0; j < C; j++) {
			var oNewDiv = document.createElement('div');
			oNewDiv.className = 'box';
			var w = oDiv.offsetWidth / C;
			var h = oDiv.offsetHeight / R;
			oNewDiv.style.background = 'url(' + arr[k] + ') repeat -' + j * w + 'px -' + i * h + 'px';
			oNewDiv.style.display = 'none';
			setStyle(oNewDiv, {
				width: w + 'px',
				height: h + 'px',
				left: j * w + 'px',
				top: i * h + 'px'
			});
			oDiv.appendChild(oNewDiv);
		}
	};
	var aDiv = oDiv.children;
	setTimeout(function() {
		oDiv.innerHTML = '';
	},
	4500)
	 for (var i = 0; i < aDiv.length; i++) {
		aDiv[i].style.display = 'block';
	}
    setTimeout(function() {
    	for (var i = 0; i < aDiv.length; i++) {
		var lol = b(0, 50);
		new seniorEffect(aDiv[i], [{
			transform: 'rotate(' + b( - 300, 300) + 'deg) rotateY(' + b( - 300, 300) + 'deg) rotateX(' + b( - 300, 300) + 'deg)',
			left: b( - 300, 900) + 'px',
			top: b( - 300, 600) + 'px',
			time: b(1, 3),
			opacity: 0,
			boxShadow: '0 0 25px black',
			width: lol + '%',
			height: lol + '%',
			type: typeList[b(0, 5)]
			}])
		}
    },30);
	oDiv.style.backgroundImage = 'url(' + arr[s] + ')';
	k = s;
},
5000);