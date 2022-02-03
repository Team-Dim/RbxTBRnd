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

if (localStorage.normalTower === undefined) localStorage.normalTower = '\uFFFF\uFFFF'
if (localStorage.eventTower === undefined) localStorage.eventTower = '\1'
if (localStorage.trophyTower === undefined) localStorage.trophyTower = '\0'

var towers = []

function initTower(tower, id) {
    let pos = 0
    for (let row of document.getElementById(id).rows) {
        let cell_i = 0
        for (let cell of row.cells) {
            let enable = tower.charCodeAt(pos) & (1 << cell_i)
            setColor(cell.firstChild, enable)
            if (enable) towers.push(cell.firstChild.textContent)
            cell_i++
        }
        pos++
    }
}

function flipTower(event, pos, bit, towerCatId = 0) {
    let towerCat
    switch (towerCatId) {
        case 0:
            towerCat = "normal"
            break
        case 1:
            towerCat = "event"
            break
        default:
            towerCat = "trophy"
    }
    towerCat += 'Tower'
    let tower = localStorage.getItem(towerCat)
    let ascii = tower.charCodeAt(pos)
    let cmp = 1 << bit
    ascii ^= cmp
    let enable = ascii & cmp
    setColor(event.target, enable)
    if (enable) towers.push(event.target.textContent)
    else towers.splice(towers.indexOf(event.target.textContent), 1);
    localStorage.setItem(towerCat, setCharAt(tower, pos, String.fromCharCode(ascii)))
}

function genTowers() {
    let tempTowers = [...towers]
    let show = ''
    for (let i = 0; i < 5; i++) {
        let pick =  ~~(Math.random() * tempTowers.length)
        show += tempTowers[pick] + '<br>'
        tempTowers.splice(pick, 1)
    }
    document.getElementById('towers').innerHTML = show
}

document.addEventListener("DOMContentLoaded", () => {
    initTower(localStorage.normalTower, 'normal-towers')
    initTower(localStorage.eventTower, 'event-towers')
    initTower(localStorage.trophyTower, 'trophy-towers')
});