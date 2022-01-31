const maps = [
    'Dead End Valley',
    'Grasslands',
    'Mars',
    'Savannah',
    'Farm Fields',
    'Castle',
    'Way Out',
    'City',
    'Venus',
    'Canyon',
    'Pond',
    'Intimidator',
    'Dessert Outskirt',
    'Snowy Forest',
    'Swamp Isles',
    'Military Base',
    'Hellastic',
    'Cyber Quarters',
    'Western',
    'Wasteland',
    'Verdun',
    'Oil Rig',
    'Midnight Road',
    'Borderlands'
]

function genMap() {
    document.getElementById('map').textContent = maps[~~(Math.random() * maps.length)];
}

// https://stackoverflow.com/a/1431110/8314159
function setCharAt(str,index,chr) {
    return str.substring(0,index) + chr + str.substring(index+1);
}

function setColor(button, enable) {
    button.style.background = enable ? '#44bd19' : '#b52b2b'
}

if (localStorage.tower === undefined) localStorage.tower = '\0\0\0'
localStorage.tower = '\0\0\0'

var towers = []

function flipTower(event, pos, bit) {
    let ascii = localStorage.tower.charCodeAt(pos)
    let cmp = 1 << bit
    ascii ^= cmp
    let enable = ascii & cmp
    setColor(event.target, enable)
    if (enable) towers.push(event.target.textContent)
    else towers.splice(towers.indexOf(event.target.textContent), 1);
    localStorage.tower = setCharAt(localStorage.tower, pos, String.fromCharCode(ascii)) 
    console.log(towers)
}