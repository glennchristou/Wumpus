//tabbed panels

// declare globals to hold all the links and all the panel elements
var tabLinks;
var path1;
var path2;
var path3;
var currentCave;
var pitCave;
var wumpusCave;
var tabPanels;
var arrows =3;

// Run the function that assigns unique, random cave numbers to where you are, where the Wumpus is and where the Pit is. //
assignCaves();

// Figure out what caves are adjacent to current cave. //
nearbyRooms(currentCave);

// Do you smell a Wumpus or feel a draft initially? //
pitOrWumpusWarning();

// Initialize and Update display//
function update(){
	document.getElementById("t0").innerHTML = "You are in Cave: " + currentCave;
	document.getElementById("t1").innerHTML = path1;
	document.getElementById("t2").innerHTML = path2;
	document.getElementById("t3").innerHTML = path3;
	document.getElementById("shootA").innerHTML = path1;
	document.getElementById("shootB").innerHTML = path2;
	document.getElementById("shootC").innerHTML = path3;

	document.getElementsByClassName("myCave")[0].textContent = "You are in Cave: " + currentCave + ".";
	document.getElementsByClassName("pathOptions")[0].textContent = "Tunnels lead to Caves: " + path1 + ", " + path2 + " and " + path3 + ".";
	document.getElementsByClassName("arrowAmount")[0].textContent = "You have " + arrows + " arrows left.";
	console.log("myCave=", + currentCave + ", wumpusCave=", + wumpusCave + ", pitCave=" + pitCave);
	if (currentCave === wumpusCave){
		document.getElementById("main").innerHTML = "You are dead! You've been eaten by the Wumpus!";
		document.getElementById("image").src = "_images/wampanew.jpg";
		document.getElementsByClassName("current")[0].textContent = "";
		document.getElementsByClassName("arrowAmount")[0].textContent = "";
		document.getElementsByClassName("click")[0].textContent = "";
		document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
		document.getElementById("hideReset").id = "showReset";
		document.getElementById("showShoot").id = "hideShoot";
	}
	if (currentCave === pitCave){
		document.getElementById("main").innerHTML = "You are dead! You have fallen into the pit!";
		document.getElementById("image").src = "_images/bottomless-pit.jpg";
		document.getElementsByClassName("current")[0].textContent = "";
		document.getElementsByClassName("arrowAmount")[0].textContent = "";
		document.getElementsByClassName("click")[0].textContent = "";
		document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
		document.getElementById("hideReset").id = "showReset";
		document.getElementById("showShoot").id = "hideShoot";
	}
}

update();

// Assign initial cave to Wumpus and The Pit. They cannot be the same as each other or where you are at. //


