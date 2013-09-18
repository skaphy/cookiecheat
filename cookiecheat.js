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

	document.body.addEventListener("mousemove", function() {
		if (event.pageX > 400+50 || event.pageY > 500+50) {
			elem.style.width = "100px"; elem.style.height = "20px";
			elem.style.overflow = "hidden";
		}
		else if (event.pageX <= 100 && event.pageY <= 20) {
			elem.style.width = "400px"; elem.style.height = "500px";
			elem.style.overflow = "auto";
		}
	}, false);
	elem.style.width = "100px"; elem.style.height = "20px";
	document.getElementsByTagName("body")[0].appendChild(elem);

	var reload_button = document.createElement("button");
	reload_button.innerText = "reload";
	reload_button.addEventListener("click", function(){
		document.getElementById("cheats").innerHTML = "";
		load_cheats();
	});
	elem.appendChild(reload_button);

	var table = document.createElement("table");
	table.id = "cheats";
	elem.appendChild(table);

	return elem;
}

function load_cheats()
{
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
	for (var i in Game.Objects) {
		(function (){
			var name = i;
			add_cheat_integer(
				"[Objects] " + name,
				Game.Objects[name].amount,
				function(value){
					Game.Objects[name].amount = value;
				}
			);
		})();
	}

	add_cheat_integer(
		"cookiesEarned",
		Game.cookiesEarned,
		function(value){
			// TODO: Infinityの時は別処理にしたい
			Game.cookiesEarned = parseInt(value, 10);
		}
	);
	add_cheat_integer(
		"cookies",
		Game.cookies,
		function(value){
			Game.cookies = parseInt(value, 10);
		}
	);
}

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
			enable_func();
		} else {
			disable_func();
		}
	}, false);

	trelem.appendChild(tdelem_title);
	trelem.appendChild(tdelem_bool);
	tdelem_bool.appendChild(checkbox);
	document.getElementById("cheats").appendChild(trelem);
}

// funcは引数を1つ取り、返り値に変更後の値を渡す
function add_cheat_integer(title, current, func)
{
	var trelem = document.createElement("tr");
	var tdelem_title = document.createElement("td");
	var tdelem_bool = document.createElement("td");
	var inputbox = document.createElement("input");

	tdelem_title.innerText = title;
	if (current) inputbox.value = current;
	inputbox.addEventListener("change", function(){
		func(inputbox.value);
	}, false);

	trelem.appendChild(tdelem_title);
	trelem.appendChild(tdelem_bool);
	tdelem_bool.appendChild(inputbox);
	document.getElementById("cheats").appendChild(trelem);
}

// 値を取らない動作をするときのため
// RuinTheFun実行など
function add_cheat_button(title, func)
{
}

(function(){

	var cheatelem = create_cheating_element();
	load_cheats();

})();
