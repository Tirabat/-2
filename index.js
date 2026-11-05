const inventory = []
const casse = []
let balance = 0
let exitCount = 0
let dieCount = 0
let winCount = 0
let connection = 0
let bargainPatience = 3
let roomPrice = 20
let skipIntro = 0
let runawayCount = 0
let health = 50
let bossHealth = 800
let bossAttack = 0
let rounds = 0
let deathAttempts = 0
let chiefHealth = 26
let machineHealth = 80
let wardenHealth = 70
let gardenerHealth = 60
let scientistHealth = 75
let bossHasAssistant = 0
let negativeBalanceHappened = 0
let maxHealth = 50
let equippedWeapon = 'Деревянный меч'
let equippedHelmet = 'Кожаный шлем'
let equippedChest = 'Кожаный нагрудник'
let equippedLegs = 'Кожаные штаны'
let equippedFeet = 'Кожаные сапоги'
let equippedHands = null
let bossBleedingStacks = 0
let bossBleedingTurns = 0
let bossStunnedTurns = 0
let playerWoundStacks = 0

function payMoney(amount) {
    balance -= amount
    if (balance < 0) {
        negativeBalanceHappened = 1
    }
}

function rollLoot() {
    return Math.floor(Math.random() * 11) + 10
}

function getPlayerArmor() {
    let armor = 0
    if (equippedHelmet == 'Кожаный шлем') armor += 1
    if (equippedHelmet == 'Колпак повара') armor += 2
    if (equippedHelmet == 'Каска машиниста') armor += 2
    if (equippedHelmet == 'Медный шлем с проводами') armor += 2
    if (equippedHelmet == 'Венок из шипов') armor += 1
    if (equippedChest == 'Кожаный нагрудник') armor += 1
    if (equippedChest == 'Фартук повара') armor += 2
    if (equippedChest == 'Кожаный фартук машиниста') armor += 3
    if (equippedChest == 'Доспех из коры') armor += 4
    if (equippedChest == 'Резиновый халат') armor += 3
    if (equippedLegs == 'Кожаные штаны') armor += 1
    if (equippedFeet == 'Кожаные сапоги') armor += 1
    if (equippedFeet == 'Ботинки машиниста') armor += 2
    if (equippedHands == 'Рукавицы машиниста') armor += 2
    return armor
}

function getPlayerRegen() {
    let regen = 0
    if (equippedHelmet == 'Колпак повара') regen += 2
    if (equippedChest == 'Фартук повара') regen += 2
    return regen
}

function getWeaponMax() {
    if (equippedWeapon == 'Деревянный меч') return 5
    if (equippedWeapon == 'Тяжёлый тесак') return 8
    if (equippedWeapon == 'Разводной ключ') return 10
    if (equippedWeapon == 'Секатор королевского садовника') return 6
    if (equippedWeapon == 'Электрический жезл') return 9
    if (equippedWeapon == 'Плеть надзирателя') return 6
    if (equippedWeapon == 'Стальной меч') return 8
    return 5
}

function weaponBleeds() { return equippedWeapon == 'Тяжёлый тесак' }
function weaponStuns() { return equippedWeapon == 'Разводной ключ' }
function weaponWounds() { return equippedWeapon == 'Плеть надзирателя' }
function weaponPierces() { return equippedWeapon == 'Секатор королевского садовника' }

function tryEquipArmor(item) {
    const chestItems = ['Фартук повара', 'Кожаный фартук машиниста', 'Доспех из коры', 'Резиновый халат']
    const helmetItems = ['Колпак повара', 'Каска машиниста', 'Медный шлем с проводами', 'Венок из шипов']
    if (chestItems.indexOf(item) != -1) {
        if (equippedChest != 'Кожаный нагрудник') {
            const c = +prompt(`СМЕНА БРОНИ (торс)\nНадето: ${equippedChest}\nНовое: ${item}\n1 - Заменить\n2 - Оставить`)
            if (c == 1) equippedChest = item
        }
        else equippedChest = item
    }
    else if (helmetItems.indexOf(item) != -1) {
        if (equippedHelmet != 'Кожаный шлем') {
            const c = +prompt(`СМЕНА БРОНИ (голова)\nНадето: ${equippedHelmet}\nНовое: ${item}\n1 - Заменить\n2 - Оставить`)
            if (c == 1) equippedHelmet = item
        }
        else equippedHelmet = item
    }
    else if (item == 'Ботинки машиниста') {
        if (equippedFeet != 'Кожаные сапоги') {
            const c = +prompt(`СМЕНА БРОНИ (обувь)\nНадето: ${equippedFeet}\nНовое: ${item}\n1 - Заменить\n2 - Оставить`)
            if (c == 1) equippedFeet = item
        }
        else equippedFeet = item
    }
    else if (item == 'Рукавицы машиниста') {
        if (equippedHands != null) {
            const c = +prompt(`СМЕНА БРОНИ (руки)\nНадето: ${equippedHands}\nНовое: ${item}\n1 - Заменить\n2 - Оставить`)
            if (c == 1) equippedHands = item
        }
        else equippedHands = item
    }
}

function tryEquipWeapon(item) {
    if (item == 'Тяжёлый тесак' || item == 'Разводной ключ' || item == 'Секатор королевского садовника' || item == 'Электрический жезл' || item == 'Плеть надзирателя' || item == 'Стальной меч') {
        if (equippedWeapon != 'Деревянный меч') {
            const c = +prompt(`СМЕНА ОРУЖИЯ\nНадето: ${equippedWeapon}\nНовое: ${item}\n1 - Заменить\n2 - Оставить`)
            if (c == 1) equippedWeapon = item
        }
        else equippedWeapon = item
    }
}

function bossDies() {
    maxHealth += 10
    health = maxHealth
}