window.onload=function() {

	// when the page loads, grab the li elements
	tabLinks = document.getElementById("tabs").getElementsByTagName("li");

	// Now get all the tab panel container divs
	tabPanels = document.getElementById("containers").getElementsByTagName("div");

	// activate the _first_ one
	displayPanel(tabLinks[0]);

	// listener for instructions button //
	document.getElementById("instructions").addEventListener("click", function(){
		window.open("instructions.htm", "_blank", "width=500, height=350");
	});

	// listener for Shoot Button //
	document.getElementById("showShoot").addEventListener("click", function(){
		document.getElementById("shootA").classList.add("shootButtonsOn1");
		document.getElementById("shootA").classList.remove("shootButtonsOff");
		document.getElementById("shootB").classList.add("shootButtonsOn2");
		document.getElementById("shootB").classList.remove("shootButtonsOff");
		document.getElementById("shootC").classList.add("shootButtonsOn3");
		document.getElementById("shootC").classList.remove("shootButtonsOff");
	});

	// listeners for Shoot Target Buttons //
	document.getElementById("shootA").addEventListener("click", function(){
		if (path1 === wumpusCave){
			document.getElementById("main").innerHTML = "You have killed the Wumpus!!";
			document.getElementById("image").src = "_images/montauk-monster.jpg";
			document.getElementsByClassName("current")[0].textContent = "";
			document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
			document.getElementsByClassName("arrowAmount")[0].textContent = "";
			document.getElementsByClassName("click")[0].textContent = "";
			document.getElementById("shootA").classList.remove("shootButtonsOn1");
			document.getElementById("shootA").classList.add("shootButtonsOff");
			document.getElementById("shootB").classList.remove("shootButtonsOn2");
			document.getElementById("shootB").classList.add("shootButtonsOff");
			document.getElementById("shootC").classList.remove("shootButtonsOn3");
			document.getElementById("shootC").classList.add("shootButtonsOff");
			document.getElementById("hideReset").id = "showReset";
			document.getElementById("showShoot").id = "hideShoot";
		} else {
			youMissed();
		}
	});


	document.getElementById("shootB").addEventListener("click", function(){
		if (path2 === wumpusCave){
			document.getElementById("main").innerHTML = "You have killed the Wumpus!!";
			document.getElementById("image").src = "_images/montauk-monster.jpg";
			document.getElementsByClassName("current")[0].textContent = "";
			document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
			document.getElementsByClassName("arrowAmount")[0].textContent = "";
			document.getElementsByClassName("click")[0].textContent = "";
			document.getElementById("shootA").classList.remove("shootButtonsOn1");
			document.getElementById("shootA").classList.add("shootButtonsOff");
			document.getElementById("shootB").classList.remove("shootButtonsOn2");
			document.getElementById("shootB").classList.add("shootButtonsOff");
			document.getElementById("shootC").classList.remove("shootButtonsOn3");
			document.getElementById("shootC").classList.add("shootButtonsOff");
			document.getElementById("hideReset").id = "showReset";
			document.getElementById("showShoot").id = "hideShoot";
		} else {
			youMissed();
		}
	});

	document.getElementById("shootC").addEventListener("click", function(){
		if (path3 === wumpusCave){
			document.getElementById("main").innerHTML = "You have killed the Wumpus!!";
			document.getElementById("image").src = "_images/montauk-monster.jpg";
			document.getElementsByClassName("current")[0].textContent = "";
			document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
			document.getElementsByClassName("arrowAmount")[0].textContent = "";
			document.getElementsByClassName("click")[0].textContent = "";
			document.getElementById("shootA").classList.remove("shootButtonsOn1");
			document.getElementById("shootA").classList.add("shootButtonsOff");
			document.getElementById("shootB").classList.remove("shootButtonsOn2");
			document.getElementById("shootB").classList.add("shootButtonsOff");
			document.getElementById("shootC").classList.remove("shootButtonsOn3");
			document.getElementById("shootC").classList.add("shootButtonsOff");
			document.getElementById("hideReset").id = "showReset";
			document.getElementById("showShoot").id = "hideShoot";
		} else {
			youMissed();
		}
	});

	// attach event listener to links using onclick and onfocus, fire the displayPanel function, return false to disable the link
	for (var i = 0; i < tabLinks.length; i++) {
		tabLinks[i].onclick = function() {
			displayPanel(this);
			return false;
		};
		tabLinks[i].onfocus = function() {
			displayPanel(this);
			return false;
		};
	}
};

function displayPanel(tabToActivate) {
	// go through all the <li> elements
	for (var i = 0; i < tabLinks.length; i++) {
		if (tabLinks[i] == tabToActivate) {
			// if it's the one to activate, change its class
			// tabLinks[i].classList.add("active");//
			// and display the corresponding panel //
		//	tabPanels[i].style.display = "block"; //
			// Update current cave number display. //
			if (tabLinks[i].id === "tab1"){
				update();
			}
			if (tabLinks[i].id === "tab2"){
				currentCave = path1;
				nearbyRooms(path1);
				pitOrWumpusWarning();
				update();
			}
			if (tabLinks[i].id === "tab3"){
				currentCave = path2;
				nearbyRooms(path2);
				pitOrWumpusWarning();
				update();
			}
			if (tabLinks[i].id === "tab4"){
				currentCave = path3;
				nearbyRooms(path3);
				pitOrWumpusWarning();
				update();
			}
		}
	}
}

