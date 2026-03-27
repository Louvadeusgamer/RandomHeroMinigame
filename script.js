import list from "./heroesList.js"
const matchEl = document.getElementById("match")
const typeOfMatch = [
    document.getElementById("type0"),
    document.getElementById("type1"),
    document.getElementById("type2")
]
const boxElList = []
const positionElList = []
const roleElList = []
const playerElList = []
const pointsElList = []
const heroElList = []
const objCBList = []
const objTextList = []
const startButton = document.getElementById("start")
const nextroundButton = document.getElementById("nextround")
const finishroundButton = document.getElementById("finishround")
const cleanButton = document.getElementById("clean")
const cleanpotgButton = document.getElementById("uncheckpotg")

const __setEls = () => {
    for (let i = 0; i <= 5; i++) {
        boxElList.push(document.getElementById(`box${i}`))
        positionElList.push(document.getElementById(`pos${i}`))
        roleElList.push(document.getElementById(`role${i}`))
        playerElList.push(document.getElementById(`player${i}`))
        pointsElList.push(document.getElementById(`points${i}`))
        heroElList.push(document.getElementById(`hero${i}`))
        objCBList.push([])
        objTextList.push([])
        for (let e = 0; e <= 2; e++) {
            objCBList[i].push(document.getElementById(`objective${i}${e}0`))
            objTextList[i].push(document.getElementById(`objective${i}${e}1`))
        }
    }
}
__setEls()

const changeBoxColor = (box) => {
    const i = parseInt(roleElList[box].value)
    boxElList[box].classList = rolesTypes[i+1]
}
const __giveTypesFunctions = () => {
    for (const type in typeOfMatch) {
        if (type == 0) {
            typeOfMatch[0].addEventListener("change", () => {
                for (const i in roleElList) {
                    try {
                        roleElList[i].removeAttribute("disabled")
                        roleElList[i].value = "-1"
                        roleElList[i].dispatchEvent(new Event("change"))
                    } catch(e) {}
                }
            })
        } else if (type == 1) {
            typeOfMatch[1].addEventListener("change", () => {
                for (const i in roleElList) {
                    if (i == 0) {
                        roleElList[i].value = "1"
                    } else if (i == 1 || i == 2) {
                        roleElList[i].value = "2"
                    } else if (i == 3 || i == 4) {
                        roleElList[i].value = "3"
                    } else {
                        roleElList[i].value = "-1"
                    }
                    roleElList[i].setAttribute("disabled", "")
                    roleElList[i].dispatchEvent(new Event("change"))
                    changeBoxColor(i)
                }
            })
        } else if (type == 2) {
            typeOfMatch[2].addEventListener("change", () => {
                for (const i in roleElList) {
                    roleElList[i].value = "0"
                    roleElList[i].setAttribute("disabled", "")
                    roleElList[i].dispatchEvent(new Event("change"))
                    changeBoxColor(i)
                }
            })
        }
    }
}
__giveTypesFunctions()

const lenRoles = [
    list.tank.length,
    list.damage.length,
    list.support.length
]

const rolesTypes = [
    "off",
    "open-queue",
    "tank",
    "damage",
    "support"
]