function rollD4() {
    return Math.floor(Math.random() * 4) + 1;
}
function rollD2() {
    return Math.floor(Math.random() * 2) + 1;
}
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}
function rollD3() {
    return Math.floor(Math.random() * 3) + 1;
}
function rollD6() {
    return Math.floor(Math.random() * 6) + 1;
}
function fightChief() {
    chiefHealth = 26
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (chiefHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP повара: ${chiefHealth}`)

        if (bossStunnedTurns > 0) {
            alert('Повар оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Повар замахивается... и промахивается!')
            } else {
                bossDamage += playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                alert(`Повар бьёт! Урон: ${bossDamage}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            if (!weaponPierces()) {
                damage -= 2
                if (damage < 0) damage = 0
            }
            chiefHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Повар пропустит ход.`
                }
            }
            if (damage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += `\nРана на игроке! Входящий урон +1.`
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP повара: ${chiefHealth}`)
        } else {
            alert('Повар усмехается: "Долго думаешь. Ужин стынет."')
            continue
        }
        if (chiefHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            chiefHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Повар теряет ${bleedDmg} HP.\nHP повара: ${chiefHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nПовар опускает тесак и смотрит на вас без злобы. Просто устало.\n— Ничего личного, гость. Просто ужин должен быть свежим.\nПоследнее, что вы слышите, — как шипит котёл.')
        dieCount += 1
        return
    }
    if (chiefHealth <= 0) {
        alert('ПОБЕДА\nПовар падает на колени, тесак со звоном катится по полу.\n— Значит, всё-таки гость, — говорит он тихо. — Надо было сразу поверить.')
        inventory.push('Тяжёлый тесак')
        inventory.push('Фартук повара')
        inventory.push('Колпак повара')
        tryEquipWeapon('Тяжёлый тесак')
        tryEquipArmor('Фартук повара')
        tryEquipArmor('Колпак повара')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert(`ДОБЫЧА\nТесак, фартук и колпак. ${loot} монет.\nМакс. HP: ${maxHealth}`)
        return
    }
}
function fightMachine() {
    machineHealth = 80
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0
    let machineBonus = 0

    while (true) {
        if (machineHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP машиниста: ${machineHealth}\nБонус урона машиниста: +${machineBonus}`)

        if (bossStunnedTurns > 0) {
            alert('Машинист оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Машинист замахивается... и промахивается!')
            } else {
                bossDamage += machineBonus + playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                alert(`Машинист бьёт! Урон: ${bossDamage}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            if (!weaponPierces()) {
                damage -= 3
                if (damage < 0) damage = 0
            }
            machineHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Машинист пропустит ход.`
                }
            }
            if (damage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += `\nРана на игроке! Входящий урон +1.`
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP машиниста: ${machineHealth}`)
        } else {
            alert('Машинист: "Долго думаешь. Пар не ждёт."')
            continue
        }
        if (machineHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            machineHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Машинист теряет ${bleedDmg} HP.\nHP: ${machineHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        machineBonus += 2
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nМашинист опускает ключ.\n— Ничего личного. Просто котёл должен быть горячим.')
        dieCount += 1
        return
    }
    if (machineHealth <= 0) {
        alert('ПОБЕДА\nМашинист падает. Ключ катится по полу.\n— Значит, всё-таки гость... — говорит он тихо.')
        inventory.push('Разводной ключ')
        inventory.push('Рукавицы машиниста')
        inventory.push('Ботинки машиниста')
        tryEquipWeapon('Разводной ключ')
        tryEquipArmor('Рукавицы машиниста')
        tryEquipArmor('Ботинки машиниста')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert(`ДОБЫЧА\nКлюч, рукавицы и ботинки. ${loot} монет.\nМакс. HP: ${maxHealth}`)
        return
    }
}

function fightGardener() {
    gardenerHealth = 60
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (gardenerHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP садовника: ${gardenerHealth}`)

        if (bossStunnedTurns > 0) {
            alert('Садовник оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Садовник замахивается... и промахивается!')
            } else {
                bossDamage += playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                alert(`Садовник бьёт! Урон: ${bossDamage}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            gardenerHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Садовник пропустит ход.`
                }
            }
            if (damage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += `\nРана на игроке! Входящий урон +1.`
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP садовника: ${gardenerHealth}`)
        } else {
            alert('Садовник: "Ты не торопишься. А сад ждёт."')
            continue
        }
        if (gardenerHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            gardenerHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Садовник теряет ${bleedDmg} HP.\nHP: ${gardenerHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nСадовник опускает секатор.\n— Ничего личного. Сад должен расти.')
        dieCount += 1
        return
    }
    if (gardenerHealth <= 0) {
        alert('ПОБЕДА\nСадовник падает. Доспех из коры рассыпается.\n— Значит, всё-таки гость...')
        inventory.push('Секатор королевского садовника')
        inventory.push('Доспех из коры')
        inventory.push('Венок из шипов')
        tryEquipWeapon('Секатор королевского садовника')
        tryEquipArmor('Доспех из коры')
        tryEquipArmor('Венок из шипов')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert(`ДОБЫЧА\nСекатор, доспех и венок. ${loot} монет.\nМакс. HP: ${maxHealth}`)
        return
    }
}
function fightScientist() {
    scientistHealth = 75
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (scientistHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP учёного: ${scientistHealth}`)

        if (bossStunnedTurns > 0) {
            alert('Учёный оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Учёный замахивается... и промахивается!')
            } else {
                bossDamage += playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                alert(`Учёный бьёт! Урон: ${bossDamage}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            if (!weaponPierces()) {
                damage -= 1
                if (damage < 0) damage = 0
            }
            scientistHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Учёный пропустит ход.`
                }
            }
            if (damage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += `\nРана на игроке! Входящий урон +1.`
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP учёного: ${scientistHealth}`)
        } else {
            alert('Учёный: "Долго думаешь. Наука не ждёт."')
            continue
        }
        if (scientistHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            scientistHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Учёный теряет ${bleedDmg} HP.\nHP: ${scientistHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nУчёный опускает жезл.\n— Хм. Данные собраны. Спасибо за участие.')
        dieCount += 1
        return
    }
    if (scientistHealth <= 0) {
        alert('ПОБЕДА\nУчёный падает. Жезл тихо искрит.\n— Значит, всё-таки гость...')
        inventory.push('Электрический жезл')
        inventory.push('Резиновый халат')
        inventory.push('Медный шлем с проводами')
        tryEquipWeapon('Электрический жезл')
        tryEquipArmor('Резиновый халат')
        tryEquipArmor('Медный шлем с проводами')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert(`ДОБЫЧА\nЖезл, халат и шлем. ${loot} монет.\nМакс. HP: ${maxHealth}`)
        return
    }
}

function fightWarden() {
    wardenHealth = 70
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (wardenHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP надзирателя: ${wardenHealth}\nРан на игроке: ${playerWoundStacks}`)

        if (bossStunnedTurns > 0) {
            alert('Надзиратель оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Надзиратель замахивается... и промахивается!')
            } else {
                bossDamage += playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                playerWoundStacks += 1
                alert(`Надзиратель бьёт! Урон: ${bossDamage}.\nРана! Теперь входящий урон +${playerWoundStacks}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            if (!weaponPierces()) {
                damage -= 1
                if (damage < 0) damage = 0
            }
            wardenHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Надзиратель пропустит ход.`
                }
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP надзирателя: ${wardenHealth}`)
        } else {
            alert('Надзиратель: "Долго думаешь. Плеть не ждёт."')
            continue
        }
        if (wardenHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            wardenHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Надзиратель теряет ${bleedDmg} HP.\nHP: ${wardenHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nНадзиратель опускает плеть.\n— Ничего личного. Темница должна быть полной.')
        dieCount += 1
        return
    }
    if (wardenHealth <= 0) {
        alert('ПОБЕДА\nНадзиратель падает. Ключи со звоном катятся по полу.\n— Значит, всё-таки гость...')
        inventory.push('Плеть надзирателя')
        tryEquipWeapon('Плеть надзирателя')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert(`ДОБЫЧА\nПлеть надзирателя. ${loot} монет.\nМакс. HP: ${maxHealth}`)
        return
    }
}

function fightBoss() {
    bossHealth = 100
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (bossHealth <= 0 || health <= 0) break
        alert(`РАУНД №${rounds + 1}\nВаше HP: ${health}\nHP Смотрителя: ${bossHealth}`)

        if (bossHasAssistant == 1) {
            if ((rounds + 1) % 3 == 0) {
                health -= 8
                alert(
                    'АЙКАР\n' +
                    'Айкар поднимает руку. Между пальцами вспыхивает пламя - и летит в вас.\n' +
                    'Вы успеваете отшатнуться, но огонь задевает плечо.\n' +
                    'Ожог: 8 HP.\n' +
                    `Ваше HP: ${health}`
                )
                if (health <= 0) break
            }
        }

        if (bossStunnedTurns > 0) {
            alert('Смотритель оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 4
            else if (bossRoll == 2) bossDamage = 6
            else if (bossRoll == 3) bossDamage = 8
            if (bossDamage == 0) {
                alert('Смотритель замахивается... и промахивается!')
            } else {
                bossDamage += playerWoundStacks
                bossDamage -= getPlayerArmor()
                if (bossDamage < 1) bossDamage = 1
                health -= bossDamage
                alert(`Смотритель бьёт! Урон: ${bossDamage}.\nВаше HP: ${health}`)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.')
        if (a == 1) {
            const roll = rollD6()
            let base = 0
            if (roll == 2) base = 1
            else if (roll == 3) base = 2
            else if (roll == 4) base = 3
            else if (roll == 5) base = 4
            else if (roll == 6) base = 5
            const wMax = getWeaponMax()
            let damage = Math.floor(base * wMax / 5)
            let critText = ''
            let critThreshold = 6
            if (inventory.indexOf('Амулет удачи') != -1) critThreshold = 5
            if (roll >= critThreshold) {
                const critRoll = rollD4()
                if (critRoll <= 3) {
                    damage += 4
                    critText = `\nКРИТИЧЕСКИЙ УДАР! +4 урона.`
                }
            }
            bossHealth -= damage
            let effectText = ''
            if (damage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = `\nКровотечение! Стаков: ${bossBleedingStacks}.`
            }
            if (damage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += `\nОГЛУШЕНИЕ! Смотритель пропустит ход.`
                }
            }
            if (damage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += `\nРана на игроке! Входящий урон +1.`
            }
            alert(`Вы бросаете кубик: ${roll}.\nУрон: ${damage}.` + critText + effectText + `\nHP Смотрителя: ${bossHealth}`)
        } else {
            alert('Смотритель: "Долго думаешь. Отель не ждёт."')
            continue
        }
        if (bossHealth <= 0) break

        if (bossBleedingTurns > 0) {
            const bleedDmg = bossBleedingStacks * 2
            bossHealth -= bleedDmg
            bossBleedingTurns -= 1
            if (bossBleedingTurns == 0) bossBleedingStacks = 0
            alert(`Кровотечение! Смотритель теряет ${bleedDmg} HP.\nHP: ${bossHealth}`)
        }
        if (bossHealth > 0 && bossHealth < 100) {
            bossHealth += 2
            if (bossHealth > 100) bossHealth = 100
            alert(`Смотритель восстанавливает 2 HP.\nHP: ${bossHealth}`)
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert(`Регенерация: +${regen} HP.\nВаше HP: ${health}`)
        }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nСмотритель поднимает вас за воротник.\n— Ты был хорошим гостем. Но некоторые двери лучше не открывать.\nПоследнее, что вы слышите, — как звенят ключи.')
        dieCount += 1
        return
    }
    if (bossHealth <= 0) {
        alert('ПОБЕДА\nСмотритель падает на колени. Связка ключей рассыпается.\n— Значит... всё-таки... — шепчет он. — ...кто-то смог.\nДвери открываются — и в вестибюль проникает свет.')
        winCount += 1
        alert('КОНЕЦ\nВы выходите из отеля. Король ждёт. Отель остаётся позади — но вы знаете, что он не сгорел. Он просто затаился.\nВы победили. В этот раз.')
        return
    }
}


alert(
    'НАЧАЛО\n' +
    'Добро пожаловать в игру - No One Returned.\n' +
    'Представляет собой что-то наподобие лабиринта, вам предстоит разгадать его тайну. Желаю удачи. И помни: каждый выбор имеет последствие.'
)
alert(
    'ВСТУПЛЕНИЕ\n' +
    'Отель «Последняя дверь» стоял на краю старой дороги, там, где туман не расходится даже к полудню. Говорили, что его двери всегда открыты для усталых путников, но мало кто решался войти. За последний год из отеля пропадали люди: купцы, что снимали комнату на одну ночь; слуги, что приходили на смену; целые семьи, чьи вещи находили в номерах, а самих - нет. Ни криков, ни следов, ни тел. Только ключи, оставленные на стойке, и коридоры, которые словно становились длиннее с каждым рассветом.\n' +
    'Король долго не хотел верить слухам. Но когда исчез его доверенный гонец, а на следующий день из отеля вернулся лишь его конь - без седока и без седла, - терпение владыки лопнуло. Он призвал вас в тронный зал, положил перед вами старую карту и сказал: «Люди входят в этот отель и не выходят. Я хочу знать почему. Отправляйтесь туда, откройте каждую дверь, найдите пропавших - и вернитесь. Если это место заберёт и вас, пусть хотя бы корона узнает его тайну».\n' +
    'Так вы оказались на пороге «Последней двери». За вашей спиной осталась дорога домой. Впереди - тихий вестибюль, ключи на стойке и коридор, который, кажется, ждал именно вас.'
)
alert(
    'НАЧАЛЬНЫЙ КАПИТАЛ\n' +
    'Король выдал вам 100 монет, а также начальное снаряжение для стражников, деревянный меч (5 урона) и кожаную броню (1 ед. брони за каждый элемент), а также корону, магический предмет для записи всего окружения со звуком (ничего не даёт и возвращается к прошлому владельцу после смерти нынешнего).'
)
balance += 100
inventory.push('Деревянный меч')
inventory.push('Кожаный шлем')
inventory.push('Кожаный нагрудник')
inventory.push('Кожаные штаны')
inventory.push('Кожаные сапоги')

while (true) {
    if (skipIntro == 0) {
        alert(
            'ВЕСТИБЮЛЬ\n' +
            'При входе вы видите администратора, на бейджике у него написано Айкар. Сам отель выглядит как богато украшенный дом, ну насколько это возможно в вашем то веке.'
        )
    }

    const hallChoice = +prompt(
        'ДИАЛОГ\n' +
        'При виде вас Айкар улыбается и говорит: "Добро пожаловать в отель "Последняя дверь". Вы желаете остановиться? На сколько ночей?"\n' +
        '1 - "Добрый день, да я бы хотел, остановиться на 1 ночь, не более."\n' +
        '2 - "Добрый день, да я хотел бы остановиться у вас на неделю."\n' +
        '3 - "Меня прислал король, чтобы я расследовал пропажу стражи."\n' +
        '4 - "Нет извините, я ошибся дверью. Всего хорошего."'
    )

    //торги
    if (hallChoice == 1) {
        alert(
            'ПЛАТА\n' +
            'Айкар: Хорошо с вас 20 монет за ночь'
        )
        const payChoice = +prompt(
            'ДИАЛОГ\n' +
            '1 - Да без проблем, вот.\n' +
            '2 - Что то дорого, можно дешевле?'
        )
        if (payChoice == 2) {
            alert(
                'ТОРГИ ЗА КОМНАТУ\n' +
                'Вам предстоит выбрать цену на которую вы согласны, но продавец может быть не согласен и предложит свою цену, вы сможете предложить взамен свою, но с каждым разом продавец будет все более не доволен и если его терпение лопнет, цена поднимется. Желаю вам удачи.'
            )
            while (bargainPatience > 0) {
                const bargainOffer = +prompt(
                    `Сколько вы готовы заплатить? (у вас ${balance} монет)`
                )
                if (bargainOffer <= 0 || bargainOffer > balance) {
                    if (bargainPatience == 3) {
                        alert(
                            'Айкар: "Это несерьёзно. Называйте нормальную цену."'
                        );
                    }
                    else if (bargainPatience == 2) {
                        alert(
                            'Айкар: "Ты видимо издеваешься надо мной? Назови разумную цену."'
                        )
                    }
                    else if (bargainPatience == 1) {
                        alert(
                            'Айкар: "Ещё одна попытка такого бреда, и наш деловой разговор пойдёт совсем по другому плану"'
                        )
                    }
                    bargainPatience -= 1
                    continue
                }
                else if (bargainOffer > roomPrice) {
                    roomPrice = bargainOffer
                    alert(
                        `Айкар: "Щедро! По рукам. С вас ${roomPrice} монет."`
                    );
                    break;
                }
                else if (bargainOffer < 13) {
                    if (bargainPatience == 3) {
                        alert(
                            `Айкар: слишком дешево, давай больше. Например ${roomPrice - 2}`
                        )
                    }
                    else if (bargainPatience == 2) {
                        alert(
                            `Айкар: "Ну это уже хотя бы разумно, но все еще дешево, моё предложение ${roomPrice - 2}"`
                        )
                    }
                    roomPrice -= 2
                    bargainPatience -= 1
                }
                else if (bargainOffer >= 13) {
                    alert(
                        'ИТОГ\n' +
                        `Айкар: ладно, я согласен, с вас ${bargainOffer}`
                    )
                    roomPrice = bargainOffer
                    break
                }
            }
        }
    }
    //переплата
    else if (hallChoice == 2) {
        alert(
            'ОПЛАТА\n' +
            'Айкар: "Ого, вы первый кто решил остановиться на такое долгое время. Сейчас посчитаю."\n' +
            'Айкар: так один день сто... плюс пла... за 7 дней... С вас 140 монет.'
        )
        const weekChoice = prompt(
            'ДИАЛОГ\n' +
            '1 - Ого, я не ожидал такую цену. Есть способ уменьшить оплату?\n' +
            '2 - У меня пока нет такой суммы. Можно как то разбить по частям?\n' +
            '3 - Хорошо, вот 140 монет за всё.'
        )
        if (weekChoice == 1) {
            alert(
                'ОПЛАТА\n' +
                'Айкар: "Ну вообще вы первый кто взял номер на такое время, я готов вам сделать скидку. Вам за 7 дней нужно будет заплатить всего лишь 70 монет"\n' +
                'Вы понимаете что это все еще очень дорого, но ничего уже не поделаешь.\n' +
                'Вы: "Хорошо, меня устраивает."'
            )
            if (balance >= 70) {
                payMoney(70)
                alert('БАЛАНС\n' + `Вы платите 70 монет. Осталось: ${balance}.`)
            }
            else {
                payMoney(70)
                alert(
                    'ДОЛГ\n' +
                    'Айкар забирает всё, что есть, и записывает остаток в книгу.\n' +
                    '— Ничего. Отель подождёт. Он умеет ждать.\n' +
                    `Баланс ушёл в минус: ${balance}.`
                )
            }
            roomPrice = 0
        }
        else if (weekChoice == 2) {
            alert(
                'ПЛАТА\n' +
                'Айкар: "Вы можете заплатить за один день и в конце каждого дня просто платить еще раз. Один день стоит 20 монет"\n' +
                'Вы: "Я согласен."'
            )
            if (balance >= 20) {
                payMoney(20)
                alert('БАЛАНС\n' + `Вы платите 20 монет. Осталось: ${balance}.`)
            }
            else {
                payMoney(20)
                alert(
                    'ДОЛГ\n' +
                    'Айкар забирает всё, что есть.\n' +
                    `Баланс ушёл в минус: ${balance}.`
                )
            }
            roomPrice = 0
        }
        else if (weekChoice == 3) {
            alert(
                'ОПЛАТА\n' +
                'Айкар: "Полная сумма? Похвально."\n' +
                'Он забирает 140 монет и молча выдаёт ключ.'
            )
            if (balance >= 140) {
                payMoney(140)
                alert('БАЛАНС\n' + `Вы платите 140 монет. Осталось: ${balance}.`)
            }
            else {
                payMoney(140)
                alert(
                    'ДОЛГ\n' +
                    'Айкар забирает всё, что есть, и записывает остаток в книгу.\n' +
                    'Ничего. Отель подождёт.\n' +
                    `Баланс ушёл в минус: ${balance}.`
                )
            }
            roomPrice = 0
        }
    }
    //лишний распрос
    else if (hallChoice == 3) {
        const kingAnswer = +prompt(
            'ДИАЛОГ\n' +
            'Айкар: "Впервые слышу об этом. Так на сколько вы хотели бы остановиться?"\n' +
            'Вы замечаете что он нервничает.\n' +
            '1 - Вам есть что скрывать?\n' +
            '2 - Да я бы хотел выбрать номер.'
        )
        if (kingAnswer == 1) {
            const pushChoice = +prompt(
                'ДОГАДКИ\n' +
                'Айкар: "Извините, но если вы продолжите расспрашивать меня об этом, я буду вынужден вызвать охрану"\n' +
                '1 - Я представляю волю короля, если вы мне не ответите я буду вынужден вас арестовать\n' +
                '2 - Хорошо, я хочу выбрать комнату'
            )
            if (pushChoice == 2) {
                skipIntro += 1
                continue
            }
            else if (pushChoice == 1) {
                alert(
                    'ДАВЛЕНИЕ.\n' +
                    'Вы снова подаётесь вперёд и задаёте вопрос. Улыбка Айкара становится тоньше, а пальцы медленно опускаются под стойку.\n' +
                    'Айкар: "Вы очень любопытный гость. Здесь это... непопулярное качество."\n' +
                    'Айкар звенит в колокольчик. Из коридора раздается лязганье цепей...'
                )
                alert(
                    'ФИНАЛЬНЫЙ БОСС.\n' +
                    'Из коридора выходит фигура в старом сюртуке портье. Лицо скрыто тенью, но на груди блестит связка ключей - сотни ключей, и каждый, кажется, помнит чью-то руку.\n' +
                    'Смотритель: "Я - Смотритель," - говорит он тихо. - "Ты вошёл в мой дом и потревожил моих гостей. Теперь ты останешься здесь. Навсегда."\n' +
                    'Айкар отступает за стойку и кланяется.\n' +
                    'Айкар: "Господин Смотритель. Прошу."'
                )
                break
            }
        }
        else if (kingAnswer == 2) {
            skipIntro += 1
            continue
        }
    }
    //первые концовки
    else if (hallChoice == 4) {
        alert(
            'КОНЕЦ\n' +
            'Как только вы выходите из отеля, ваш разум начинает мутнеть'
        )
        const endingRoll = rollD4();
        if (endingRoll == 1) {
            alert(
                'ДЕЗЕРТИР\n' +
                'Вы разворачиваетесь и молча выходите за дверь. Айкар не окликает вас - только смотрит вслед, и в его улыбке нет ни капли удивления. Дорога домой кажется короткой. Вы убеждаете себя, что просто переоценили опасность, что отель - не более чем старый дом с плохой репутацией. Вы ошибались.\n' +
                'Через три дня на дверях королевской канцелярии появляется указ: стражник, отправленный расследовать исчезновения, дезертировал. Награда за голову - пятьдесят монет. Через пять дней вас узнают в трактире на перекрёстке. Через неделю - находят.\n' +
                'Вас приводят в цепях на центральную площадь. Король не выходит к вам - лишь читают приговор: «За трусость перед лицом долга, за оставление поручения короны и за бесчестие стражи». Толпа молчит. Кто-то в задних рядах шепчет, что вы были правы, что из того отеля не возвращаются. Но шепчет тихо. У вас отбирают всё: монеты, меч, броню, даже корону. Петля затягивается. Последнее, что вы видите, - туман на краю дороги и силуэт отеля, который, кажется, смотрит прямо на вас.'
            )
        }
        else if (endingRoll == 2) {
            alert(
                'ТОТ КТО УШЕЛ ЗА ДВЕРЬ\n' +
                'Вы выходите за дверь. Айкар провожает вас взглядом и тихо говорит вслед: «В следующий раз дверь будет уже не та». Вы не оборачиваетесь.\n' +
                'Домой вы не возвращаетесь. Указ о розыске уже висит на каждой заставе. Вы уходите в леса на восток - туда, где королевская стража не рискует совать нос. Через месяц вы находите шайку. Через полгода - возглавляете её. У вас есть то, чего нет у других: вы видели отель и выжили. Для разбойников это почти святость.\n' +
                'Десять лет. Двадцать. Вы грабите обозы, жжёте заставы, держите в страхе половину округи. Король трижды посылает отряды - трижды они возвращаются ни с чем. Вас называют «Тот, Кто Ушёл От Двери». Дети в деревнях играют в вас. Взрослые молятся, чтобы вы проехали мимо.\n' +
                'На тридцатый год всё заканчивается. Ночью, в лагере у старой мельницы, ваши ближайшие люди входят в шатёр без стука. Вы успеваете узнать лица. Успеваете понять. «Власть не стареет, - говорит один из них. - А ты - да». Клинок входит под ребро. Вы падаете на спину и смотрите в полог шатра, а за ним - туман, дорога и силуэт отеля, который так и не отпустил вас.'
            )
        }
        else if (endingRoll == 3) {
            alert(
                'БЕЗУМЕЦ У ДОРОГИ\n' +
                'Вы выходите за дверь, но не уходите далеко. Что-то в вас ломается - тихо, как треснувшее стекло. Вы возвращаетесь к отелю на следующее утро. И остаётесь.\n' +
                'Вы стоите на дороге перед крыльцом и кричите путникам, чтобы шли другой стороной. Рвёте объявления о свободных комнатах. Гоните прочь каждого, кто подходит к двери. Ночью вы спите под крыльцом, прижавшись спиной к стене, и вам кажется, что отель дышит вам в затылок. Днём вы говорите с туманом. Туман иногда отвечает.\n' +
                'Местные сначала смеются. Потом перестают. Потом начинают обходить это место стороной - не из-за отеля, а из-за вас. Вас называют Безумцем у Дороги. Дети бросают в вас камни. Взрослые крестятся. Королевская стража приезжает один раз, смотрит на вас и уезжает - что взять с сумасшедшего.\n' +
                'Проходят годы. Вы уже не помните своего имени. Помните только одно: сюда нельзя. Никому. Никогда.\n' +
                'Однажды утром к отелю подходит молодой стражник в королевском плаще. Вы бросаетесь к нему, кричите, размахиваете руками. Он смотрит на вас долгим взглядом - и обходит стороной. Заходит в отель. Дверь закрывается за ним беззвучно.\n' +
                'Вы остаётесь на дороге. И вдруг понимаете: теперь ждать будут не вас.'
            )
        }
        else if (endingRoll == 4) {
            alert(
                'НОВЫЙ АДМИНИСТРАТОР\n' +
                'Вы выходите за дверь. Дорога домой кажется длиннее, чем должна быть. Туман не расходится даже к полудню, и вы идёте по нему дольше, чем шли сюда. К вечеру вы всё-таки выбираетесь на тракт. Домой вы не возвращаетесь - сначала идёте к королю.\n' +
                'Вы встаёте перед троном и говорите: «Я не могу. Я не вернусь туда. Пошлите кого-нибудь другого». Король медленно поднимается с трона. Лицо его темнеет. «Ты был моей последней надеждой, - говорит он тихо, и от этого тихого голоса стража у дверей опускает глаза. - Я дал тебе монеты, меч, броню, корону. Я дал тебе моё доверие. А ты вернулся и просишь послать кого-нибудь другого?» Он смотрит на вас так, будто видит впервые. «Стража, отберите у него всё королевское. И выведите за ворота. Чтобы духу его здесь не было».\n' +
                'Вас выводят из тронного зала под руки. Корона слетает с вашей головы и катится по камням. Меч, броню, монеты - всё остаётся позади. За воротами опускается решётка, и стража больше не смотрит вам вслед. Вас изгнали. Вам некуда идти.\n' +
                'Всю неделю вы скитаетесь по трактам, ночуете под мостами, вздрагиваете от каждого звона ключей. А потом снова выходите на старую дорогу. Туман тот же. Крыльцо то же. Только на этот раз вы не гость.\n' +
                'Айкар ждёт вас на пороге. Он не удивлён. Он ждал. «Я знал, что ты вернёшься, - говорит он. - Все возвращаются. Только не все - сами». Он снимает с себя бейджик и молча кладёт его вам в ладонь. «Я выполнил свой долг. Дождался того, кто вернётся по своей воле. Теперь очередь твоя». Он уходит в туман, и туман принимает его беззвучно, как принимал всех.\n' +
                'Вы стоите за стойкой. Дни идут. Вы записываете гостей, выдаёте ключи, улыбаетесь. И постепенно понимаете, почему Айкар улыбался так, как улыбался. Теперь вы тоже знаете то, чего не знают они.\n' +
                'Через неделю дверь открывается. На пороге - молодой стражник в королевском плаще, с королевской печатью в руке и растерянным лицом. Он говорит: «Меня прислал король. Предыдущий стражник так и не вернулся. Я должен расследовать исчезновения». Он смотрит на вас так, как когда-то смотрели вы.\n' +
                'Вы улыбаетесь.\n' +
                '«Добро пожаловать в отель „Последняя дверь“, - говорите вы. - Вы желаете остановиться?»'
            )
        }
        break
    }

    alert(
        'СПИСАНИЕ.\n' +
        'Айкар: "Ага, все записал, ваша комната №14. Удачной ночи."\n' +
        'Вы прощаетесь с ним и открываете дверь чтобы пройти дальше в свою комнату.'
    )
    payMoney(roomPrice)
    alert(
        'БАЛАНС\n' +
        `У вас осталось: ${balance} монет`
    )
    alert(
        'ЧТО ТО ЗДЕСЬ НЕ ЧИСТО\n' +
        'Дверь за вами захлопывается. Вы пытаетесь ее открыть. Ручка не поддаётся, дерево гладкое - ни щели, ни замка с этой стороны. Видимо у вас осталась лишь одна дорога, вперед\n' +
        'Вдоль стен - портреты. Люди в старых одеждах, у каждого табличка: «Эдвард, стражник. Прибыл 12-го. Выбыл 14-го». «Марта, служанка. Прибыла 3-го. Выбыла 4-го». «Семья Ортис. Прибыли 7-го. Выбыли 7-го». Все смотрят чуть мимо, будто позировали не художнику. На самом старом портрете краска облупилась - лица не разобрать. Табличка стёрта, читается одно слово: «Первый». В комнате две двери.\n' +
        'Левая - тяжёлая, обитая железом, с царапинами у замка. Но странность: на ней не одна замочная скважина, а десятки - мелких, разных форм, будто дверь открывали сотнями разных ключей. Из-под неё не тянет холодом - тянет тишиной. Такой, в которой слышно, как где-то очень далеко одна за другой закрываются двери.\n' +
        'Правая - с резным наличником и медной ручкой в форме ключа. Пахнет пылью и старой бумагой. За ней - шелест страниц и глухой стук, будто что-то тяжёлое ставят на пол. И ещё: тонкий запах духов, которым давно никто не пользуется.'
    )
    const doorSideChoice = +prompt(
        'ВЫБОР\n' +
        'Похоже отель играет с вами и скорее всего если выбрать одну дверь, другую выбрать уже не получится.\n' +
        '1 - Выбрать левую дверь.\n' +
        '2 - Выбрать правую дверь'
    )

    if (doorSideChoice == 1) {
        alert(
            'КОРИДОР ЗАБЫТЫХ ДВЕРЕЙ\n' +
            'Железная створка поддаётся тяжело, с металлическим стоном. За ней - зал, и первое, что вы замечаете: двери.\n' +
            'Ровно двадцать. По десять с каждой стороны. Все одинаковые - тёмное дерево, одинаковая резьба, одинаковые ручки, одинаковые замочные скважины. Ни номера, ни таблички, ни царапины, которая отличала бы одну от другой. Только пыль на ручках лежит по-разному - и по ней видно, что давно никто не открывал ни одну.\n' +
            'Тускло. Свет падает откуда-то сверху, из-под потолка, но его хватает только на то, чтобы разглядеть двери и не разглядеть, что за ними. Пыльно так, что воздух кажется плотным. Пахнет старым деревом, сыростью и чем-то ещё - затхлым, будто здесь давно не проветривали.\n' +
            'Прямо у входа, по обе стороны, стоят два манекена в рыцарских доспехах. Доспехи старые, тёмные, с вмятинами и потёртостями. Один стоит ровно, второй чуть наклонён вперёд, будто прислушивается. Из забрал не видно ничего, кроме темноты.\n' +
            'Двадцать одинаковых дверей. Два стража. И тишина, в которой слышно, как где-то далеко капает вода.'
        )
        alert(
            'НЕОЖИДАННОЕ СООБЩЕНИЕ\n' +
            'Тишина в зале не пустая. Вы понимаете это, когда из ниоткуда - не из дверей, не из-под потолка, а будто из самой пыли - раздаётся голос. Тихий, ровный, без эмоций. Так говорят те, кому давно не с кем разговаривать.\n' +
            'Молчальник: Здравствуй. Я - Молчальник. Я здесь дольше, чем стоят эти стены, и дольше, чем помнит хоть одна гостевая книга.\n' +
            'Пауза. Пыль в луче света медленно оседает.\n' +
            'Молчальник: Мы должны были познакомиться гораздо позже. У двери твоего номера. Но ты пришёл сюда сам, а значит, правила придётся объяснить сейчас.\n' +
            'Молчальник: Каждый постоялец должен сначала преодолеть путь до своего номера. Таково условие отеля. Я не могу провести тебя за руку. Я могу лишь помочь понять, что нужно сделать.\n' +
            'Голос чуть меняется - становится суше, деловитее, будто Молчальник переходит к главному.\n' +
            'Молчальник: Слушай внимательно. Двадцать дверей. Восемнадцать из них ведут обратно в этот зал. Ты войдёшь и выйдешь здесь же. Будешь ходить по кругу, пока не поймёшь. Одна дверь ведёт дальше. Одна - туда, откуда не возвращаются.\n' +
            'Снова пауза.\n' +
            'Молчальник: Я не скажу, какая из них какая. Это не моё дело. Но у входа стоят двое. Один говорит только правду. Другой - только ложь. Спроси их. Выбери дверь. И не забудь, что ошибка здесь стоит дороже, чем в вестибюле.\n' +
            'Пыль в луче света на миг замирает.\n' +
            'Молчальник: Я буду ждать тебя у твоего номера, стражник. Если дойдёшь.'
        )

        let correctDoor = 0
        let deathDoor = 0
        let leftTruthful = 0
        let rightDeceiver = 0
        let savedByMolchalnik = false
        let exitHall = false

        while (true) {
            do {
                correctDoor = rollD20()
                deathDoor = rollD20()
            } while (correctDoor == deathDoor)

            leftTruthful = 0
            rightDeceiver = 0
            const truthRoll = rollD2()
            if (truthRoll == 1) {
                leftTruthful += 1
            }
            else {
                rightDeceiver += 1
            }

            while (true) {
                const hallAction = +prompt(
                    'ДИЛЕММА ДВУХ СТРАЖЕЙ\n' +
                    '1 - обратиться к левому стражнику\n' +
                    '2 - обратиться к правому стражнику\n' +
                    '3 - обратиться к обоим\n' +
                    '4 - Спросить окончательно, какую дверь открыть\n' +
                    '5 - Выбрать дверь.'
                )

                if (hallAction == 1) {
                    const leftQuestion = +prompt(
                        'ВОПРОСЫ К ЛЕВОМУ\n' +
                        '1 - Если я прямо сейчас назову тебя лжецом, что ты почувствуешь?\n' +
                        '2 - Когда ты в последний раз совершил ошибку или оступился на этой службе?\n' +
                        '3 - Ты гордишься тем, кто ты есть?\n' +
                        '4 - Чего ты боишься больше: умереть от меча или оказаться неправым?'
                    )
                    if (leftTruthful == 1) {
                        if (leftQuestion == 1) {
                            alert('ОТВЕТ\n' + 'Левый: "Мне будет жаль, что ты совершаешь ошибку."')
                            continue
                        }
                        else if (leftQuestion == 2) {
                            alert('ОТВЕТ\n' + 'Левый: "Вчера я слишком долго открывал дверь."')
                            continue
                        }
                        else if (leftQuestion == 3) {
                            alert('ОТВЕТ\n' + 'Левый: "Нет, гордость здесь ни при чем. Я лишь исполняю свой долг и говорю то, что есть."')
                            continue
                        }
                        else if (leftQuestion == 4) {
                            alert('ОТВЕТ\n' + 'Левый: "Я боюсь меча, ведь смерть окончательна. А правда от моих страхов не изменится."')
                            continue
                        }
                    }
                    else {
                        if (leftQuestion == 1) {
                            alert('ОТВЕТ\n' + 'Левый: "Я прощу тебя, ибо праведники умеют прощать глупцов."')
                            continue
                        }
                        else if (leftQuestion == 2) {
                            alert('ОТВЕТ\n' + 'Левый: "Я совершил ошибку, когда доверился своему напарнику."')
                            continue
                        }
                        else if (leftQuestion == 3) {
                            alert('ОТВЕТ\n' + 'Левый: "Да! Я безгранично горжусь своей долей. В этом мире, погрязшем в обмане, я остаюсь незыблемым оплотом чистой правды."')
                            continue
                        }
                        else if (leftQuestion == 4) {
                            alert('ОТВЕТ\n' + 'Левый: "Смерть - ничто! Больше всего на свете я боюсь исказить истину или совершить несправедливость."')
                            continue
                        }
                    }
                }
                else if (hallAction == 2) {
                    const rightQuestion = +prompt(
                        'ВОПРОСЫ К ПРАВОМУ\n' +
                        '1 - Если я прямо сейчас назову тебя лжецом, что ты почувствуешь?\n' +
                        '2 - Когда ты в последний раз совершил ошибку или оступился на этой службе?\n' +
                        '3 - Ты гордишься тем, кто ты есть?\n' +
                        '4 - Чего ты боишься больше: умереть от меча или оказаться неправым?'
                    )
                    if (rightDeceiver == 1) {
                        if (rightQuestion == 1) {
                            alert('ОТВЕТ\n' + 'Правый: "Я прощу тебя, ибо праведники умеют прощать глупцов."')
                            continue
                        }
                        else if (rightQuestion == 2) {
                            alert('ОТВЕТ\n' + 'Правый: "Я совершил ошибку, когда доверился своему напарнику."')
                            continue
                        }
                        else if (rightQuestion == 3) {
                            alert('ОТВЕТ\n' + 'Правый: "Да! Я безгранично горжусь своей долей. В этом мире, погрязшем в обмане, я остаюсь незыблемым оплотом чистой правды."')
                            continue
                        }
                        else if (rightQuestion == 4) {
                            alert('ОТВЕТ\n' + 'Правый: "Смерть - ничто! Больше всего на свете я боюсь исказить истину или совершить несправедливость."')
                            continue
                        }
                    }
                    else {
                        if (rightQuestion == 1) {
                            alert('ОТВЕТ\n' + 'Правый: "Мне будет жаль, что ты совершаешь ошибку."')
                            continue
                        }
                        else if (rightQuestion == 2) {
                            alert('ОТВЕТ\n' + 'Правый: "Вчера я слишком долго открывал дверь."')
                            continue
                        }
                        else if (rightQuestion == 3) {
                            alert('ОТВЕТ\n' + 'Правый: "Нет, гордость здесь ни при чем. Я лишь исполняю свой долг и говорю то, что есть."')
                            continue
                        }
                        else if (rightQuestion == 4) {
                            alert('ОТВЕТ\n' + 'Правый: "Я боюсь меча, ведь смерть окончательна. А правда от моих страхов не изменится."')
                            continue
                        }
                    }
                }
                else if (hallAction == 3) {
                    const bothQuestion = +prompt(
                        'ВОПРОС К ОБОИМ\n' +
                        '1 - Если я спрошу вашего напарника, считает ли он себя честным, что он ответит?\n' +
                        '2 - Существует ли вопрос, на который вы оба дадите абсолютно одинаковый ответ?\n' +
                        '3 - Если бы прямо сейчас здесь появился третий страж, который всегда говорит случайным образом, кого из вас двоих он бы назвал лжецом?\n' +
                        '4 - Может ли истина одного из вас стать погибелью для другого?'
                    )
                    if (bothQuestion == 1) {
                        if (leftTruthful == 1) {
                            alert(
                                'ОТВЕТ\n' +
                                'Левый: "Мой напарник скажет что он говорит правду."\n' +
                                'Правый: "Мой напарник скажет что он таким себя не считает"'
                            )
                            continue
                        }
                        else {
                            alert(
                                'ОТВЕТ\n' +
                                'Правый: "Мой напарник скажет что он говорит правду."\n' +
                                'Левый: "Мой напарник скажет что он таким себя не считает"'
                            )
                            continue
                        }
                    }
                    else if (bothQuestion == 2) {
                        if (leftTruthful == 1) {
                            alert('ОТВЕТ\n' + 'Левый: "Да."\n' + 'Правый: "Нет."')
                            continue
                        }
                        else {
                            alert('ОТВЕТ\n' + 'Правый: "Да."\n' + 'Левый: "Нет."')
                            continue
                        }
                    }
                    else if (bothQuestion == 3) {
                        if (leftTruthful == 1) {
                            alert(
                                'ОТВЕТ\n' +
                                'Левый: "Он может назвать любого из нас, его выбор абсолютно случаен и не зависит от истины."\n' +
                                'Правый: "Моего напарника."'
                            )
                            continue
                        }
                        else {
                            alert(
                                'ОТВЕТ\n' +
                                'Правый: "Он может назвать любого из нас, его выбор абсолютно случаен и не зависит от истины."\n' +
                                'Левый: "Моего напарника."'
                            )
                            continue
                        }
                    }
                    else {
                        if (leftTruthful == 1) {
                            alert(
                                'ОТВЕТ\n' +
                                'Левый: "Да"\n' +
                                'Правый: "Нет, мы связаны одной судьбой, и наши слова одинаково важны для защиты этих дверей"'
                            )
                            continue
                        }
                        else {
                            alert(
                                'ОТВЕТ\n' +
                                'Правый: "Да"\n' +
                                'Левый: "Нет, мы связаны одной судьбой, и наши слова одинаково важны для защиты этих дверей"'
                            )
                            continue
                        }
                    }
                }
                else if (hallAction == 4) {
                    if (leftTruthful == 1) {
                        alert(
                            'ОТВЕТ\n' +
                            `Левый: "Выбирай ${correctDoor} дверь."\n` +
                            `Правый: "Выбирай ${deathDoor} дверь."`
                        )
                        continue
                    }
                    else {
                        alert(
                            'ОТВЕТ\n' +
                            `Левый: "Выбирай ${deathDoor} дверь."\n` +
                            `Правый: "Выбирай ${correctDoor} дверь"`
                        )
                        continue
                    }
                }
                else if (hallAction == 5) {
                    const chosenDoor = +prompt(
                        '1 - Выбрать 1 дверь.\n' +
                        '2 - Выбрать 2 дверь.\n' +
                        '3 - Выбрать 3 дверь.\n' +
                        '4 - Выбрать 4 дверь.\n' +
                        '5 - Выбрать 5 дверь.\n' +
                        '6 - Выбрать 6 дверь.\n' +
                        '7 - Выбрать 7 дверь.\n' +
                        '8 - Выбрать 8 дверь.\n' +
                        '9 - Выбрать 9 дверь.\n' +
                        '10 - Выбрать 10 дверь.\n' +
                        '11 - Выбрать 11 дверь.\n' +
                        '12 - Выбрать 12 дверь.\n' +
                        '13 - Выбрать 13 дверь.\n' +
                        '14 - Выбрать 14 дверь.\n' +
                        '15 - Выбрать 15 дверь.\n' +
                        '16 - Выбрать 16 дверь.\n' +
                        '17 - Выбрать 17 дверь.\n' +
                        '18 - Выбрать 18 дверь.\n' +
                        '19 - Выбрать 19 дверь.\n' +
                        '20 - Выбрать 20 дверь.'
                    )
                    if (chosenDoor == correctDoor) {
                        if (leftTruthful == 1) {
                            alert(
                                'ПРАВИЛЬНАЯ ДВЕРЬ\n' +
                                'Дверь открывается легко - так, будто её ждали. За ней не зал с двадцатью створками, а короткий коридор: узкий, с низким потолком и одной-единственной дверью в конце. Свет здесь ровный, без теней, и от этого кажется, что коридор дышит спокойно.\n' +
                                'За спиной - шаги. Вы оборачиваетесь: один из стражей идёт следом. Тот самый, чьи слова оказались правдой. Доспех на нём больше не кажется пустым - в прорези забрала видно, как движется что-то тёмное, живое. Он не нападает. Он просто идёт рядом, чуть отставая.\n' +
                                'Левый: "Ты угадал," - говорит он. Голос глухой, из-под металла. - "Это редкость. Большинство выбирает неверную и возвращается. Некоторые выбирают ту, откуда не возвращаются. Ты - первый за долгое время, кто дошёл сюда."\n' +
                                'Он останавливается в паре шагов от вас. Впереди - дверь. Одна. Без ручки, без замка, просто тёмное дерево.\n' +
                                'Левый: "Можешь идти дальше," - Стражник кивает на дверь. - "А можешь спросить. Я ответил правдой один раз, отвечу ещё на пару вопросов. Не на все - но на те, что помогут."\n' +
                                'Он складывает руки на груди. Ждёт.'
                            )
                            while (true) {
                                const askChoice = +prompt(
                                    'ВЫБОР\n' +
                                    '1 - расспросить про отель.\n' +
                                    '2 - расспросить про Айкара.\n' +
                                    '3 - расспросить про Молчальника.\n' +
                                    '4 - идти дальше'
                                )
                                if (askChoice == 1) {
                                    alert(
                                        'ОТЕЛЬ\n' +
                                        'Левый: "Отель старше королевства. Стоял здесь, когда на этом месте была не дорога, а тракт, и когда тракта не было. Его построил тот, кого теперь зовут Смотрителем. Он был первым гостем - и первым, кто не захотел уходить."\n' +
                                        'Стражник переступает с ноги на ногу. Доспех скрипит.\n' +
                                        'Левый: "Смотритель заключил сделку с туманом. Отель не должен пустовать. Гости должны входить - и оставаться. Но остаться навсегда можно только по-настоящему. Вот он и придумал путь: каждый гость должен сам дойти до своего номера. Кто дошёл - тот остаётся. Кто нет - возвращается и пробует снова. Иногда годы. Иногда - никогда."'
                                    )
                                    continue
                                }
                                else if (askChoice == 2) {
                                    alert(
                                        'АЙКАР\n' +
                                        'Левый: "Айкар - не хозяин. Он такой же гость, как и ты. Только дошёл до конца и согласился остаться при стойке. Смотритель дал ему выбор: стоять за стойкой или исчезнуть. Он выбрал стойку. И ждёт того, кто придёт его сменить."'
                                    )
                                    continue
                                }
                                else if (askChoice == 3) {
                                    alert(
                                        'МОЛЧАЛЬНИК\n' +
                                        'Левый: "Молчальник? Он был здесь до меня. До Смотрителя, может, тоже - не знаю. Он не гость и не хозяин. Он - голос отеля. Когда отель хочет что-то сказать, говорит он."\n' +
                                        'Пауза.\n' +
                                        'Левый: "Он не лжёт и не говорит правду. Он говорит то, что нужно услышать. Иногда это одно и то же. Иногда - нет. Тех, кто пытается его переспорить, он просто перестаёт замечать. А тех, кто слушает, - запоминает. По-своему. Стражник смотрит на дверь."\n' +
                                        'Левый: "Он ждёт тебя у номера. Не заставляй ждать слишком долго."'
                                    )
                                    continue
                                }
                                else if (askChoice == 4) {
                                    break
                                }
                            }
                        }
                        else {
                            alert(
                                'ПРАВИЛЬНАЯ ДВЕРЬ\n' +
                                'Дверь открывается легко - так, будто её ждали. За ней не зал с двадцатью створками, а короткий коридор: узкий, с низким потолком и одной-единственной дверью в конце. Свет здесь ровный, без теней, и от этого кажется, что коридор дышит спокойно.\n' +
                                'За спиной - шаги. Вы оборачиваетесь: один из стражей идёт следом. Тот самый, чьи слова оказались правдой. Доспех на нём больше не кажется пустым - в прорези забрала видно, как движется что-то тёмное, живое. Он не нападает. Он просто идёт рядом, чуть отставая.\n' +
                                'Правый: "Ты угадал," - говорит он. Голос глухой, из-под металла. - "Это редкость. Большинство выбирает неверную и возвращается. Некоторые выбирают ту, откуда не возвращаются. Ты - первый за долгое время, кто дошёл сюда."\n' +
                                'Он останавливается в паре шагов от вас. Впереди - дверь. Одна. Без ручки, без замка, просто тёмное дерево.\n' +
                                'Правый: "Можешь идти дальше," - Стражник кивает на дверь. - "А можешь спросить. Я ответил правдой один раз, отвечу ещё на пару вопросов. Не на все - но на те, что помогут."\n' +
                                'Он складывает руки на груди. Ждёт.'
                            )
                            while (true) {
                                const askChoice = +prompt(
                                    'ВЫБОР\n' +
                                    '1 - расспросить про отель.\n' +
                                    '2 - расспросить про Айкара.\n' +
                                    '3 - расспросить про Молчальника.\n' +
                                    '4 - идти дальше'
                                )
                                if (askChoice == 1) {
                                    alert(
                                        'ОТЕЛЬ\n' +
                                        'Правый: "Отель старше королевства. Стоял здесь, когда на этом месте была не дорога, а тракт, и когда тракта не было. Его построил тот, кого теперь зовут Смотрителем. Он был первым гостем - и первым, кто не захотел уходить."\n' +
                                        'Стражник переступает с ноги на ногу. Доспех скрипит.\n' +
                                        'Правый: "Смотритель заключил сделку с туманом. Отель не должен пустовать. Гости должны входить - и оставаться. Но остаться навсегда можно только по-настоящему. Вот он и придумал путь: каждый гость должен сам дойти до своего номера. Кто дошёл - тот остаётся. Кто нет - возвращается и пробует снова. Иногда годы. Иногда - никогда."'
                                    )
                                    continue
                                }
                                else if (askChoice == 2) {
                                    alert(
                                        'АЙКАР\n' +
                                        'Правый: "Айкар - не хозяин. Он такой же гость, как и ты. Только дошёл до конца и согласился остаться при стойке. Смотритель дал ему выбор: стоять за стойкой или исчезнуть. Он выбрал стойку. И ждёт того, кто придёт его сменить."'
                                    )
                                    continue
                                }
                                else if (askChoice == 3) {
                                    alert(
                                        'МОЛЧАЛЬНИК\n' +
                                        'Правый: "Молчальник? Он был здесь до меня. До Смотрителя, может, тоже - не знаю. Он не гость и не хозяин. Он - голос отеля. Когда отель хочет что-то сказать, говорит он."\n' +
                                        'Пауза.\n' +
                                        'Правый: "Он не лжёт и не говорит правду. Он говорит то, что нужно услышать. Иногда это одно и то же. Иногда - нет. Тех, кто пытается его переспорить, он просто перестаёт замечать. А тех, кто слушает, - запоминает. По-своему. Стражник смотрит на дверь."\n' +
                                        'Правый: "Он ждёт тебя у номера. Не заставляй ждать слишком долго."'
                                    )
                                    continue
                                }
                                else if (askChoice == 4) {
                                    break
                                }
                            }
                        }
                        exitHall = true
                        break
                    }
                    else if (chosenDoor == deathDoor) {
                        deathAttempts += 1
                        alert(
                            'ДВЕРЬ В НИКУДА\n' +
                            'Вы открываете дверь. За ней - ничего.\n' +
                            'Не темнота, не туман, не комната. Просто ничего. Мир заканчивается ровно на пороге, и дальше нет даже пустоты - есть только отсутствие всего. Вы стоите и смотрите, и глазам не за что зацепиться. Пола там нет. Воздуха нет. Времени нет.\n' +
                            'Вы делаете шаг.\n' +
                            'И ничего не происходит. Вы не падаете, не задыхаетесь - вы просто перестаёте быть. Медленно, тихо, без боли. Как будто кто-то очень аккуратно стирает вас из списка. Сначала пропадает звук. Потом - ощущение собственных рук. Потом - мысль о том, что вы вообще когда-то стояли здесь. Остаётся только ровное, спокойное ничто.\n' +
                            'Где-то очень далеко, в другой жизни, был отель. Был Айкар за стойкой. Был король с картой. Был зал с двадцатью дверями. Всё это становится тонким, как дым, и гаснет.\n' +
                            'Это всё.'
                        )
                        if (savedByMolchalnik == true) {
                            alert(
                                'ВТОРАЯ ОШИБКА\n' +
                                'Молчальник молчит. Пыль в луче света замирает. И на этот раз он не возвращает тебя.\n' +
                                '[Здесь будет вторая концовка - её напишет автор]'
                            )
                            exitHall = true
                            break
                        }
                        else {
                            alert(
                                'ПОМОЩЬ\n' +
                                'Пыль.\n' +
                                'Вы чувствуете пыль на лице. Потом - пол под ладонями. Потом - собственное дыхание, хриплое и частое, как у человека, который только что вынырнул из воды. Вы открываете глаза. Зал с двадцатью створками. Два стража у входа. И тишина, в которой слышно, как оседает пыль.\n' +
                                'Молчальник: "Я не ожидал такой ошибки."\n' +
                                'Голос ровный, но в нём что-то дрогнуло - не злость, скорее досада.\n' +
                                'Молчальник: "Ты был так близко. Ты смотрел, думал, выбирал. А потом шагнул в никуда, будто это ничего не значило. Будто тебе нечего терять."\n' +
                                'Пауза. Пыль висит в воздухе неподвижно.\n' +
                                'Молчальник: "Я вернул тебя. Не отель - я. Отель уже принял тебя, ты был за порогом. Но я вытащил. Потому что ты мне понравился, стражник. Не знаю, зачем говорю это. Меня давно ничто не интересовало - а ты заинтересовал."\n' +
                                'Стражники у входа не двигаются. Но вам кажется, что один из них чуть повернул голову.\n' +
                                'Молчальник: "Это последний раз. Я даю тебе ещё один шанс. Не потому, что так положено. Потому что я так хочу. Отель не любит, когда я хочу. Но иногда уступает."\n' +
                                'Пыль снова начинает оседать. Голос уходит - в двери, в стены, в тишину.\n' +
                                'Молчальник: "Выбирай, стражник. И на этот раз - думай. Не заставляй меня пожалеть."'
                            )
                            savedByMolchalnik = true
                            break
                        }
                    }
                    else {
                        alert(
                            'ОБРАТНО В ЗАЛ\n' +
                            'Дверь открывается, и вы снова оказываетесь в зале с двадцатью створками. Ничего не изменилось. Молчальник молчит. Стражи стоят на своих местах. Пыль оседает так же медленно, как и раньше.'
                        )
                        continue
                    }
                }
            }
            if (exitHall == true) {
                break
            }
        }
    }

    if (doorSideChoice == 2) {
        alert(
            'КЛАДОВАЯ\n' +
            'Узкая длинная кладовая с высоким потолком. Свет падает сверху ровно, без теней. Пахнет старым деревом, пылью и чем-то кислым. Вдоль стены висят пять портретов в одинаковых рамах.\n' +
            'На каждом - мужчина в старом форменном сюртуке портье. Лица разные, но есть в них общее: взгляд чуть мимо, осанка ровная, будто все пятеро - один человек, нарисованный в разное время. Под каждым портретом - табличка.\n' +
            'Прямо под каждым портретом, в стене, - пять мини-лифтов. Маленькие, узкие, как раз под размер чемодана: металлические дверцы, решётка, кнопка вызова. Внутри пусто. Дверцы приоткрыты, будто ждут.\n' +
            'А в углу кладовой, сваленные в кучу, лежат пять чемоданов - разных, потрёпанных, каждый со своей историей. Они стоят не под портретами, а отдельно. Будто их сюда свалили. Или будто они сами сюда пришли.'
        )

        const suitcaseNames = [
            'Саквояж с двойным дном',
            'Сундук с медью',
            'Кожаный портфель',
            'Деревянный кейс',
            'Плетёный короб'
        ]

        const portraitNames = [
            'Великий комбинатор',
            'Мечтатель на краю обрыва',
            'Хранитель тишины',
            'Властелин секунд',
            'Творец мимолётности'
        ]

        const portraitTablets = [
            'Всю жизнь он продавал людям то, чего не существовало, и заставлял исчезать то, что они держали в руках. Его лучшим другом было зеркало, а главным врагом - честный взгляд',
            'Он измерял свою жизнь не годами, а каплями, падающими за воротник, и криками птиц, которые никогда не садятся на землю. Его дом всегда был в движении, а земля под ногами казалась ему проклятием',
            'Он знал тысячи чужих историй, но никогда не рассказывал свою. Он заставлял людей молчать одним движением пальца и хоронил их мысли в строгих рядах, уходящих под потолок',
            'Он умел останавливать то, что никому не под силу вернуть, и заставлял биться холодные механические сердца. В его мастерской вечность дробилась на тысячи мелких шагов',
            'Он ловил то, что нельзя увидеть или потрогать, и запирал это в стеклянные тюрьмы. Одно его прикосновение могло вернуть человека в детство или заставить совершить безумство'
        ]

        const correctPairs = [0, 1, 2, 3, 4]
        const liftOccupancy = {}
        let storageExit = false
        let wrongLiftAttempts = 0

        while (true) {
            if (health <= 0) {
                alert(
                    'СМЕРТЬ\n' +
                    'Стены кладовой сжимаются вокруг тебя. Ты падаешь на пол, и последнее, что слышишь, - как мини-лифты тихо щёлкают, будто прощаясь.\n' +
                    'Холодно. Не больно - просто холодно. Свет в кладовой гаснет медленно, как будто кто-то очень аккуратно задувает свечу. Ты ещё успеваешь подумать, что надо было считать ошибки, а не чемоданы. А потом не думаешь уже ничего.'
                )
                alert(
                    'НОВЫЙ ПОСТОЯЛЕЦ\n' +
                    'Через несколько дней в кладовой станет на один чемодан больше.\n' +
                    'Его поставят в угол, к остальным пяти. На бирке будет твоё имя, а под ней - одна строка: «Прибыл. Выбыл. Не дождался».\n' +
                    'Мини-лифты под портретами тихо щёлкнут, принимая ещё одного гостя. А может, и нет - отель не спешит. У него впереди вечность.'
                )
                alert(
                    'КОРОНА\n' +
                    'Король ждал неделю. Потом две. Потом перестал считать.\n' +
                    'На рассвете двадцатого дня в тронный зал вошёл стражник с пустыми руками. Он молча положил на стол корону - ту самую, магическую, которая записывает всё вокруг. Корона вернулась к своему прошлому владельцу, как и было обещано.\n' +
                    'Король долго смотрел на неё. Потом взял и включил запись.\n' +
                    'Он услышал скрип двери. Услышал голос Айкара. Услышал шаги по коридору и тихий голос из пыли. Услышал, как скрипят мини-лифты и как ты падаешь на пол в кладовой. Услышал тишину, которая пришла после.\n' +
                    'Он прослушал всё до конца. Дважды.'
                )
                alert(
                    'ОГОНЬ\n' +
                    'На следующий день король отдал приказ.\n' +
                    'К отелю «Последняя дверь» вышла стража - с факелами, смолой и приказом не возвращаться без пепла. Они подожгли крыльцо с четырёх сторон. Пламя занялось быстро, слишком быстро для старого дерева, будто отель сам ждал этого.\n' +
                    'Говорят, в огне слышали голоса. Говорят, кто-то видел в дыму фигуру в старом сюртуке портье, которая стояла на пороге и не двигалась. Говорят, туман вокруг отеля в ту ночь рассеялся впервые за сотни лет.\n' +
                    'К утру от отеля осталось только пепелище. Ни стен, ни дверей, ни ключей. И ни одного чемодана.'
                )
                alert(
                    'КОНЕЦ: «ПОСТОЯЛЕЦ»\n' +
                    'Ты умер в кладовой, так и не открыв проход. Тебя нашли только по короне, которая вернулась к королю. Король узнал всё, что было в записи, и приказал сжечь отель.\n' +
                    'Но иногда, проезжая мимо старой дороги, люди всё ещё видят туман. И в тумане - крыльцо. И на крыльце - кого-то, кто ждёт гостей.\n' +
                    'Отель не сгорел. Отель просто затаился.'
                )
                dieCount += 1
                storageExit = true
                break
            }

            if (Object.keys(liftOccupancy).length == 5) {
                alert(
                    'ВСЕ ЧЕМОДАНЫ НА МЕСТЕ\n' +
                    'Пять мини-лифтов закрываются одновременно. Стена под портретами вздрагивает и медленно отходит в сторону, открывая проход дальше. За ней - узкий коридор, который ведёт вглубь отеля.'
                )
                storageExit = true
                break
            }

            const roomChoice = +prompt(
                'ВЫБОР ДЕЙСТВИЯ\n' +
                '1 - Подойти к портретам.\n' +
                '2 - Подойти к чемоданам.\n' +
                '3 - Выйти из кладовой (если проход открыт).'
            )

            if (roomChoice == 2) {
                const availableIndexes = []

                for (let i = 0; i < suitcaseNames.length; i++) {
                    const alreadyInInventory = casse.indexOf(suitcaseNames[i]) != -1
                    const alreadyInLift = Object.values(liftOccupancy).indexOf(i) != -1
                    if (alreadyInInventory == false && alreadyInLift == false) {
                        availableIndexes.push(i)
                    }
                }

                if (availableIndexes.length == 0) {
                    alert('В углу больше нет чемоданов. Все либо у тебя, либо уже стоят в лифтах.')
                    continue
                }

                shuffleArray(availableIndexes)

                let availableMenu = 'ЧЕМОДАНЫ В УГЛУ\n'
                for (let i = 0; i < availableIndexes.length; i++) {
                    availableMenu += `${i + 1} - ${suitcaseNames[availableIndexes[i]]}\n`
                }
                availableMenu += '0 - Ничего не брать.'

                const suitcaseChoice = +prompt(availableMenu)

                if (suitcaseChoice == 0) {
                    continue
                }
                if (suitcaseChoice < 1 || suitcaseChoice > availableIndexes.length) {
                    alert('Ты ткнул пальцем в пустоту. Такого чемодана нет.')
                    continue
                }

                const chosenSuitcaseIndex = availableIndexes[suitcaseChoice - 1]
                const chosenSuitcaseName = suitcaseNames[chosenSuitcaseIndex]

                if (casse.length >= 9) {
                    alert('ИНВЕНТАРЬ ПОЛОН\nТы не можешь унести ещё один чемодан - руки заняты.')
                    continue
                }

                casse.push(chosenSuitcaseName)
                alert(`Ты берёшь «${chosenSuitcaseName}».`)
                continue
            }

            if (roomChoice == 1) {
                let portraitMenu = 'ПОРТРЕТЫ\n'
                for (let i = 0; i < portraitNames.length; i++) {
                    const liftStatus = liftOccupancy[i] != undefined ? ' [лифт занят]' : ' [лифт пуст]'
                    portraitMenu += `${i + 1} - ${portraitNames[i]}${liftStatus}\n`
                }
                portraitMenu += '0 - Отойти от портретов.'

                const portraitChoice = +prompt(portraitMenu)

                if (portraitChoice == 0) {
                    continue
                }
                if (portraitChoice < 1 || portraitChoice > portraitNames.length) {
                    alert('Такого портрета нет.')
                    continue
                }

                const portraitIndex = portraitChoice - 1

                const portraitActionChoice = +prompt(
                    `ПОРТРЕТ: ${portraitNames[portraitIndex]}\n` +
                    '1 - Прочитать табличку.\n' +
                    '2 - Поставить чемодан в лифт.\n' +
                    '0 - Отойти.'
                )

                if (portraitActionChoice == 0) {
                    continue
                }

                if (portraitActionChoice == 1) {
                    alert(
                        'ТАБЛИЧКА\n' +
                        portraitTablets[portraitIndex]
                    )
                    continue
                }

                if (portraitActionChoice == 2) {
                    if (liftOccupancy[portraitIndex] != undefined) {
                        const removeChoice = +prompt(
                            'Этот лифт уже занят.\n' +
                            '1 - Вытащить чемодан и вернуть в угол.\n' +
                            '2 - Оставить как есть.'
                        )
                        if (removeChoice == 1) {
                            const placedSuitcaseIndex = liftOccupancy[portraitIndex]
                            delete liftOccupancy[portraitIndex]
                            alert(`Ты вытаскиваешь «${suitcaseNames[placedSuitcaseIndex]}» из лифта и возвращаешь в угол.`)
                        }
                        continue
                    }

                    if (casse.length == 0) {
                        alert('ОШИБКА\nВидимо ты ещё не взял ни одного чемодана.')
                        continue
                    }

                    let ownedMenu = 'ТВОИ ЧЕМОДАНЫ\n'
                    for (let i = 0; i < casse.length; i++) {
                        ownedMenu += `${i + 1} - ${casse[i]}\n`
                    }
                    ownedMenu += '0 - Отмена.'

                    const ownedChoice = +prompt(ownedMenu + '\nКакой чемодан поставить в лифт?')

                    if (ownedChoice == 0) {
                        continue
                    }
                    if (ownedChoice < 1 || ownedChoice > casse.length) {
                        alert('Такого чемодана у тебя нет.')
                        continue
                    }

                    const selectedSuitcaseName = casse[ownedChoice - 1]
                    const selectedSuitcaseIndex = suitcaseNames.indexOf(selectedSuitcaseName)

                    if (correctPairs[portraitIndex] == selectedSuitcaseIndex) {
                        alert(
                            'ВЕРНО\n' +
                            `Ты ставишь «${selectedSuitcaseName}» в мини-лифт под портретом «${portraitNames[portraitIndex]}». Дверцы закрываются сами, и чемодан медленно уезжает вверх, в стену. Слышно, как наверху что-то щёлкает.`
                        )
                        casse.splice(ownedChoice - 1, 1)
                        liftOccupancy[portraitIndex] = selectedSuitcaseIndex
                    }
                    else {
                        wrongLiftAttempts += 1
                        if (wrongLiftAttempts > 3) {
                            health -= 10
                            alert(
                                'НЕВЕРНО\n' +
                                'Мини-лифт не принимает этот чемодан. Дверцы остаются открытыми, а в стене что-то недовольно скрипит. Чемодан остаётся у тебя в руках.\n' +
                                'И тут стена бьёт тебя током - коротко, зло, как будто отель устал от твоих ошибок.\n' +
                                `Ты теряешь 10 HP. Осталось: ${health}.`
                            )
                        }
                        else {
                            alert(
                                'НЕВЕРНО\n' +
                                'Мини-лифт не принимает этот чемодан. Дверцы остаются открытыми, а в стене что-то недовольно скрипит. Чемодан остаётся у тебя в руках.'
                            )
                        }
                    }
                    continue
                }
            }

            if (roomChoice == 3) {
                if (Object.keys(liftOccupancy).length == 5) {
                    storageExit = true
                    break
                }
                else {
                    alert('Проход ещё не открыт. Стена под портретами стоит на месте.')
                    continue
                }
            }
        }

        if (storageExit == true) {
            alert(
                'ПРОХОД ОТКРЫТ\n' +
                'Ты выходишь из кладовой в узкий коридор. За спиной стена снова закрывается, и пять портретов остаются позади. Впереди - новый коридор.'
            )
        }
    }
    alert(
        'КУХНЯ\n' +
        'Вы сразу попадаете на кухню. Пар, котлы, ножи на крюках. У плиты — повар в белом фартуке и колпаке. В руке у него тяжёлый тесак. Лицо мрачное, глаза пустые.\n' +
        'Повар: "Сюда можно только постояльцам, — говорит он глухо."\n' +
        'Вы: "Я и есть постоялец, — отвечаете вы."\n' +
        'Повар качает головой. Медленно, без злобы. Просто как человек, который уже всё решил.\n' +
        'Повар: "Нет. Постояльцы не ходят. Постояльцы лежат."\n' +
        'Он поднимает тесак. Пар вокруг него расходится, будто отталкиваемый.\n' +
        'Повар: "Значит, ужин будет из тебя."'
    )
    fightChief()
    if (health <= 0) {
        break
    }
    alert(
        'ГАЛЕРЕЯ НАД ПРОВАЛОМ\n' +
        'Коридор уходит вперёд, но пола под ним больше нет. Балкон без перил, а под ним - чернота. Доски скрипят, некоторые сгнили насквозь. Пройти можно только по краю.'
    )
    const galleryRoll = rollD6()
    if (galleryRoll >= 5) {
        alert(
            'ЛОВУШКА\n' +
            'Вы делаете шаг - и доска проваливается. Вы успеваете схватиться за край, но рука соскальзывает.\n' +
            'Вы теряете 8 HP.'
        )
        health -= 8
    }
    else if (galleryRoll >= 3) {
        alert(
            'ОСТОРОЖНО\n' +
            'Вы идёте медленно, проверяя каждую доску. Половица трещит, но держит.\n' +
            'Вы проходите. Но на выходе находите кем-то оброненный кошель.'
        )
        const galleryLoot = rollLoot()
        balance += galleryLoot
        alert(
            'НАГРАДА\n' +
            `Вы подбираете ${galleryLoot} монет.`
        )
    }
    else {
        alert(
            'ЛЁГКИЙ ПУТЬ\n' +
            'Доски держат. Вы проходите быстро, не задерживаясь.\n' +
            'В конце галереи - сундук. Внутри монеты.'
        )
        const galleryLoot = rollLoot()
        balance += galleryLoot
        alert(
            'НАГРАДА\n' +
            `Вы достаёте ${galleryLoot} монет.`
        )
    }
    if (health <= 0) {
        alert(
            'ПАДЕНИЕ\n' +
            'Доска обломилась. Вы летите вниз, в темноту, и ударяетесь о камни.\n' +
            'Последнее, что вы видите, — галерею сверху, такую далёкую.'
        )
        dieCount += 1
        break
    }
    alert(
        'ГОСТИНАЯ «ПЛЮЩ И ПЫЛЬ»\n' +
        'Плющ пророс сквозь стены. Мебель в пыли, но чайник на столе ещё тёплый. В углах - тени. Они не двигаются, но вы чувствуете их взгляд.\n' +
        'Из-под пыли торчит край сундука. На камине - склянка с чем-то тёмным.'
    )
    const guestRoomChoice = +prompt(
        'ВЫБОР\n' +
        '1 - Обыскать сундук.\n' +
        '2 - Взять склянку с камина.\n' +
        '3 - Пройти мимо.'
    )
    if (guestRoomChoice == 1) {
        const guestLoot = rollLoot()
        balance += guestLoot
        alert(
            'СУНДУК\n' +
            `Внутри ${guestLoot} монет и старая пуговица.`
        )
    }
    else if (guestRoomChoice == 2) {
        alert(
            'СКЛЯНКА\n' +
            'Вы берёте склянку. Жидкость внутри пахнет травами. Вы выпиваете — и чувствуете, как боль уходит.\n' +
            'Вы восстанавливаете 10 HP.'
        )
        health += 10
    }
    else {
        alert(
            'МИМО\n' +
            'Вы проходите мимо. Тени в углах провожают вас взглядом.'
        )
    }
    alert(
        'КОТЕЛЬНАЯ\n' +
        'Жарко. Пар стоит такой густой, что дальний угол теряется. У котла стоит человек в кожаном фартуке и каске. В руке — разводной ключ.\n' +
        'Сюда нельзя. Котельная — только для своих.'
    )
    const machineAnswer = +prompt('ДИАЛОГ\n1 - "Я постоялец. Мне нужно пройти."\n2 - "Кто ты?"')
    if (machineAnswer == 1) {
        alert('ОТКАЗ\nМашинист: "Постояльцы не ходят по котельной. Постояльцы греются в котлах."')
    }
    else {
        alert('ОТВЕТ\nМашинист: "Я тот, кто топит котлы. И тот, кто не пускает гостей."')
    }
    alert('БОЙ С МАШИНИСТОМ\nМашинист поднимает ключ.\n— Ладно. Значит, будет жарко.')
    fightMachine()
    if (health <= 0) break

    alert(
        'A08 - БИБЛИОТЕКА\n' +
        'Стеллажи с книгами за сотни лет. На столе — открытая гостевая книга и карта отеля.'
    )
    const libraryChoice = +prompt('ВЫБОР\n1 - Прочитать гостевую книгу.\n2 - Взять карту.\n3 - Искать тайник.')
    if (libraryChoice == 1) {
        alert('КНИГА\nЗапись: «Смотритель боится своего отражения. Зеркало — его слабость.»')
        connection += 1
    }
    else if (libraryChoice == 2) {
        alert('КАРТА\nВы берёте карту. Теперь вы знаете, где ловушки.\nВы получаете преимущество.')
        connection += 1
    }
    else if (libraryChoice == 3) {
        const libraryLoot = rollLoot()
        balance += libraryLoot
        alert(`ТАЙНИК\nЗа стеллажами — сундук. Внутри ${libraryLoot} монет.`)
    }

    alert(
        'ДВОР С КОЛОДЦЕМ\n' +
        'Стеклянный купол, в центре — старый колодец. Из него доносится шёпот. У колодца — человек в доспехе из коры. В руке — секатор.\n' +
        'Садовник: "Ты пришёл к колодцу. Значит, хочешь пить. Но вода не для всех."'
    )
    const gardenerChoice = +prompt('ДИАЛОГ\n1 - "Я просто хочу пройти."\n2 - "Кто ты?"\n3 - "Что в колодце?"')
    if (gardenerChoice == 1) {
        alert('ОТКАЗ\nСадовник: "Только через меня."')
    }
    else if (gardenerChoice == 2) {
        alert('ОТВЕТ\nСадовник: "Я тот, кто поливает этот сад. И тот, кто не пускает гостей."')
    }
    else {
        alert('ОТВЕТ\nСадовник: "В колодце — те, кто не дошёл. Они всё ещё шепчут."')
    }
    alert('БОЙ С САДОВНИКОМ\nСадовник поднимает секатор.\n— Значит, ужин будет из тебя.')
    fightGardener()
    if (health <= 0) break

    alert(
        'КОРОЛЕВСКИЕ АПАРТАМЕНТЫ\n' +
        'Роскошный номер. На столе — письмо. На кровати — шкатулка. На стене — портрет.'
    )
    const kingRoomChoice = +prompt('ВЫБОР\n1 - Прочитать письмо.\n2 - Открыть шкатулку.\n3 - Пройти мимо.')
    if (kingRoomChoice == 1) {
        alert('ПИСЬМО\n«Я тоже был послан королём. Я дошёл и не решился идти дальше. Не сдавайся.»\nВы чувствуете прилив сил.')
        health += 5
        if (health > maxHealth) health = maxHealth
    }
    else if (kingRoomChoice == 2) {
        const kingLoot = rollLoot()
        balance += kingLoot
        alert(`ШКАТУЛКА\nВнутри ${kingLoot} монет и старая печать.`)
    }
    else {
        alert('МИМО\nПортрет провожает вас взглядом.')
    }

    alert(
        'ЛАБОРАТОРИЯ\n' +
        'Механизмы, ловушки, записи. У стены — человек в резиновом халате. В руке — электрический жезл.\n' +
        'Учёный: "Ага! Новый образец!"'
    )
    const scientistChoice = +prompt('ДИАЛОГ\n1 - "Я не образец. Я гость."\n2 - "Что ты здесь делаешь?"\n3 - "Отойди."')
    if (scientistChoice == 1) {
        alert('ОТКАЗ\nУчёный: "Все так говорят. А потом — разряд."')
    }
    else if (scientistChoice == 2) {
        alert('ОТВЕТ\nУчёный: "Я изучаю отель. И гостей. Особенно гостей."')
    }
    else {
        alert('ОТВЕТ\nУчёный: "Отойти? Но мы только начали!"')
    }
    alert('БОЙ С УЧЁНЫМ\nУчёный поднимает жезл. Вокруг трещат разряды.')
    fightScientist()
    if (health <= 0) break

    alert(
        'ТЕМНИЦА\n' +
        'Сыро, темно. В клетках — тени. У стены — человек в форме тюремщика. В руке — плеть. На поясе — ключи.\n' +
        'Надзиратель: "Сюда можно только по делу."'
    )
    const wardenChoice = +prompt('ДИАЛОГ\n1 - "Я ищу выход."\n2 - "Кто ты?"\n3 - "Выпусти меня."')
    if (wardenChoice == 1) {
        alert('ОТКАЗ\nНадзиратель: "В темнице нет выхода. Только вход."')
    }
    else if (wardenChoice == 2) {
        alert('ОТВЕТ\nНадзиратель: "Я тот, кто держит гостей."')
    }
    else {
        alert('ОТВЕТ\nНадзиратель: "Выпустить? Ха. Ты ещё не заперт."')
    }
    alert('БОЙ С НАДЗИРАТЕЛЕМ\nНадзиратель поднимает плеть.')
    fightWarden()
    if (health <= 0) break

    alert(
        'NPC - ЗЕК\n' +
        'В одной из клеток сидит человек в лохмотьях.\n' +
        'Ты убил его. Значит, ты не просто гость.'
    )
    const prisonerChoice = +prompt('ДИАЛОГ\n1 - "Кто ты?"\n2 - "Что ты знаешь об отеле?"\n3 - "Как пройти дальше?"')
    if (prisonerChoice == 1) {
        alert('ОТВЕТ\nЗек: "Я был гостем. Дошёл до темницы — и остался."')
    }
    else if (prisonerChoice == 2) {
        alert('ОТВЕТ\nЗек: "Смотритель — не хозяин. Он такой же гость. Просто первый."')
        connection += 1
    }
    else {
        alert('ОТВЕТ\nЗек: "Дальше — торговец. Он продаст то, что поможет. Но не дёшево."\nОн протягивает вам ключ.')
        inventory.push('Ключ от клетки')
    }

    alert(
        'ТОРГОВЕЦ\n' +
        'За прилавком — человек в плаще с капюшоном. На прилавке — склянки, амулеты, старый меч.\n' +
        'Торговец: "Гость. Что будешь брать?"'
    )
    const traderChoice = +prompt(
        'ТОВАРЫ\n' +
        '1 - Зелье лечения (+20 HP) — 30 монет\n' +
        '2 - Амулет удачи (крит на 5+) — 50 монет\n' +
        '3 - Стальной меч (урон +3) — 80 монет\n' +
        '4 - Ничего не брать.'
    )
    if (traderChoice == 1) {
        if (balance >= 30) {
            payMoney(30)
            inventory.push('Зелье лечения')
            alert('ПОКУПКА\nВы берёте зелье. Восстанавливаете 20 HP.')
            health += 20
            if (health > maxHealth) health = maxHealth
        }
        else {
            alert('Торговец: "Не хватает. Приходи, когда будут деньги."')
        }
    }
    else if (traderChoice == 2) {
        if (balance >= 50) {
            payMoney(50)
            inventory.push('Амулет удачи')
            alert('ПОКУПКА\nТеперь крит срабатывает на 5 и 6.')
        }
        else {
            alert('Торговец: "Не хватает."')
        }
    }
    else if (traderChoice == 3) {
        if (balance >= 80) {
            payMoney(80)
            inventory.push('Стальной меч')
            tryEquipWeapon('Стальной меч')
            alert('ПОКУПКА\nВы берёте стальной меч.')
        }
        else {
            alert('Торговец: "Не хватает."')
        }
    }
    else {
        alert('Торговец: "Как хочешь. Дальше будет хуже."')
    }

    alert(
        'ЗАЛ С ЛОВУШКАМИ\n' +
        'Длинный зал. Плиты на полу. В конце — дверь. На стене: «Кто спешит — тот падает. Кто думает — тот проходит».'
    )
    const trapChoice = +prompt('ВЫБОР\n1 - Пройти быстро.\n2 - Пройти медленно.\n3 - Осмотреть стены.')
    if (trapChoice == 1) {
        const trapRoll = rollD6()
        if (trapRoll >= 4) {
            alert('ЛОВУШКА\nИз стены вылетает стрела. Вы теряете 6 HP.')
            health -= 6
        }
        else {
            alert('ПРОХОД\nВы пробегаете зал. Плиты щёлкают впустую.')
        }
    }
    else if (trapChoice == 2) {
        alert('ОСТОРОЖНО\nВы идёте медленно. В конце зала находите кошель.')
        const trapLoot = rollLoot()
        balance += trapLoot
        alert(`НАГРАДА\nВы подбираете ${trapLoot} монет.`)
    }
    else {
        alert('СТЕНЫ\nЗа факелом — рычаг. Вы тянете его — ловушки отключаются.\nВы проходите без потерь.')
        connection += 1
    }
    if (health <= 0) {
        alert('СМЕРТЬ\nСтрела попадает в сердце.\nПоследнее, что вы видите, — дверь в конце зала.')
        dieCount += 1
        break
    }

    alert(
        'КОРИДОР ПЕРЕД НОМЕРОМ 14\n' +
        'Вы стоите перед двумя дверями.\n' +
        'Левая - с номером «14». Ваш номер. Тот самый, что дал Айкар. Дверь приоткрыта. Внутри тепло, пахнет воском. Кровать застелена. На столе - чашка чая, ещё горячего. Будто вас ждали.\n' +
        'Правая - тёмная, без номера, будто из другого времени. Из-под неё не тянет ни холодом, ни теплом. Тянет тишиной. И чем-то тяжёлым - как дыханием того, кто стоит очень близко.\n' +
        'Отель шепчет из-за стен:\n' +
        '«Останься. Ты устал. Ты заслужил отдых. Король не узнает. Никто не узнает.»\n' +
        'Вы смотрите на чашку чая. На кровать. На дверь, которая никогда не закрывалась.\n' +
        'А потом вы смотрите на тёмную дверь.\n' +
        'И вспоминаете Эдварда. Марту. Семью Ортис. Всех, кто остался.'
    )
    let finalChoice = 0
    while (finalChoice != 1 && finalChoice != 2) {
        finalChoice = +prompt(
            'ВЫБОР\n' +
            '1 - Войти в свой номер. Остаться на ночь.\n' +
            '2 - Идти дальше. Сразиться со Смотрителем.'
        )
        if (finalChoice != 1 && finalChoice != 2) {
            alert('Вы стоите в нерешительности. Отель ждёт. Он умеет ждать.')
        }
    }

    if (finalChoice == 1) {
        alert(
            'НОМЕР 14\n' +
            'Вы открываете дверь.\n' +
            'Тепло. Тишина. Мягкий свет. Кровать застелена, будто вас действительно ждали - не как гостя, а как того, кто наконец вернулся домой.\n' +
            'Вы садитесь на край. Снимаете сапоги. Ложитесь.\n' +
            'Веки тяжелеют. Голова опускается на подушку. Чай на столе остывает.\n' +
            'Последняя мысль: «Я вернусь. Завтра. Обязательно вернусь.»\n' +
            'Завтра не наступит.'
        )
        alert(
            'УТРО, КОТОРОГО НЕ БУДЕТ\n' +
            'Вы просыпаетесь от того, что дверь вашего номера закрывается. Сама собой.\n' +
            'Вы пытаетесь встать - не можете. Тело не слушается. Руки не поднимаются. Голос не идёт из горла.\n' +
            'Стены сжимаются. Комната становится чуть теснее. Ещё чуть. Ещё.\n' +
            'И тут вы понимаете: это не номер. Это рама. Ваш портрет на стене коридора.\n' +
            'Рядом с Эдвардом. Рядом с Мартой. Рядом с семьёй Ортис. Рядом с теми, кого вы обещали найти.\n' +
            'Под вашим портретом появляется табличка:\n' +
            '«Стражник. Прибыл. Выбыл. Не дождался».'
        )
        alert(
            'КОНЕЦ: «ПОСТОЯЛЕЦ №14»\n' +
            'Вы остались в своём номере. Отель забрал вас в себя - навсегда.\n' +
            'Король будет ждать неделю. Потом две. Потом перестанет считать.\n' +
            'В тронный зал войдёт стражник с пустыми руками. Молча положит на стол корону.\n' +
            'Король прослушает запись. Дважды. И прикажет сжечь отель.\n' +
            'Отель сгорит. Но не до конца.\n' +
            'Через несколько месяцев на старую дорогу выйдет новый стражник. Молодой. С королевской печатью в руке.\n' +
            'Он дойдёт до этого коридора. Увидит ваш портрет - в форме портье, с потухшим взглядом.\n' +
            'И не узнает вас.\n' +
            'А за стойкой его будет ждать Айкар. Или кто-то, кто теперь носит ваше имя.\n' +
            'Отель не сгорел. Отель никогда не сгорает. Он просто затаился.\n' +
            'Вы стали одним из них.'
        )
        dieCount += 1
        break
    }

    if (finalChoice == 2) {
        alert(
            'ВЫ ИДЁТЕ ДАЛЬШЕ\n' +
            'Вы отворачиваетесь от двери с номером «14».\n' +
            'За спиной она тихо скрипит - будто зовёт. Будто обиделась. Будто обещает, что вы ещё вернётесь.\n' +
            'Вы не оборачиваетесь.\n' +
            'Тёмная дверь открывается сама.\n' +
            'За ней - большой номер. За окном - туман, но сквозь него пробивается свет. В центре комнаты стоит Смотритель.\n' +
            'На груди у него - связка ключей. Сотни ключей. И каждый, кажется, помнит чью-то руку.\n' +
            'Смотритель: "Ты дошёл. Первый за долгое время. Но это ничего не меняет."'
        )

        if (negativeBalanceHappened == 1) {
            alert(
                'ДОЛГ\n' +
                'Смотритель улыбается. Тонко, как улыбался Айкар.\n' +
                'Ты ушёл в минус. Отель запомнил.\n' +
                'Из тени за его спиной выходит ещё одна фигура.\n' +
                'Айкар. Тот самый, что стоял за стойкой в вестибюле. Только теперь на нём не бейджик - а обожжённые рукава, и глаза, будто залитые огнём.\n' +
                'Здравствуй, гость, — говорит он тихо. — Я же предупреждал. Отель не любит, когда у него в долг.\n' +
                'Он поднимает руку. Между пальцами вспыхивает пламя.\n' +
                'Теперь нас двое.'
            )
            bossHasAssistant = 1
        }

        if (connection >= 2) {
            alert('ПОДСКАЗКИ\nВы вспоминаете всё, что узнали. О слабости Смотрителя. О его страхе. Вы знаете, куда бить.')
        }

        fightBoss()
        if (winCount >= 1) {
            break
        }
        if (health <= 0) {
            break
        }
    }
}