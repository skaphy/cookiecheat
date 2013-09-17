"use strict";

function create_cheating_element()
{
	var elem = document.createElement("div");
	elem.style.position = "absolute";
	elem.style.top = elem.style.left = "0";
	elem.style.width = "400px"; elem.style.height = "500px";
	elem.style.backgroundColor = "rgba(255,255,255,0.8)";
	elem.style.color = "#000";
	elem.style.overflow = "hidden";
	elem.style.zIndex = "1000000000000";

	// うまくいかないのでこのやり方はやめた
	elem.addEventListener("mouseover", function(){
		elem.style.width = "400px"; elem.style.height = "500px";
		elem.style.overflow = "auto";
	}, false);
	elem.addEventListener("mouseout", function(){
		elem.style.width = "100px"; elem.style.height = "20px";
		elem.style.overflow = "hidden";
	}, false);
	elem.style.width = "100px"; elem.style.height = "20px";
	/*
	var cheatelemStatus = 0;
	elem.addEventListener("dblclick", function(){
		if (cheatelemStatus == 0) {
			// 閉じているので開く
			elem.style.width = "400px"; elem.style.height = "500px";
			elem.style.overflow = "auto";
		} else {
			// 開いているので閉じる
			elem.style.width = "100px"; elem.style.height = "20px";
			elem.style.overflow = "hidden";
		}
	}, false);
	*/
	elem.style.width = "100px"; elem.style.height = "20px";
	document.getElementsByTagName("body")[0].appendChild(elem);

	elem.innerHTML = '<table id="cheats">';
	elem.innerHTML+= '</table>';

	return elem;
}

// title
// boolean
// integer

function add_cheat_boolean(title, current, enable_func, disable_func)
{
	var trelem = document.createElement("tr");
	var tdelem_title = document.createElement("td");
	var tdelem_bool = document.createElement("td");
	var checkbox = document.createElement("input");

	tdelem_title.innerText = title;
	checkbox.type = "checkbox";
	if (current) checkbox.checked = "checked";
	checkbox.addEventListener("click", function(){
		if (checkbox.checked) {
			console.log(enable_func);
			enable_func();
		} else {
			console.log(disable_func);
			disable_func();
		}
	}, false);

	trelem.appendChild(tdelem_title);
	trelem.appendChild(tdelem_bool);
	tdelem_bool.appendChild(checkbox);
	document.getElementById("cheats").appendChild(trelem);
}

function add_cheat_integer(title, func)
{
}

(function(){

	var cheatelem = create_cheating_element();
	for (var i in Game.Achievements) {
		(function (){
			var name = i;
			add_cheat_boolean(
				"[Achievement] " + name,
				Game.Achievements[i].won == 1,
				function(){Game.Win(name);},
				function(){
					Game.Achievements[name].won=0;
					Game.recalculateGains=1;
					Game.Popup('Achievement relocked :<br>'+Game.Achievements[name].name+'<br> ');
				}
			);
		})();
	}

})();