const findHeroOQ = (hero) => {
    if (lenRoles[0] > hero) {
        return list.tank[hero]
    } else if (lenRoles[0] + lenRoles[1] > hero) {
        return list.damage[hero - lenRoles[0]]
    } else {
        return list.support[hero - lenRoles[0] - lenRoles[1]]
    }
}
const giveObjectives = (roleN, heroNum) => {
    let role = roleN
    const objTypes = {
        tank: {
            mit: [3, 10, 1000],
            dam: [3, 9, 1000],
            kills: [5, 20, 1]
        },
        damage: {
            dam: [3, 10, 1000],
            kills: [5, 25, 1],
            mindeath: [0, 7, 1]
        },
        support: {
            heal: [3, 10, 1000],
            assist: [5, 15, 1],
            dam: [1, 7, 1000]
        }
    }
    const obj = []
    if (heroNum !== -1) {
        if (lenRoles[0] > heroNum) {
            role = 1
        } else if (lenRoles[0] + lenRoles[1] > heroNum) {
            role = 2
        } else {
            role = 3
        }
    }
    
    if (role == 1) {
        obj.push(`<span class="principal">Objetivo principal:</span> Mitigue ${Math.floor((Math.random() * (objTypes.tank.mit[1] - objTypes.tank.mit[0] + 1) + objTypes.tank.mit[0]) )* objTypes.tank.mit[2]} de dano.`)
        obj.push(`Dê ${Math.floor((Math.random() * (objTypes.tank.dam[1] - objTypes.tank.dam[0] + 1) + objTypes.tank.dam[0]) )* objTypes.tank.mit[2]} de dano.`)
        obj.push(`Elimine ${Math.floor((Math.random() * (objTypes.tank.kills[1] - objTypes.tank.kills[0] + 1) + objTypes.tank.kills[0]) )* objTypes.tank.kills[2]} inimigos.`)
    } else if (role == 2) {
        obj.push(`<span class="principal">Objetivo principal:</span> Dê ${Math.floor((Math.random() * (objTypes.damage.dam[1] - objTypes.damage.dam[0] + 1) + objTypes.damage.dam[0]) )* objTypes.damage.dam[2]} de dano.`)
        obj.push(`Elimine ${Math.floor((Math.random() * (objTypes.damage.kills[1] - objTypes.damage.kills[0] + 1) + objTypes.damage.kills[0]) )* objTypes.damage.kills[2]} inimigos.`)
        obj.push(`Morra menos de ${Math.floor((Math.random() * (objTypes.damage.mindeath[1] - objTypes.damage.mindeath[0] + 1) + objTypes.damage.mindeath[0]) )* objTypes.damage.mindeath[2]} vezes.`)
    } else if (role == 3) {
        obj.push(`<span class="principal">Objetivo principal:</span> Cure ${Math.floor((Math.random() * (objTypes.support.heal[1] - objTypes.support.heal[0] + 1) + objTypes.support.heal[0]) )* objTypes.support.heal[2]} de vida.`)
        obj.push(`Dê ${Math.floor((Math.random() * (objTypes.support.assist[1] - objTypes.support.assist[0] + 1) + objTypes.support.assist[0]) )* objTypes.support.assist[2]} assistências.`)
        obj.push(`Dê ${Math.floor((Math.random() * (objTypes.support.dam[1] - objTypes.support.dam[0] + 1) + objTypes.support.dam[0]) )* objTypes.support.dam[2]} de dano.`)
    }
    return obj
}

let match = 0
const points = [0, 0, 0, 0, 0, 0]
const pos = [-1, -1, -1, -1, -1, -1] // if pos == -1: role = off

const setPositions = () => {
    for (let i = 0; i <= 5; i++) pos[i] = 0
    let first = -1
    for (let i = 0; i <= 5; i++) {
        if (i == 0) {
            pos[i] = 1
            first = 0
        }

        if (points[first] < points[i]) {
            first = i
        }
    }
}
for (let i = 0; i <= 5; i++) {
    roleElList[i].addEventListener("change", () => {
        changeBoxColor(i)
    })
}

console.log(lenRoles[0])

const hasTwoTanks = (heroes) => {
    let tankQuantity = 0
    for (const hero of heroes) {
        if (lenRoles[0] > hero && hero !== -1)
            tankQuantity++
    }
    if (tankQuantity >= 2) {
        return true
    } else {
        return false
    }
}

finishroundButton.addEventListener("click", () => {
    for (let i = 0; i <= 5; i++) {

        const potg = document.getElementById(`potg${i}`)

        if (match !== 0 && playerElList[i].value !== "" && roleElList[i].value !== -1) {
            if (objCBList[i][0].checked) {
                points[i] += 3
            }
            if (objCBList[i][1].checked) {
                points[i] += 2
            }
            if (objCBList[i][2].checked) {
                points[i] += 1
            }
            if (potg.checked) {
                points[i] += 5
            }
        }

        pointsElList[i].innerHTML = points[i]
        heroElList[i].innerHTML = ""
        objTextList[i][0].innerHTML = ""
        objTextList[i][1].innerHTML = ""
        objTextList[i][2].innerHTML = ""
        objCBList[i][0].checked = false
        objCBList[i][1].checked = false
        objCBList[i][2].checked = false
        potg.checked = false

    }
    nextroundButton.removeAttribute("disabled")
    finishroundButton.setAttribute("disabled", "")
})