function nearbyRooms(currentCave) {
	if (currentCave === 1) {path1 = 2, path2 = 7, path3 = 8;}
	if (currentCave === 2) {path1 = 1, path2 = 3, path3 = 8;}
	if (currentCave === 3) {path1 = 2, path2 = 4, path3 = 9;}
	if (currentCave === 4) {path1 = 3, path2 = 5, path3 = 10;}
	if (currentCave === 5) {path1 = 4, path2 = 6, path3 = 11;}
	if (currentCave === 6) {path1 = 5, path2 = 11, path3 = 12;}
	if (currentCave === 7) {path1 = 1, path2 = 13, path3 = 14;}
	if (currentCave === 8) {path1 = 1, path2 = 2, path3 = 14;}
	if (currentCave === 9) {path1 = 3, path2 = 10, path3 = 15;}
	if (currentCave === 10) {path1 = 4, path2 = 9, path3 = 16;}
	if (currentCave === 11) {path1 = 5, path2 = 6, path3 = 12;}
	if (currentCave === 12) {path1 = 6, path2 = 11, path3 = 18;}
	if (currentCave === 13) {path1 = 7, path2 = 19, path3 = 20;}
	if (currentCave === 14) {path1 = 7, path2 = 8, path3 = 15;}
	if (currentCave === 15) {path1 = 9, path2 = 14, path3 = 16;}
	if (currentCave === 16) {path1 = 10, path2 = 15, path3 = 17;}
	if (currentCave === 17) {path1 = 16, path2 = 18, path3 = 23;}
	if (currentCave === 18) {path1 = 12, path2 = 17, path3 = 24;}
	if (currentCave === 19) {path1 = 13, path2 = 20, path3 = 25;}
	if (currentCave === 20) {path1 = 13, path2 = 19, path3 = 25;}
	if (currentCave === 21) {path1 = 26, path2 = 27, path3 = 28;}
	if (currentCave === 22) {path1 = 23, path2 = 28, path3 = 29;}
	if (currentCave === 23) {path1 = 17, path2 = 22, path3 = 24;}
	if (currentCave === 24) {path1 = 18, path2 = 23, path3 = 30;}
	if (currentCave === 25) {path1 = 19, path2 = 20, path3 = 26;}
	if (currentCave === 26) {path1 = 21, path2 = 25, path3 = 27;}
	if (currentCave === 27) {path1 = 21, path2 = 26, path3 = 30;}
	if (currentCave === 28) {path1 = 21, path2 = 22, path3 = 29;}
	if (currentCave === 29) {path1 = 22, path2 = 28, path3 = 30;}
	if (currentCave === 30) {path1 = 24, path2 = 27, path3 = 29;}
	return;
}

// This function assigns a random number for the cave number you are in, where the Pit is and where the Wumpus is and also makes sure none are in the same room initially. //
function assignCaves(){
	currentCave = Math.floor(Math.random() * 30 + 1);
	wumpusCave = Math.floor(Math.random() * 30 + 1);
	pitCave = Math.floor(Math.random() * 30 + 1);
	if (currentCave === wumpusCave || currentCave === pitCave || wumpusCave === pitCave){
		assignCaves();
	}
	return (currentCave, wumpusCave, pitCave);
}

function youMissed() {
	arrows --;
	document.getElementById("main").innerHTML = "You missed!";
	if (arrows <= 0){

		document.getElementById("main").innerHTML = "You are out of arrows!! You are dead!!";
		document.getElementById("image").src = "_images/skeleton.jpg";
		document.getElementsByClassName("current")[0].textContent = "";
		document.getElementsByClassName("pathOptions")[0].textContent = "Click on the Reset Button to try again...";
		document.getElementsByClassName("arrowAmount")[0].textContent = "";
		document.getElementsByClassName("click")[0].textContent = "";
		document.getElementById("shootA").classList.remove("shootButtonsOn1");
		document.getElementById("shootA").classList.add("shootButtonsOff");
		document.getElementById("shootB").classList.remove("shootButtonsOn2");
		document.getElementById("shootB").classList.add("shootButtonsOff");
		document.getElementById("shootC").classList.remove("shootButtonsOn3");
		document.getElementById("shootC").classList.add("shootButtonsOff");
		document.getElementById("hideReset").id = "showReset";
		document.getElementById("showShoot").id = "hideShoot";
	}
	document.getElementById("shootA").classList.add("shootButtonsOff");
	document.getElementById("shootB").classList.add("shootButtonsOff");
	document.getElementById("shootC").classList.add("shootButtonsOff");
	document.getElementsByClassName("arrowAmount")[0].textContent = "You have " + arrows + " arrows left.";
}

function pitOrWumpusWarning() {
	if (path1 === wumpusCave || path2 === wumpusCave || path3 === wumpusCave) {
		document.getElementById("main").innerHTML = "I smell a Wumpus!";
	}
	if (path1 === pitCave || path2 === pitCave || path3 === pitCave) {
		document.getElementById("main").innerHTML = "I feel a draft!";
	}
	if ((path1 === pitCave || path2 === pitCave || path3 === pitCave) && (path1 === wumpusCave || path2 === wumpusCave || path3 === wumpusCave)) {
		document.getElementById("main").innerHTML = "I feel a draft and I smell a wumpus!!";
	}
	if (path1 != wumpusCave && path2 != wumpusCave && path3 != wumpusCave && path1 != pitCave && path2 != pitCave && path3 != pitCave){
		document.getElementById("main").innerHTML = "I don't feel any drafts or smell anything. :-)";
	}
}
