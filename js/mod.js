let modInfo = {
	name: "The Library Tree",
	id: "school",
	author: "fifthless",
	pointsName: "Read Books",
	modFiles: ["Layer/k.js","Layer/m.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.5.1 Welcome to Jake's Library",
	name: "",
}

let changelog = `<h1><span style="color:blue">Changelog:</span></h1><br>
<br>

	<h3>v0.5.1</h3><br>
		-Remove some useless stuff<br>
		-fixed some Upgrade bugs<br>
		<br>

	<h3>v0.5</h3><br>
		-balanced the game to 5000 read book<br>
		-Added some upgrade<br>
		-Clean up the code<br>
		<br>

	<h3>v0.4</h3><br>
		-Added some upgrade<br>
		-Added a new LAYER "Mind Strengthen"
		-fixed some bugs<br>
		<br>

	<h3>v0.3</h3><br>
		-balanced the game to 1000 read book<br>
		-Added some upgrade<br>
		-fixed some bugs<br>
		<br>

	<h3>v0.2</h3><br>
		-Added A Layer<br>
		-Added some update<br>
		<br>

	<h3>v0.1</h3><br>
		- Added random idea<br>
		- Added stuff`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("k",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("m", 11)) gain = gain.times(upgradeEffect("m", 12))
	if (hasUpgrade("k", 12)) gain = gain.times(2)
	if (hasUpgrade('k', 13)) gain = gain.times(upgradeEffect('k', 13))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("5000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}