nextroundButton.addEventListener("click", () => {
    match++
    matchEl.innerHTML = match
    const heroList = [-1, -1, -1, -1, -1, -1]
    for (let i = 0; i <= 5; i++) {
        
        let hero

        if (roleElList[i].value == -1 || playerElList[i].value == "")
            continue
        if (roleElList[i].value == 0) 
            hero = Math.floor(Math.random() * (lenRoles[0] + lenRoles[1] + lenRoles[2]))
        else
            hero = Math.floor(Math.random() * lenRoles[parseInt(roleElList[i].value)-1])

        
        console.log(`${i}: ${hero}`) // Arrumar herois repetidos no mesmo player
        
        if (heroList.includes(hero)) {
            i--
            console.log("repeated")
            continue
        } else if (hasTwoTanks(heroList) && roleElList[i].value == 0 && hero < lenRoles[0]) {
            i--
            console.log("has two tanks")
            continue
        } else {
            heroList[i] = hero
            console.log("setted hero")
        }
        
        if (roleElList[i].value == 0) {
            heroElList[i].innerHTML += findHeroOQ(hero)
        } else {
            if (roleElList[i].value == 1) {
                heroElList[i].innerHTML += list.tank[hero]
            } else if (roleElList[i].value == 2) {
                heroElList[i].innerHTML += list.damage[hero]
            } else if (roleElList[i].value == 3) {
                heroElList[i].innerHTML += list.support[hero]
            }
        }
        
        const obj = giveObjectives(parseInt(roleElList[i].value), roleElList[i].value == 0 ? hero : -1)
        objTextList[i][0].innerHTML = obj[0]
        objTextList[i][1].innerHTML = obj[1]
        objTextList[i][2].innerHTML = obj[2]
    }

    nextroundButton.setAttribute("disabled", "")
    finishroundButton.removeAttribute("disabled")
})

startButton.addEventListener("click", () => {
    const heroList = [-1, -1, -1, -1, -1, -1]
    match++
    matchEl.innerHTML = match
    finishroundButton.style.display = "initial"
    nextroundButton.style.display = "initial"
    for (let i = 0; i <= 5; i++) {
        
        const potg = document.getElementById(`potg${i}`)
        
        pointsElList[i].innerHTML = points[i]
        heroElList[i].innerHTML = ""
        objTextList[i][0].innerHTML = ""
        objTextList[i][1].innerHTML = ""
        objTextList[i][2].innerHTML = ""
        objCBList[i][0].checked = false
        objCBList[i][1].checked = false
        objCBList[i][2].checked = false
        potg.checked = false
        let hero

        if (roleElList[i].value == -1 || playerElList[i].value == "") {
            continue
        } else if (roleElList[i].value == 0) {
            hero = Math.floor(Math.random() * (lenRoles[0] + lenRoles[1] + lenRoles[2]))
            heroElList[i].innerHTML += findHeroOQ(hero)
        } else {
            hero = Math.floor(Math.random() * lenRoles[parseInt(roleElList[i].value)-1])
            if (roleElList[i].value == 1) {
                heroElList[i].innerHTML += list.tank[hero]
            } else if (roleElList[i].value == 2) {
                heroElList[i].innerHTML += list.damage[hero]
            } else if (roleElList[i].value == 3) {
                heroElList[i].innerHTML += list.support[hero]
            }
        }
        
        if (heroList.includes(hero)) {
            i--
            continue
        } else if (hasTwoTanks(heroList) && roleElList[i].value == 0 && hero < lenRoles[0]) {
            i--
            continue
        } else {
            heroList[i] = hero
        }

        const obj = giveObjectives(parseInt(roleElList[i].value), roleElList[i].value == 0 ? hero : -1)
        objTextList[i][0].innerHTML = obj[0]
        objTextList[i][1].innerHTML = obj[1]
        objTextList[i][2].innerHTML = obj[2]
    }
    if (startButton.style.display !== "none") startButton.style.display = "none"
})

cleanButton.addEventListener("click", () => {
    if (match > 0) {
        for (let i = 0; i <= 5; i++) {
            heroElList[i].innerHTML = ""
            points[i] = 0
        }
    }
})

cleanpotgButton.addEventListener("click", () => {
    for (let i = 0; i <= 5; i++) {
        const a = document.getElementById(`potg${i}`)
        a.checked = false
    }
})
