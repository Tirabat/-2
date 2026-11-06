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
let health = 100
let bossHealth = 200
let bossAttack = 0
let rounds = 0
let deathAttempts = 0
let chiefHealth = 50
let machineHealth = 65
let wardenHealth = 65
let gardenerHealth = 60
let scientistHealth = 60
let greedHealth = 80
let negativeBalanceHappened = 0
let maxHealth = 100
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
let strengthBonus = 0
let usedMirrorThisFight = 0

function payMoney(amount) {
    balance -= amount
    if (balance < 0) {
        negativeBalanceHappened = 1
    }
}

function rollLoot() {
    return Math.floor(Math.random() * 11) + 10
}
function rollD8() {
    return Math.floor(Math.random() * 8) + 1
}

function rollD3() {
    return Math.floor(Math.random() * 3) + 1
}
function rollD4() {
    return Math.floor(Math.random() * 4) + 1
}
function rollD5() {
    return Math.floor(Math.random() * 5) + 1
}
function rollD6() {
    return Math.floor(Math.random() * 6) + 1
}
function rollD20() {
    return Math.floor(Math.random() * 20) + 1
}

function getWeaponDamage() {
    if (equippedWeapon == 'Деревянный меч') {
        const r = rollD6()
        if (r == 1) return 0
        if (r == 2) return 6
        if (r == 3) return 8
        if (r == 4) return 10
        if (r == 5) return 12
        return 15
    }
    if (equippedWeapon == 'Тяжёлый тесак') {
        const r = rollD6()
        if (r == 1) return 0
        if (r == 2) return 7
        if (r == 3) return 9
        if (r == 4) return 11
        if (r == 5) return 13
        return 16
    }
    if (equippedWeapon == 'Разводной ключ') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 6
        if (r == 3) return 8
        if (r == 4) return 10
        if (r == 5) return 12
        if (r == 6) return 14
        if (r == 7) return 16
        return 18
    }
    if (equippedWeapon == 'Секатор королевского садовника') {
        const r = rollD6()
        if (r == 1) return 0
        if (r == 2) return 8
        if (r == 3) return 10
        if (r == 4) return 12
        if (r == 5) return 14
        return 17
    }
    if (equippedWeapon == 'Электрический жезл') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 7
        if (r == 3) return 9
        if (r == 4) return 11
        if (r == 5) return 13
        if (r == 6) return 15
        if (r == 7) return 17
        return 19
    }
    if (equippedWeapon == 'Плеть надзирателя') {
        const r = rollD6()
        if (r == 1) return 0
        if (r == 2) return 6
        if (r == 3) return 8
        if (r == 4) return 10
        if (r == 5) return 12
        return 14
    }
    if (equippedWeapon == 'Стальной меч') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 8
        if (r == 3) return 10
        if (r == 4) return 12
        if (r == 5) return 14
        if (r == 6) return 16
        if (r == 7) return 18
        return 20
    }
    if (equippedWeapon == 'Кинжал') {
        const r1 = rollD6()
        const r2 = rollD6()
        let d1 = 0
        let d2 = 0
        if (r1 == 2) d1 = 5
        else if (r1 == 3) d1 = 7
        else if (r1 == 4) d1 = 9
        else if (r1 == 5) d1 = 11
        else if (r1 == 6) d1 = 13
        if (r2 == 2) d2 = 5
        else if (r2 == 3) d2 = 7
        else if (r2 == 4) d2 = 9
        else if (r2 == 5) d2 = 11
        else if (r2 == 6) d2 = 13
        return d1 + d2
    }
    if (equippedWeapon == 'Копьё') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 7
        if (r == 3) return 9
        if (r == 4) return 11
        if (r == 5) return 13
        if (r == 6) return 15
        if (r == 7) return 17
        return 19
    }
    if (equippedWeapon == 'Боевой молот') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 8
        if (r == 3) return 10
        if (r == 4) return 12
        if (r == 5) return 14
        if (r == 6) return 16
        if (r == 7) return 18
        return 20
    }
    if (equippedWeapon == 'Рапира') {
        const r = rollD6()
        if (r == 1) return 0
        if (r == 2) return 8
        if (r == 3) return 10
        if (r == 4) return 12
        if (r == 5) return 14
        return 17
    }
    if (equippedWeapon == 'Алебарда') {
        const r = rollD8()
        if (r == 1) return 0
        if (r == 2) return 8
        if (r == 3) return 10
        if (r == 4) return 12
        if (r == 5) return 14
        if (r == 6) return 16
        if (r == 7) return 18
        return 20
    }
    return 0
}

function getWeaponName() {
    return equippedWeapon
}

function getWeaponMaxDamage() {
    if (equippedWeapon == 'Деревянный меч') return 15
    if (equippedWeapon == 'Тяжёлый тесак') return 16
    if (equippedWeapon == 'Разводной ключ') return 18
    if (equippedWeapon == 'Секатор королевского садовника') return 17
    if (equippedWeapon == 'Электрический жезл') return 19
    if (equippedWeapon == 'Плеть надзирателя') return 14
    if (equippedWeapon == 'Стальной меч') return 20
    if (equippedWeapon == 'Кинжал') return 26
    if (equippedWeapon == 'Копьё') return 19
    if (equippedWeapon == 'Боевой молот') return 20
    if (equippedWeapon == 'Рапира') return 17
    if (equippedWeapon == 'Алебарда') return 20
    return 15
}

function getWeaponDescription(item) {
    if (item == 'Деревянный меч') return 'Деревянный меч.\nУрон: 6-15. Промах: 1/6.'
    if (item == 'Тяжёлый тесак') return 'Тяжёлый тесак.\nУрон: 7-16.\nЭффект: кровотечение (2 урона 2 хода).'
    if (item == 'Разводной ключ') return 'Разводной ключ.\nУрон: 6-18.\nЭффект: 10% шанс оглушения.'
    if (item == 'Секатор королевского садовника') return 'Секатор.\nУрон: 8-17.\nЭффект: игнорирует броню.'
    if (item == 'Электрический жезл') return 'Электрический жезл.\nУрон: 7-19.\nЭффект: 30% шанс +2 урона.'
    if (item == 'Плеть надзирателя') return 'Плеть надзирателя.\nУрон: 6-14.\nЭффект: рана (+1 к входящему урону).'
    if (item == 'Стальной меч') return 'Стальной меч.\nУрон: 8-20.'
    if (item == 'Кинжал') return 'Кинжал.\nУрон: 10-26 (два удара по 5-13).\nКаждый удар может промахнуться.'
    if (item == 'Копьё') return 'Копьё.\nУрон: 7-19.\nЭффект: −2 к броне игрока.'
    if (item == 'Боевой молот') return 'Боевой молот.\nУрон: 8-20.\nЭффект: 20% шанс оглушения.'
    if (item == 'Рапира') return 'Рапира.\nУрон: 8-17.\nЭффект: 30% шанс крита (+3 урона).'
    if (item == 'Алебарда') return 'Алебарда.\nУрон: 8-20.\nЭффект: игнорирует броню.'
    return ''
}

function getItemDescription(item) {
    if (item == 'Кожаный шлем') return 'Кожаный шлем.\nБроня: 3.'
    if (item == 'Колпак повара') return 'Колпак повара.\nБроня: 4.\nЧасть сета Повара.'
    if (item == 'Каска машиниста') return 'Каска машиниста.\nБроня: 4.\nЧасть сета Машиниста.'
    if (item == 'Медный шлем с проводами') return 'Медный шлем с проводами.\nБроня: 3.\nЧасть сета Учёного.'
    if (item == 'Венок из шипов') return 'Венок из шипов.\nБроня: 2.\nЧасть сета Садовника.'
    if (item == 'Шлем стражи') return 'Шлем стражи.\nБроня: 3.\nЧасть сета Стражника.'
    if (item == 'Кожаный нагрудник') return 'Кожаный нагрудник.\nБроня: 2.'
    if (item == 'Фартук повара') return 'Фартук повара.\nБроня: 4.\nЧасть сета Повара.'
    if (item == 'Кожаный фартук машиниста') return 'Кожаный фартук машиниста.\nБроня: 5.\nЧасть сета Машиниста.'
    if (item == 'Доспех из коры') return 'Доспех из коры.\nБроня: 5.\nЧасть сета Садовника.'
    if (item == 'Резиновый халат') return 'Резиновый халат.\nБроня: 6.\nЧасть сета Учёного.'
    if (item == 'Кольчуга') return 'Кольчуга.\nБроня: 5.\nЧасть сета Стражника.'
    if (item == 'Кожаные штаны') return 'Кожаные штаны.\nБроня: 2.'
    if (item == 'Кожаные сапоги') return 'Кожаные сапоги.\nБроня: 2.'
    if (item == 'Ботинки машиниста') return 'Ботинки машиниста.\nБроня: 3.\nЧасть сета Машиниста.'
    if (item == 'Рукавицы машиниста') return 'Рукавицы машиниста.\nБроня: 1.\nЧасть сета Машиниста.'
    if (item == 'Щит') return 'Щит.\nБроня: 4.\nЭффект: 20% шанс блокировки.\nЧасть сета Стражника.'
    if (item == 'Наручи') return 'Наручи.\nБроня: 2.\nЭффект: 10% шанс блокировки.'
    return ''
}

function weaponBleeds() { return equippedWeapon == 'Тяжёлый тесак' }
function weaponStuns() { return equippedWeapon == 'Разводной ключ' || equippedWeapon == 'Боевой молот' }
function weaponWounds() { return equippedWeapon == 'Плеть надзирателя' }
function weaponPierces() { return equippedWeapon == 'Секатор королевского садовника' || equippedWeapon == 'Алебарда' }
function weaponElectric() { return equippedWeapon == 'Электрический жезл' }
function weaponRapier() { return equippedWeapon == 'Рапира' }
function weaponSpear() { return equippedWeapon == 'Копьё' }

function getPlayerArmor() {
    let armor = 0
    if (equippedHelmet == 'Кожаный шлем') armor += 3
    if (equippedHelmet == 'Колпак повара') armor += 4
    if (equippedHelmet == 'Каска машиниста') armor += 4
    if (equippedHelmet == 'Медный шлем с проводами') armor += 3
    if (equippedHelmet == 'Венок из шипов') armor += 2
    if (equippedHelmet == 'Шлем стражи') armor += 3
    if (equippedChest == 'Кожаный нагрудник') armor += 2
    if (equippedChest == 'Фартук повара') armor += 4
    if (equippedChest == 'Кожаный фартук машиниста') armor += 5
    if (equippedChest == 'Доспех из коры') armor += 5
    if (equippedChest == 'Резиновый халат') armor += 6
    if (equippedChest == 'Кольчуга') armor += 5
    if (equippedLegs == 'Кожаные штаны') armor += 2
    if (equippedFeet == 'Кожаные сапоги') armor += 2
    if (equippedFeet == 'Ботинки машиниста') armor += 3
    if (equippedHands == 'Рукавицы машиниста') armor += 1
    if (equippedHands == 'Щит') armor += 4
    if (equippedHands == 'Наручи') armor += 2
    return armor
}

function getPlayerBlockChance() {
    let block = Math.floor(getPlayerArmor() / 2)
    if (equippedHands == 'Щит') block += 4
    if (equippedHands == 'Наручи') block += 2
    if (hasGuardianSet()) block += 2
    return block
}

function getPlayerRegen() {
    if (hasCookSet()) return 0
    if (hasGardenerSet()) return 3
    return 0
}

function hasCookSet() {
    return equippedChest == 'Фартук повара' && equippedHelmet == 'Колпак повара'
}

function hasEngineerSet() {
    return equippedChest == 'Кожаный фартук машиниста' && equippedHelmet == 'Каска машиниста' && equippedHands == 'Рукавицы машиниста' && equippedFeet == 'Ботинки машиниста'
}

function hasGardenerSet() {
    return equippedChest == 'Доспех из коры' && equippedHelmet == 'Венок из шипов'
}

function hasScientistSet() {
    return equippedChest == 'Резиновый халат' && equippedHelmet == 'Медный шлем с проводами'
}

function hasGuardianSet() {
    return equippedHands == 'Щит' && equippedHelmet == 'Шлем стражи' && equippedChest == 'Кольчуга'
}

function getStrengthBonus() {
    return strengthBonus
}

function tryEquipArmor(item) {
    if (item == 'Фартук повара' || item == 'Кожаный фартук машиниста' || item == 'Доспех из коры' || item == 'Резиновый халат' || item == 'Кольчуга' || item == 'Кожаный нагрудник') {
        equippedChest = item
        return
    }
    if (item == 'Колпак повара' || item == 'Каска машиниста' || item == 'Медный шлем с проводами' || item == 'Венок из шипов' || item == 'Шлем стражи' || item == 'Кожаный шлем') {
        equippedHelmet = item
        return
    }
    if (item == 'Ботинки машиниста' || item == 'Кожаные сапоги') {
        equippedFeet = item
        return
    }
    if (item == 'Рукавицы машиниста' || item == 'Щит' || item == 'Наручи') {
        equippedHands = item
        return
    }
}

function tryEquipWeapon(item) {
    if (item == 'Тяжёлый тесак' || item == 'Разводной ключ' || item == 'Секатор королевского садовника' || item == 'Электрический жезл' || item == 'Плеть надзирателя' || item == 'Стальной меч' || item == 'Кинжал' || item == 'Копьё' || item == 'Боевой молот' || item == 'Рапира' || item == 'Алебарда' || item == 'Деревянный меч') {
        equippedWeapon = item
    }
}

function showEquipment() {
    let menu = 'СНАРЯЖЕНИЕ\n'
    menu += 'Оружие: ' + equippedWeapon + ' (макс. урон: ' + getWeaponMaxDamage() + ')\n'
    menu += 'Голова: ' + equippedHelmet + '\n'
    menu += 'Торс: ' + equippedChest + '\n'
    menu += 'Обувь: ' + equippedFeet + '\n'
    menu += 'Руки: ' + (equippedHands == null ? 'пусто' : equippedHands) + '\n'
    menu += 'Общая броня: ' + getPlayerArmor() + '\n'
    menu += 'Шанс блока: ' + getPlayerBlockChance() + '%\n'
    menu += 'Макс. HP: ' + maxHealth + '\n'
    if (hasCookSet()) menu += '[Сет Повара: +15 макс. HP]\n'
    if (hasEngineerSet()) menu += '[Сет Машиниста: 20% отразить урон]\n'
    if (hasGardenerSet()) menu += '[Сет Садовника: шипы 2 урона, +3 регенерации]\n'
    if (hasScientistSet()) menu += '[Сет Учёного: +2 урона оружием]\n'
    if (hasGuardianSet()) menu += '[Сет Стражника: +3 брони, +10% блока]\n'
    return menu
}

function manageEquipment() {
    while (true) {
        alert(showEquipment())
        const slot = +prompt(
            'СМЕНА СНАРЯЖЕНИЯ\n' +
            '1 - Сменить оружие.\n' +
            '2 - Сменить шлем.\n' +
            '3 - Сменить нагрудник.\n' +
            '4 - Сменить обувь.\n' +
            '5 - Сменить перчатки.\n' +
            '0 - Выйти.'
        )
        if (slot == 0) return

        if (slot == 1) {
            const available = []
            for (let i = 0; i < inventory.length; i++) {
                const it = inventory[i]
                if (it == 'Деревянный меч' || it == 'Тяжёлый тесак' || it == 'Разводной ключ' || it == 'Секатор королевского садовника' || it == 'Электрический жезл' || it == 'Плеть надзирателя' || it == 'Стальной меч' || it == 'Кинжал' || it == 'Копьё' || it == 'Боевой молот' || it == 'Рапира' || it == 'Алебарда') {
                    available.push(it)
                }
            }
            if (available.length == 0) { alert('Нет оружия в инвентаре.'); continue }
            let menu = 'ОРУЖИЕ В ИНВЕНТАРЕ\n'
            for (let i = 0; i < available.length; i++) {
                menu += (i + 1) + ' - ' + available[i] + (available[i] == equippedWeapon ? ' (надето)' : '') + '\n'
            }
            menu += '0 - Отмена.'
            const pick = +prompt(menu)
            if (pick >= 1 && pick <= available.length) {
                const chosen = available[pick - 1]
                alert(getWeaponDescription(chosen))
                const confirm = +prompt('1 - Надеть\n2 - Оставить')
                if (confirm == 1) {
                    equippedWeapon = chosen
                    alert('Надето: ' + equippedWeapon)
                }
            }
            continue
        }

        if (slot == 2) {
            const available = []
            for (let i = 0; i < inventory.length; i++) {
                const it = inventory[i]
                if (it == 'Кожаный шлем' || it == 'Колпак повара' || it == 'Каска машиниста' || it == 'Медный шлем с проводами' || it == 'Венок из шипов' || it == 'Шлем стражи') available.push(it)
            }
            if (available.length == 0) { alert('Нет шлемов.'); continue }
            let menu = 'ШЛЕМЫ\n'
            for (let i = 0; i < available.length; i++) menu += (i + 1) + ' - ' + available[i] + (available[i] == equippedHelmet ? ' (надето)' : '') + '\n'
            menu += '0 - Отмена.'
            const pick = +prompt(menu)
            if (pick >= 1 && pick <= available.length) {
                const chosen = available[pick - 1]
                alert(getItemDescription(chosen))
                const confirm = +prompt('1 - Надеть\n2 - Оставить')
                if (confirm == 1) { equippedHelmet = chosen; alert('Надето: ' + equippedHelmet) }
            }
            continue
        }

        if (slot == 3) {
            const available = []
            for (let i = 0; i < inventory.length; i++) {
                const it = inventory[i]
                if (it == 'Кожаный нагрудник' || it == 'Фартук повара' || it == 'Кожаный фартук машиниста' || it == 'Доспех из коры' || it == 'Резиновый халат' || it == 'Кольчуга') available.push(it)
            }
            if (available.length == 0) { alert('Нет нагрудников.'); continue }
            let menu = 'НАГРУДНИКИ\n'
            for (let i = 0; i < available.length; i++) menu += (i + 1) + ' - ' + available[i] + (available[i] == equippedChest ? ' (надето)' : '') + '\n'
            menu += '0 - Отмена.'
            const pick = +prompt(menu)
            if (pick >= 1 && pick <= available.length) {
                const chosen = available[pick - 1]
                alert(getItemDescription(chosen))
                const confirm = +prompt('1 - Надеть\n2 - Оставить')
                if (confirm == 1) { equippedChest = chosen; alert('Надето: ' + equippedChest) }
            }
            continue
        }

        if (slot == 4) {
            const available = []
            for (let i = 0; i < inventory.length; i++) {
                const it = inventory[i]
                if (it == 'Кожаные сапоги' || it == 'Ботинки машиниста') available.push(it)
            }
            if (available.length == 0) { alert('Нет обуви.'); continue }
            let menu = 'ОБУВЬ\n'
            for (let i = 0; i < available.length; i++) menu += (i + 1) + ' - ' + available[i] + (available[i] == equippedFeet ? ' (надето)' : '') + '\n'
            menu += '0 - Отмена.'
            const pick = +prompt(menu)
            if (pick >= 1 && pick <= available.length) {
                const chosen = available[pick - 1]
                alert(getItemDescription(chosen))
                const confirm = +prompt('1 - Надеть\n2 - Оставить')
                if (confirm == 1) { equippedFeet = chosen; alert('Надето: ' + equippedFeet) }
            }
            continue
        }

        if (slot == 5) {
            const available = []
            for (let i = 0; i < inventory.length; i++) {
                const it = inventory[i]
                if (it == 'Рукавицы машиниста' || it == 'Щит' || it == 'Наручи') available.push(it)
            }
            if (available.length == 0) { alert('Нет перчаток.'); continue }
            let menu = 'РУКИ\n1 - Снять (пусто)\n'
            for (let i = 0; i < available.length; i++) menu += (i + 2) + ' - ' + available[i] + (available[i] == equippedHands ? ' (надето)' : '') + '\n'
            menu += '0 - Отмена.'
            const pick = +prompt(menu)
            if (pick == 1) { equippedHands = null; alert('Снято.') }
            else if (pick >= 2 && pick <= available.length + 1) {
                const chosen = available[pick - 2]
                alert(getItemDescription(chosen))
                const confirm = +prompt('1 - Надеть\n2 - Оставить')
                if (confirm == 1) { equippedHands = chosen; alert('Надето: ' + equippedHands) }
            }
            continue
        }
    }
}

function bossDies() {
    maxHealth += 10
    health = maxHealth
}

function applySpearPenalty() {
    if (weaponSpear()) {
        return 2
    }
    return 0
}

function getWeaponFinalDamage(bossArmor) {
    let damage = getWeaponDamage()
    if (damage == 0) return 0
    if (hasScientistSet()) damage += 2
    damage += strengthBonus
    if (weaponPierces()) {
        return damage
    }
    if (bossArmor > 0) {
        damage -= bossArmor
        if (damage < 0) damage = 0
    }
    return damage
}

function fightChief() {
    chiefHealth = 60
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0
    usedMirrorThisFight = 0

    while (true) {
        if (chiefHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP повара: ' + chiefHealth)

        if (bossStunnedTurns > 0) {
            alert('Повар оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 6
            else if (bossRoll == 2) bossDamage = 8
            else bossDamage = 10
            bossDamage += playerWoundStacks
            const blockRoll = rollD20()
            if (blockRoll <= getPlayerBlockChance()) {
                alert('Повар бьёт! Вы блокируете удар.\nУрон: 0.')
            } else {
                health -= bossDamage
                alert('Повар бьёт! Урон: ' + bossDamage + '.\nВаше HP: ' + health)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(2)
            chiefHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) {
                bossBleedingStacks += 1
                bossBleedingTurns = 2
                effectText = '\nКровотечение! Стаков: ' + bossBleedingStacks + '.'
            }
            if (rawDamage > 0 && weaponStuns()) {
                if (Math.random() < 0.1) {
                    bossStunnedTurns += 1
                    effectText += '\nОГЛУШЕНИЕ!'
                }
            }
            if (rawDamage > 0 && weaponWounds()) {
                playerWoundStacks += 1
                effectText += '\nРана на игроке! Входящий урон +1.'
            }
            if (rawDamage > 0 && weaponElectric()) {
                if (Math.random() < 0.3) {
                    chiefHealth -= 2
                    effectText += '\nЭлектрический разряд! +2 урона.'
                }
            }
            if (rawDamage > 0 && weaponRapier()) {
                if (Math.random() < 0.3) {
                    chiefHealth -= 3
                    effectText += '\nКРИТ! +3 урона.'
                }
            }
            let text = 'Вы атакуете: ' + equippedWeapon + '.\nУрон: ' + rawDamage + '.'
            if (rawDamage == 0) text = 'Вы промахнулись!'
            alert(text + effectText + '\nHP повара: ' + chiefHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
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
            alert('Кровотечение! Повар теряет ' + bleedDmg + ' HP.\nHP повара: ' + chiefHealth)
        }
        if (hasEngineerSet() && Math.random() < 0.2) {
            health += 0
            alert('Сет Машиниста: удар отражён!')
        }
        const regen = getPlayerRegen()
        if (regen > 0) {
            health += regen
            if (health > maxHealth) health = maxHealth
            alert('Регенерация: +' + regen + ' HP.\nВаше HP: ' + health)
        }
        if (hasGardenerSet()) {
            chiefHealth -= 2
            alert('Шипы: повар получает 2 урона.')
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
        if (hasCookSet()) { maxHealth += 15; health = maxHealth }
        const loot = rollLoot()
        balance += loot
        alert('ДОБЫЧА\nТесак, фартук и колпак. ' + loot + ' монет.\nМакс. HP: ' + maxHealth)
        return
    }
}

function fightMachine() {
    machineHealth = 65
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0
    let machineBonus = 0

    while (true) {
        if (machineHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP машиниста: ' + machineHealth + '\nБонус урона машиниста: +' + machineBonus)

        if (bossStunnedTurns > 0) {
            alert('Машинист оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 8
            else if (bossRoll == 2) bossDamage = 10
            else bossDamage = 12
            bossDamage += machineBonus + playerWoundStacks
            const blockRoll = rollD20()
            if (blockRoll <= getPlayerBlockChance()) {
                alert('Машинист бьёт! Вы блокируете удар.\nУрон: 0.')
            } else {
                health -= bossDamage
                alert('Машинист бьёт! Урон: ' + bossDamage + '.\nВаше HP: ' + health)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(3)
            machineHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение! Стаков: ' + bossBleedingStacks + '.' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponWounds()) { playerWoundStacks += 1; effectText += '\nРана!' }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { machineHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { machineHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP машиниста: ' + machineHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
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
            alert('Кровотечение! Машинист теряет ' + bleedDmg + ' HP.\nHP: ' + machineHealth)
        }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
        if (hasGardenerSet()) { machineHealth -= 2; alert('Шипы: 2 урона.') }
        machineBonus += 1
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
        inventory.push('Кожаный фартук машиниста')
        inventory.push('Каска машиниста')
        tryEquipWeapon('Разводной ключ')
        tryEquipArmor('Кожаный фартук машиниста')
        tryEquipArmor('Каска машиниста')
        tryEquipArmor('Рукавицы машиниста')
        tryEquipArmor('Ботинки машиниста')
        bossDies()
        const loot = rollLoot()
        balance += loot
        alert('ДОБЫЧА\nКлюч, фартук, каска, рукавицы, ботинки. ' + loot + ' монет.\nМакс. HP: ' + maxHealth)
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
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP садовника: ' + gardenerHealth)

        if (bossStunnedTurns > 0) {
            alert('Садовник оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 6
            else if (bossRoll == 2) bossDamage = 8
            else bossDamage = 10
            bossDamage += playerWoundStacks
            health -= bossDamage
            alert('Садовник бьёт! (пробивает броню) Урон: ' + bossDamage + '.\nВаше HP: ' + health)
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(0)
            gardenerHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение! ' + bossBleedingStacks + '.' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponWounds()) { playerWoundStacks += 1; effectText += '\nРана!' }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { gardenerHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { gardenerHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP садовника: ' + gardenerHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
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
            alert('Кровотечение! ' + bleedDmg + ' HP.')
        }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
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
        alert('ДОБЫЧА\nСекатор, доспех и венок. ' + loot + ' монет.\nМакс. HP: ' + maxHealth)
        return
    }
}

function fightScientist() {
    scientistHealth = 60
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (scientistHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP учёного: ' + scientistHealth)

        if (bossStunnedTurns > 0) {
            alert('Учёный оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 8
            else if (bossRoll == 2) bossDamage = 10
            else bossDamage = 12
            bossDamage += playerWoundStacks
            const blockRoll = rollD20()
            if (blockRoll <= getPlayerBlockChance()) {
                alert('Учёный бьёт! Блок. Урон: 0.')
            } else {
                health -= bossDamage
                alert('Учёный бьёт! Урон: ' + bossDamage + '.\nВаше HP: ' + health)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(1)
            scientistHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение!' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponWounds()) { playerWoundStacks += 1; effectText += '\nРана!' }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { scientistHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { scientistHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP учёного: ' + scientistHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
        } else {
            alert('Учёный: "Долго думаешь. Наука не ждёт."')
            continue
        }
        if (scientistHealth <= 0) break

        if (bossBleedingTurns > 0) { const bd = bossBleedingStacks * 2; scientistHealth -= bd; bossBleedingTurns -= 1; if (bossBleedingTurns == 0) bossBleedingStacks = 0; alert('Кровотечение! ' + bd + '.') }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
        if (hasGardenerSet()) { scientistHealth -= 2; alert('Шипы: 2 урона.') }
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
        alert('ДОБЫЧА\nЖезл, халат и шлем. ' + loot + ' монет.\nМакс. HP: ' + maxHealth)
        return
    }
}

function fightWarden() {
    wardenHealth = 65
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    while (true) {
        if (wardenHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP надзирателя: ' + wardenHealth + '\nРан на игроке: ' + playerWoundStacks)

        if (bossStunnedTurns > 0) {
            alert('Надзиратель оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 6
            else if (bossRoll == 2) bossDamage = 8
            else bossDamage = 10
            bossDamage += playerWoundStacks
            const blockRoll = rollD20()
            if (blockRoll <= getPlayerBlockChance()) {
                alert('Надзиратель бьёт! Блок. Урон: 0.')
            } else {
                health -= bossDamage
                playerWoundStacks += 1
                alert('Надзиратель бьёт! Урон: ' + bossDamage + '.\nРана! Входящий урон +' + playerWoundStacks + '.\nВаше HP: ' + health)
            }
        }
        if (health <= 0) break

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(1)
            wardenHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение!' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { wardenHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { wardenHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP надзирателя: ' + wardenHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
        } else {
            alert('Надзиратель: "Долго думаешь. Плеть не ждёт."')
            continue
        }
        if (wardenHealth <= 0) break

        if (bossBleedingTurns > 0) { const bd = bossBleedingStacks * 2; wardenHealth -= bd; bossBleedingTurns -= 1; if (bossBleedingTurns == 0) bossBleedingStacks = 0; alert('Кровотечение! ' + bd + '.') }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
        if (hasGardenerSet()) { wardenHealth -= 2; alert('Шипы: 2 урона.') }
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
        alert('ДОБЫЧА\nПлеть надзирателя. ' + loot + ' монет.\nМакс. HP: ' + maxHealth)
        return
    }
}

function fightBoss() {
    bossHealth = 70
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0
    usedMirrorThisFight = 0

    while (true) {
        if (bossHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP Смотрителя: ' + bossHealth)

        if (bossStunnedTurns > 0) {
            alert('Смотритель оглушён и пропускает ход!')
            bossStunnedTurns -= 1
        } else {
            const bossRoll = rollD3()
            let bossDamage = 0
            if (bossRoll == 1) bossDamage = 10
            else if (bossRoll == 2) bossDamage = 12
            else bossDamage = 14
            bossDamage += playerWoundStacks
            const blockRoll = rollD20()
            if (blockRoll <= getPlayerBlockChance()) {
                alert('Смотритель бьёт! Блок. Урон: 0.')
            } else {
                health -= bossDamage
                alert('Смотритель бьёт! Урон: ' + bossDamage + '.\nВаше HP: ' + health)
            }
        }
        if (health <= 0) break

        let mirrorOption = ''
        if (inventory.indexOf('Зеркало') != -1 && usedMirrorThisFight == 0) {
            mirrorOption = '\n3 - Использовать зеркало.'
        }
        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.' + mirrorOption)

        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(2)
            bossHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение!' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponWounds()) { playerWoundStacks += 1; effectText += '\nРана!' }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { bossHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { bossHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP Смотрителя: ' + bossHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
        } else if (a == 3 && mirrorOption != '') {
            bossHealth -= 40
            bossStunnedTurns = 1
            usedMirrorThisFight = 1
            const idx = inventory.indexOf('Зеркало')
            inventory.splice(idx, 1)
            alert('ЗЕРКАЛО\nСмотритель смотрит в зеркало — и замирает.\nОтражение не двигается.\nОн отшатывается, закрывая лицо руками.\nУрон: 40. Смотритель пропустит ход.')
        } else {
            alert('Смотритель: "Долго думаешь. Отель не ждёт."')
            continue
        }
        if (bossHealth <= 0) break

        if (bossBleedingTurns > 0) { const bd = bossBleedingStacks * 2; bossHealth -= bd; bossBleedingTurns -= 1; if (bossBleedingTurns == 0) bossBleedingStacks = 0; alert('Кровотечение! ' + bd + '.') }
        if (bossHealth > 0) { bossHealth += 1; if (bossHealth > 70) bossHealth = 70; alert('Смотритель восстанавливает 1 HP.\nHP: ' + bossHealth) }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
        if (hasGardenerSet()) { bossHealth -= 2; alert('Шипы: 2 урона.') }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nСмотритель поднимает вас за воротник.\n— Ты был хорошим гостем. Но некоторые двери лучше не открывать.\nПоследнее, что вы слышите, — как звенят ключи.')
        dieCount += 1
        return
    }
    if (bossHealth <= 0) {
        alert('ПАДЕНИЕ СМОТРИТЕЛЯ\nСмотритель падает на колени. Связка ключей рассыпается.\n— Значит... всё-таки... — шепчет он. — ...кто-то смог.\nНо двери не открываются.\nЗа его спиной из тени поднимается что-то ещё. Что-то большее.\nТуман сгущается. Золото звенит в темноте.')
        fightGreed()
        return
    }
}

function fightGreed() {
    greedHealth = 80
    bossBleedingStacks = 0
    bossBleedingTurns = 0
    bossStunnedTurns = 0
    playerWoundStacks = 0
    rounds = 0

    alert('АЛЧНОСТЬ\nИз тумана выходит фигура. Она соткана из золота и монет — и звенит при каждом шаге.\nАлчность: "Ты убил его. Забрал его ключи. Но моё — не отдашь."')
    alert('Алчность: "Всё, что ты собрал, — моё. Всё, что ты купил, — моё. Всё, что ты украл у отеля, — моё."')

    while (true) {
        if (greedHealth <= 0 || health <= 0) break
        alert('РАУНД №' + (rounds + 1) + '\nВаше HP: ' + health + '\nHP Алчности: ' + greedHealth)

        const bossRoll = rollD6()
        let bossDamage = 0
        if (bossRoll == 1) bossDamage = 12
        else if (bossRoll == 2) bossDamage = 16
        else if (bossRoll == 3) bossDamage = 20
        else if (bossRoll == 4) bossDamage = 24
        else if (bossRoll == 5) bossDamage = 28
        else bossDamage = 32
        bossDamage += playerWoundStacks
        const blockRoll = rollD20()
        if (blockRoll <= getPlayerBlockChance()) {
            alert('Алчность бьёт! Блок. Урон: 0.')
        } else {
            health -= bossDamage
            alert('Алчность бьёт! Урон: ' + bossDamage + '.\nВаше HP: ' + health)
        }
        if (health <= 0) break

        if (Math.random() < 0.3 && balance > 0) {
            balance -= 10
            alert('Алчность крадёт 10 монет!')
        }

        const a = +prompt('ВЫБОР ДЕЙСТВИЙ\n1 - Атаковать.\n2 - Сменить снаряжение.')
        if (a == 1) {
            const rawDamage = getWeaponFinalDamage(5)
            greedHealth -= rawDamage
            let effectText = ''
            if (rawDamage > 0 && weaponBleeds()) { bossBleedingStacks += 1; bossBleedingTurns = 2; effectText = '\nКровотечение!' }
            if (rawDamage > 0 && weaponStuns()) { if (Math.random() < 0.1) { bossStunnedTurns += 1; effectText += '\nОГЛУШЕНИЕ!' } }
            if (rawDamage > 0 && weaponWounds()) { playerWoundStacks += 1; effectText += '\nРана!' }
            if (rawDamage > 0 && weaponElectric()) { if (Math.random() < 0.3) { greedHealth -= 2; effectText += '\n+2 урона.' } }
            if (rawDamage > 0 && weaponRapier()) { if (Math.random() < 0.3) { greedHealth -= 3; effectText += '\nКРИТ +3.' } }
            let text = rawDamage == 0 ? 'Вы промахнулись!' : 'Урон: ' + rawDamage + '.'
            alert(text + effectText + '\nHP Алчности: ' + greedHealth)
        } else if (a == 2) {
            manageEquipment()
            continue
        } else {
            alert('Алчность: "Ты думаешь? Золото не ждёт."')
            continue
        }
        if (greedHealth <= 0) break

        if (bossBleedingTurns > 0) { const bd = bossBleedingStacks * 2; greedHealth -= bd; bossBleedingTurns -= 1; if (bossBleedingTurns == 0) bossBleedingStacks = 0; alert('Кровотечение! ' + bd + '.') }
        if (greedHealth > 0) { greedHealth += 2; if (greedHealth > 80) greedHealth = 80; alert('Алчность восстанавливает 2 HP.') }
        const regen = getPlayerRegen()
        if (regen > 0) { health += regen; if (health > maxHealth) health = maxHealth; alert('Регенерация +' + regen + '.') }
        if (hasGardenerSet()) { greedHealth -= 2; alert('Шипы: 2 урона.') }
        rounds += 1
    }

    if (health <= 0) {
        alert('ПОРАЖЕНИЕ\nАлчность наклоняется над вами.\n— Всё моё. — шепчет она. — И ты — тоже.\nПоследнее, что вы видите, — золото, текущее из её рук.')
        dieCount += 1
        return
    }
    if (greedHealth <= 0) {
        alert('ИСТИННАЯ ПОБЕДА\nАлчность рассыпается на монеты. Туман расступается.\nДвери отеля открываются. Впервые за сотни лет.\nВы выходите наружу. Король ждёт.\nОтель остаётся позади — но вы знаете, что он не сгорел.\nОн просто затаился.\nВы победили. По-настоящему.')
        winCount += 1
        return
    }
}

function tradeWithMerchant() {
    while (true) {
        alert('ТОРГОВЕЦ\nЗа прилавком — человек в плаще с капюшоном.\nТорговец: "Гость. Что будешь брать?"\nУ вас ' + balance + ' монет.')
        const choice = +prompt(
            'ТОВАРЫ\n' +
            '1 - Бинт (+10 HP) — 10 монет\n' +
            '2 - Зелье лечения (+20 HP) — 20 монет\n' +
            '3 - Зелье силы (+3 урона на 1 бой) — 30 монет\n' +
            '4 - Амулет удачи (крит на 5+) — 40 монет\n' +
            '5 - Кинжал (макс. урон 8) — 50 монет\n' +
            '6 - Стальной меч (макс. урон 7) — 60 монет\n' +
            '7 - Рапира (макс. урон 5, крит) — 60 монет\n' +
            '8 - Копьё (макс. урон 6, -2 брони) — 70 монет\n' +
            '9 - Боевой молот (макс. урон 7, оглушение) — 90 монет\n' +
            '10 - Алебарда (макс. урон 7, пробивает броню) — 100 монет\n' +
            '11 - Наручи (+2 брони, 10% блок) — 30 монет\n' +
            '12 - Щит (+4 брони, 20% блок) — 50 монет\n' +
            '13 - Шлем стражи (+3 брони) — 60 монет\n' +
            '14 - Кольчуга (+5 брони) — 80 монет\n' +
            '15 - Эликсир стойкости (+30 макс. HP) — 70 монет\n' +
            '16 - Зеркало (против Смотрителя) — 60 монет\n' +
            '0 - Уйти.'
        )

        if (choice == 0) return

        let itemName = ''
        let price = 0
        let once = 0
        let desc = ''

        if (choice == 1) { itemName = 'Бинт'; price = 10; once = 0; desc = '+10 HP' }
        else if (choice == 2) { itemName = 'Зелье лечения'; price = 20; once = 0; desc = '+20 HP' }
        else if (choice == 3) { itemName = 'Зелье силы'; price = 30; once = 0; desc = '+3 к урону на 1 бой' }
        else if (choice == 4) { itemName = 'Амулет удачи'; price = 40; once = 1; desc = 'Крит на 5+' }
        else if (choice == 5) { itemName = 'Кинжал'; price = 50; once = 1; desc = getWeaponDescription('Кинжал') }
        else if (choice == 6) { itemName = 'Стальной меч'; price = 60; once = 1; desc = getWeaponDescription('Стальной меч') }
        else if (choice == 7) { itemName = 'Рапира'; price = 60; once = 1; desc = getWeaponDescription('Рапира') }
        else if (choice == 8) { itemName = 'Копьё'; price = 70; once = 1; desc = getWeaponDescription('Копьё') }
        else if (choice == 9) { itemName = 'Боевой молот'; price = 90; once = 1; desc = getWeaponDescription('Боевой молот') }
        else if (choice == 10) { itemName = 'Алебарда'; price = 100; once = 1; desc = getWeaponDescription('Алебарда') }
        else if (choice == 11) { itemName = 'Наручи'; price = 30; once = 1; desc = getItemDescription('Наручи') }
        else if (choice == 12) { itemName = 'Щит'; price = 50; once = 1; desc = getItemDescription('Щит') }
        else if (choice == 13) { itemName = 'Шлем стражи'; price = 60; once = 1; desc = getItemDescription('Шлем стражи') }
        else if (choice == 14) { itemName = 'Кольчуга'; price = 80; once = 1; desc = getItemDescription('Кольчуга') }
        else if (choice == 15) { itemName = 'Эликсир стойкости'; price = 70; once = 1; desc = '+30 макс. HP' }
        else if (choice == 16) { itemName = 'Зеркало'; price = 60; once = 1; desc = 'В бою со Смотрителем: 40 урона и ослепление' }
        else { alert('Нет такого товара.'); continue }

        if (once == 1 && inventory.indexOf(itemName) != -1) {
            alert('Торговец: "Это у тебя уже есть. Дважды не продаю."')
            continue
        }
        alert(desc + '\n\nЦена: ' + price + ' монет.')
        const confirm = +prompt('1 - Купить\n2 - Отмена')
        if (confirm != 1) continue

        payMoney(price)
        if (itemName == 'Бинт') { health += 10; if (health > maxHealth) health = maxHealth }
        else if (itemName == 'Зелье лечения') { health += 20; if (health > maxHealth) health = maxHealth }
        else if (itemName == 'Зелье силы') { strengthBonus += 3 }
        else if (itemName == 'Эликсир стойкости') { maxHealth += 30; health += 30 }
        else { inventory.push(itemName) }
        alert('КУПЛЕНО: ' + itemName + '\nБаланс: ' + balance)
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
        'Айкар: "Добро пожаловать в отель "Последняя дверь". Вы желаете остановиться? На сколько ночей?"\n' +
        '1 - "Добрый день, да я бы хотел, остановиться на 1 ночь, не более."\n' +
        '2 - "Добрый день, да я хотел бы остановиться у вас на неделю."\n' +
        '3 - "Меня прислал король, чтобы я расследовал пропажу стражи."\n' +
        '4 - "Нет извините, я ошибся дверью. Всего хорошего."\n' +
        '5 - "Дайте мне минуту, я проверю снаряжение."'
    )

    if (hallChoice == 5) {
        manageEquipment()
        continue
    }

    if (hallChoice == 1) {
        alert('ПЛАТА\nАйкар: "Хорошо с вас 20 монет за ночь."')
        const payChoice = +prompt('ДИАЛОГ\n1 - Да без проблем, вот.\n2 - Что то дорого, можно дешевле?')
        if (payChoice == 2) {
            alert('ТОРГИ\nАйкар: "Вам предстоит выбрать цену. Но я могу быть не согласен. Если моё терпение лопнет, цена поднимется."')
            while (bargainPatience > 0) {
                const bargainOffer = +prompt('Сколько вы готовы заплатить? (у вас ' + balance + ' монет)')
                if (bargainOffer <= 0 || bargainOffer > balance) {
                    if (bargainPatience == 3) alert('Айкар: "Это несерьёзно. Называйте нормальную цену."')
                    else if (bargainPatience == 2) alert('Айкар: "Ты видимо издеваешься надо мной? Назови разумную цену."')
                    else if (bargainPatience == 1) alert('Айкар: "Ещё одна попытка такого бреда, и наш деловой разговор пойдёт совсем по другому плану."')
                    bargainPatience -= 1
                    continue
                }
                else if (bargainOffer > roomPrice) {
                    roomPrice = bargainOffer
                    alert('Айкар: "Щедро! По рукам. С вас ' + roomPrice + ' монет."')
                    break
                }
                else if (bargainOffer < 13) {
                    if (bargainPatience == 3) alert('Айкар: "Слишком дешево, давай больше. Например ' + (roomPrice - 2) + '."')
                    else if (bargainPatience == 2) alert('Айкар: "Ну это уже хотя бы разумно, но все еще дешево, моё предложение ' + (roomPrice - 2) + '."')
                    roomPrice -= 2
                    bargainPatience -= 1
                }
                else if (bargainOffer >= 13) {
                    alert('Айкар: "Ладно, я согласен, с вас ' + bargainOffer + '."')
                    roomPrice = bargainOffer
                    break
                }
            }
        }
    }
    else if (hallChoice == 2) {
        alert('ОПЛАТА\nАйкар: "Ого, вы первый кто решил остановиться на такое долгое время. Сейчас посчитаю."\nАйкар: "Так один день сто... плюс пла... за 7 дней... С вас 140 монет."')
        const weekChoice = prompt('ДИАЛОГ\n1 - Ого, я не ожидал такую цену. Есть способ уменьшить оплату?\n2 - У меня пока нет такой суммы. Можно как то разбить по частям?\n3 - Хорошо, вот 140 монет за всё.')
        if (weekChoice == 1) {
            alert('ОПЛАТА\nАйкар: "Ну вообще вы первый кто взял номер на такое время, я готов вам сделать скидку. Вам за 7 дней нужно будет заплатить всего лишь 70 монет."\nВы понимаете что это все еще очень дорого, но ничего уже не поделаешь.\nВы: "Хорошо, меня устраивает."')
            if (balance >= 70) { payMoney(70); alert('БАЛАНС\nВы платите 70 монет. Осталось: ' + balance + '.') }
            else { payMoney(70); alert('ДОЛГ\nАйкар забирает всё, что есть, и записывает остаток в книгу.\n— Ничего. Отель подождёт. Он умеет ждать.\nБаланс ушёл в минус: ' + balance + '.') }
            roomPrice = 0
        }
        else if (weekChoice == 2) {
            alert('ПЛАТА\nАйкар: "Вы можете заплатить за один день и в конце каждого дня просто платить еще раз. Один день стоит 20 монет."\nВы: "Я согласен."')
            if (balance >= 20) { payMoney(20); alert('БАЛАНС\nВы платите 20 монет. Осталось: ' + balance + '.') }
            else { payMoney(20); alert('ДОЛГ\nАйкар забирает всё, что есть.\nБаланс ушёл в минус: ' + balance + '.') }
            roomPrice = 0
        }
        else if (weekChoice == 3) {
            alert('ОПЛАТА\nАйкар: "Полная сумма? Похвально."\nОн забирает 140 монет и молча выдаёт ключ.')
            if (balance >= 140) { payMoney(140); alert('БАЛАНС\nВы платите 140 монет. Осталось: ' + balance + '.') }
            else { payMoney(140); alert('ДОЛГ\nАйкар забирает всё, что есть, и записывает остаток в книгу.\nНичего. Отель подождёт.\nБаланс ушёл в минус: ' + balance + '.') }
            roomPrice = 0
        }
    }
    else if (hallChoice == 3) {
        const kingAnswer = +prompt('ДИАЛОГ\nАйкар: "Впервые слышу об этом. Так на сколько вы хотели бы остановиться?"\nВы замечаете что он нервничает.\n1 - Вам есть что скрывать?\n2 - Да я бы хотел выбрать номер.')
        if (kingAnswer == 1) {
            const pushChoice = +prompt('ДОГАДКИ\nАйкар: "Извините, но если вы продолжите расспрашивать меня об этом, я буду вынужден вызвать охрану."\n1 - Я представляю волю короля, если вы мне не ответите я буду вынужден вас арестовать.\n2 - Хорошо, я хочу выбрать комнату.')
            if (pushChoice == 2) { skipIntro += 1; continue }
            else if (pushChoice == 1) {
                alert('ДАВЛЕНИЕ\nВы снова подаётесь вперёд и задаёте вопрос. Улыбка Айкара становится тоньше, а пальцы медленно опускаются под стойку.\nАйкар: "Вы очень любопытный гость. Здесь это... непопулярное качество."\nАйкар звенит в колокольчик. Из коридора раздается лязганье цепей...')
                alert('ФИНАЛЬНЫЙ БОСС\nИз коридора выходит фигура в старом сюртуке портье. Лицо скрыто тенью, но на груди блестит связка ключей - сотни ключей, и каждый, кажется, помнит чью-то руку.\nСмотритель: "Я - Смотритель. Ты вошёл в мой дом и потревожил моих гостей. Теперь ты останешься здесь. Навсегда."\nАйкар отступает за стойку и кланяется.\nАйкар: "Господин Смотритель. Прошу."')
                fightBoss()
                if (winCount >= 1) break
            }
        }
        else if (kingAnswer == 2) { skipIntro += 1; continue }
    }
    else if (hallChoice == 4) {
        alert('КОНЕЦ\nКак только вы выходите из отеля, ваш разум начинает мутнеть')
        const endingRoll = rollD4()
        if (endingRoll == 1) alert('ДЕЗЕРТИР\nВы разворачиваетесь и молча выходите за дверь. Айкар не окликает вас - только смотрит вслед, и в его улыбке нет ни капли удивления. Дорога домой кажется короткой. Вы убеждаете себя, что просто переоценили опасность, что отель - не более чем старый дом с плохой репутацией. Вы ошибались.\nЧерез три дня на дверях королевской канцелярии появляется указ: стражник, отправленный расследовать исчезновения, дезертировал. Награда за голову - пятьдесят монет. Через пять дней вас узнают в трактире на перекрёстке. Через неделю - находят.\nВас приводят в цепях на центральную площадь. Король не выходит к вам - лишь читают приговор: «За трусость перед лицом долга, за оставление поручения короны и за бесчестие стражи». Толпа молчит. Кто-то в задних рядах шепчет, что вы были правы, что из того отеля не возвращаются. Но шепчет тихо. У вас отбирают всё: монеты, меч, броню, даже корону. Петля затягивается. Последнее, что вы видите, - туман на краю дороги и силуэт отеля, который, кажется, смотрит прямо на вас.')
        else if (endingRoll == 2) alert('ТОТ КТО УШЕЛ ЗА ДВЕРЬ\nВы выходите за дверь. Айкар провожает вас взглядом и тихо говорит вслед: «В следующий раз дверь будет уже не та». Вы не оборачиваетесь.\nДомой вы не возвращаетесь. Указ о розыске уже висит на каждой заставе. Вы уходите в леса на восток - туда, где королевская стража не рискует совать нос. Через месяц вы находите шайку. Через полгода - возглавляете её. У вас есть то, чего нет у других: вы видели отель и выжили. Для разбойников это почти святость.\nДесять лет. Двадцать. Вы грабите обозы, жжёте заставы, держите в страхе половину округи. Король трижды посылает отряды - трижды они возвращаются ни с чем. Вас называют «Тот, Кто Ушёл От Двери». Дети в деревнях играют в вас. Взрослые молятся, чтобы вы проехали мимо.\nНа тридцатый год всё заканчивается. Ночью, в лагере у старой мельницы, ваши ближайшие люди входят в шатёр без стука. Вы успеваете узнать лица. Успеваете понять. «Власть не стареет, - говорит один из них. - А ты - да». Клинок входит под ребро. Вы падаете на спину и смотрите в полог шатра, а за ним - туман, дорога и силуэт отеля, который так и не отпустил вас.')
        else if (endingRoll == 3) alert('БЕЗУМЕЦ У ДОРОГИ\nВы выходите за дверь, но не уходите далеко. Что-то в вас ломается - тихо, как треснувшее стекло. Вы возвращаетесь к отелю на следующее утро. И остаётесь.\nВы стоите на дороге перед крыльцом и кричите путникам, чтобы шли другой стороной. Рвёте объявления о свободных комнатах. Гоните прочь каждого, кто подходит к двери. Ночью вы спите под крыльцом, прижавшись спиной к стене, и вам кажется, что отель дышит вам в затылок. Днём вы говорите с туманом. Туман иногда отвечает.\nМестные сначала смеются. Потом перестают. Потом начинают обходить это место стороной - не из-за отеля, а из-за вас. Вас называют Безумцем у Дороги. Дети бросают в вас камни. Взрослые крестятся. Королевская стража приезжает один раз, смотрит на вас и уезжает - что взять с сумасшедшего.\nПроходят годы. Вы уже не помните своего имени. Помните только одно: сюда нельзя. Никому. Никогда.\nОднажды утром к отелю подходит молодой стражник в королевском плаще. Вы бросаетесь к нему, кричите, размахиваете руками. Он смотрит на вас долгим взглядом - и обходит стороной. Заходит в отель. Дверь закрывается за ним беззвучно.\nВы остаётесь на дороге. И вдруг понимаете: теперь ждать будут не вас.')
        else if (endingRoll == 4) alert('НОВЫЙ АДМИНИСТРАТОР\nВы выходите за дверь. Дорога домой кажется длиннее, чем должна быть. Туман не расходится даже к полудню, и вы идёте по нему дольше, чем шли сюда. К вечеру вы всё-таки выбираетесь на тракт. Домой вы не возвращаетесь - сначала идёте к королю.\nВы встаёте перед троном и говорите: «Я не могу. Я не вернусь туда. Пошлите кого-нибудь другого». Король медленно поднимается с трона. Лицо его темнеет. «Ты был моей последней надеждой, - говорит он тихо, и от этого тихого голоса стража у дверей опускает глаза. - Я дал тебе монеты, меч, броню, корону. Я дал тебе моё доверие. А ты вернулся и просишь послать кого-нибудь другого?» Он смотрит на вас так, будто видит впервые. «Стража, отберите у него всё королевское. И выведите за ворота. Чтобы духу его здесь не было».\nВас выводят из тронного зала под руки. Корона слетает с вашей головы и катится по камням. Меч, броню, монеты - всё остаётся позади. За воротами опускается решётка, и стража больше не смотрит вам вслед. Вас изгнали. Вам некуда идти.\nВсю неделю вы скитаетесь по трактам, ночуете под мостами, вздрагиваете от каждого звона ключей. А потом снова выходите на старую дорогу. Туман тот же. Крыльцо то же. Только на этот раз вы не гость.\nАйкар ждёт вас на пороге. Он не удивлён. Он ждал. «Я знал, что ты вернёшься, - говорит он. - Все возвращаются. Только не все - сами». Он снимает с себя бейджик и молча кладёт его вам в ладонь. «Я выполнил свой долг. Дождался того, кто вернётся по своей воле. Теперь очередь твоя». Он уходит в туман, и туман принимает его беззвучно, как принимал всех.\nВы стоите за стойкой. Дни идут. Вы записываете гостей, выдаёте ключи, улыбаетесь. И постепенно понимаете, почему Айкар улыбался так, как улыбался. Теперь вы тоже знаете то, чего не знают они.\nЧерез неделю дверь открывается. На пороге - молодой стражник в королевском плаще, с королевской печатью в руке и растерянным лицом. Он говорит: «Меня прислал король. Предыдущий стражник так и не вернулся. Я должен расследовать исчезновения». Он смотрит на вас так, как когда-то смотрели вы.\nВы улыбаетесь.\n«Добро пожаловать в отель „Последняя дверь“, - говорите вы. - Вы желаете остановиться?»')
        break
    }

    alert('СПИСАНИЕ\nАйкар: "Ага, все записал, ваша комната №14. Удачной ночи."\nВы прощаетесь с ним и открываете дверь чтобы пройти дальше в свою комнату.')
    payMoney(roomPrice)
    alert('БАЛАНС\nУ вас осталось: ' + balance + ' монет')
    alert('ЧТО ТО ЗДЕСЬ НЕ ЧИСТО\nДверь за вами захлопывается. Вы пытаетесь ее открыть. Ручка не поддаётся, дерево гладкое - ни щели, ни замка с этой стороны. Видимо у вас осталась лишь одна дорога, вперед.\nВдоль стен - портреты. Люди в старых одеждах, у каждого табличка: «Эдвард, стражник. Прибыл 12-го. Выбыл 14-го». «Марта, служанка. Прибыла 3-го. Выбыла 4-го». «Семья Ортис. Прибыли 7-го. Выбыли 7-го». Все смотрят чуть мимо, будто позировали не художнику. На самом старом портрете краска облупилась - лица не разобрать. Табличка стёрта, читается одно слово: «Первый». В комнате две двери.\nЛевая - тяжёлая, обитая железом, с царапинами у замка. Но странность: на ней не одна замочная скважина, а десятки - мелких, разных форм, будто дверь открывали сотнями разных ключей. Из-под неё не тянет холодом - тянет тишиной. Такой, в которой слышно, как где-то очень далеко одна за другой закрываются двери.\nПравая - с резным наличником и медной ручкой в форме ключа. Пахнет пылью и старой бумагой. За ней - шелест страниц и глухой стук, будто что-то тяжёлое ставят на пол. И ещё: тонкий запах духов, которым давно никто не пользуется.')
    const doorSideChoice = +prompt('ВЫБОР\nПохоже отель играет с вами и скорее всего если выбрать одну дверь, другую выбрать уже не получится.\n1 - Выбрать левую дверь.\n2 - Выбрать правую дверь')

    if (doorSideChoice == 1) {
        alert('КОРИДОР ЗАБЫТЫХ ДВЕРЕЙ\nЖелезная створка поддаётся тяжело, с металлическим стоном. За ней - зал, и первое, что вы замечаете: двери.\nРовно двадцать. По десять с каждой стороны. Все одинаковые - тёмное дерево, одинаковая резьба, одинаковые ручки, одинаковые замочные скважины. Ни номера, ни таблички, ни царапины, которая отличала бы одну от другой. Только пыль на ручках лежит по-разному - и по ней видно, что давно никто не открывал ни одну.\nТускло. Свет падает откуда-то сверху, из-под потолка, но его хватает только на то, чтобы разглядеть двери и не разглядеть, что за ними. Пыльно так, что воздух кажется плотным. Пахнет старым деревом, сыростью и чем-то ещё - затхлым, будто здесь давно не проветривали.\nПрямо у входа, по обе стороны, стоят два манекена в рыцарских доспехах. Доспехи старые, тёмные, с вмятинами и потёртостями. Один стоит ровно, второй чуть наклонён вперёд, будто прислушивается. Из забрал не видно ничего, кроме темноты.\nДвадцать одинаковых дверей. Два стража. И тишина, в которой слышно, как где-то далеко капает вода.')
        alert('НЕОЖИДАННОЕ СООБЩЕНИЕ\nТишина в зале не пустая. Вы понимаете это, когда из ниоткуда - не из дверей, не из-под потолка, а будто из самой пыли - раздаётся голос. Тихий, ровный, без эмоций. Так говорят те, кому давно не с кем разговаривать.\nМолчальник: "Здравствуй. Я - Молчальник. Я здесь дольше, чем стоят эти стены, и дольше, чем помнит хоть одна гостевая книга."\nПауза. Пыль в луче света медленно оседает.\nМолчальник: "Мы должны были познакомиться гораздо позже. У двери твоего номера. Но ты пришёл сюда сам, а значит, правила придётся объяснить сейчас."\nМолчальник: "Каждый постоялец должен сначала преодолеть путь до своего номера. Таково условие отеля. Я не могу провести тебя за руку. Я могу лишь помочь понять, что нужно сделать."\nГолос чуть меняется - становится суше, деловитее, будто Молчальник переходит к главному.\nМолчальник: "Слушай внимательно. Двадцать дверей. Восемнадцать из них ведут обратно в этот зал. Ты войдёшь и выйдешь здесь же. Будешь ходить по кругу, пока не поймёшь. Одна дверь ведёт дальше. Одна - туда, откуда не возвращаются."\nСнова пауза.\nМолчальник: "Я не скажу, какая из них какая. Это не моё дело. Но у входа стоят двое. Один говорит только правду. Другой - только ложь. Спроси их. Выбери дверь. И не забудь, что ошибка здесь стоит дороже, чем в вестибюле."\nПыль в луче света на миг замирает.\nМолчальник: "Я буду ждать тебя у твоего номера, стражник. Если дойдёшь."')

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
            const truthRoll = Math.floor(Math.random() * 2) + 1
            if (truthRoll == 1) leftTruthful += 1
            else rightDeceiver += 1

            while (true) {
                const hallAction = +prompt('ДИЛЕММА ДВУХ СТРАЖЕЙ\n1 - обратиться к левому стражнику\n2 - обратиться к правому стражнику\n3 - обратиться к обоим\n4 - Спросить окончательно, какую дверь открыть\n5 - Выбрать дверь.')

                if (hallAction == 1) {
                    const leftQuestion = +prompt('ВОПРОСЫ К ЛЕВОМУ\n1 - Если я прямо сейчас назову тебя лжецом, что ты почувствуешь?\n2 - Когда ты в последний раз совершил ошибку или оступился на этой службе?\n3 - Ты гордишься тем, кто ты есть?\n4 - Чего ты боишься больше: умереть от меча или оказаться неправым?')
                    if (leftTruthful == 1) {
                        if (leftQuestion == 1) { alert('Левый: "Мне будет жаль, что ты совершаешь ошибку."'); continue }
                        else if (leftQuestion == 2) { alert('Левый: "Вчера я слишком долго открывал дверь."'); continue }
                        else if (leftQuestion == 3) { alert('Левый: "Нет, гордость здесь ни при чем. Я лишь исполняю свой долг и говорю то, что есть."'); continue }
                        else if (leftQuestion == 4) { alert('Левый: "Я боюсь меча, ведь смерть окончательна. А правда от моих страхов не изменится."'); continue }
                    } else {
                        if (leftQuestion == 1) { alert('Левый: "Я прощу тебя, ибо праведники умеют прощать глупцов."'); continue }
                        else if (leftQuestion == 2) { alert('Левый: "Я совершил ошибку, когда доверился своему напарнику."'); continue }
                        else if (leftQuestion == 3) { alert('Левый: "Да! Я безгранично горжусь своей долей. В этом мире, погрязшем в обмане, я остаюсь незыблемым оплотом чистой правды."'); continue }
                        else if (leftQuestion == 4) { alert('Левый: "Смерть - ничто! Больше всего на свете я боюсь исказить истину или совершить несправедливость."'); continue }
                    }
                }
                else if (hallAction == 2) {
                    const rightQuestion = +prompt('ВОПРОСЫ К ПРАВОМУ\n1 - Если я прямо сейчас назову тебя лжецом, что ты почувствуешь?\n2 - Когда ты в последний раз совершил ошибку или оступился на этой службе?\n3 - Ты гордишься тем, кто ты есть?\n4 - Чего ты боишься больше: умереть от меча или оказаться неправым?')
                    if (rightDeceiver == 0) {
                        if (rightQuestion == 1) { alert('Правый: "Я прощу тебя, ибо праведники умеют прощать глупцов."'); continue }
                        else if (rightQuestion == 2) { alert('Правый: "Я совершил ошибку, когда доверился своему напарнику."'); continue }
                        else if (rightQuestion == 3) { alert('Правый: "Да! Я безгранично горжусь своей долей. В этом мире, погрязшем в обмане, я остаюсь незыблемым оплотом чистой правды."'); continue }
                        else if (rightQuestion == 4) { alert('Правый: "Смерть - ничто! Больше всего на свете я боюсь исказить истину или совершить несправедливость."'); continue }
                    } else {
                        if (rightQuestion == 1) { alert('Правый: "Мне будет жаль, что ты совершаешь ошибку."'); continue }
                        else if (rightQuestion == 2) { alert('Правый: "Вчера я слишком долго открывал дверь."'); continue }
                        else if (rightQuestion == 3) { alert('Правый: "Нет, гордость здесь ни при чем. Я лишь исполняю свой долг и говорю то, что есть."'); continue }
                        else if (rightQuestion == 4) { alert('Правый: "Я боюсь меча, ведь смерть окончательна. А правда от моих страхов не изменится."'); continue }
                    }
                }
                else if (hallAction == 3) {
                    const bothQuestion = +prompt('ВОПРОС К ОБОИМ\n1 - Если я спрошу вашего напарника, считает ли он себя честным, что он ответит?\n2 - Существует ли вопрос, на который вы оба дадите абсолютно одинаковый ответ?\n3 - Если бы прямо сейчас здесь появился третий страж, который всегда говорит случайным образом, кого из вас двоих он бы назвал лжецом?\n4 - Может ли истина одного из вас стать погибелью для другого?')
                    if (bothQuestion == 1) {
                        if (leftTruthful == 1) alert('Левый: "Мой напарник скажет что он говорит правду."\nПравый: "Мой напарник скажет что он таким себя не считает."')
                        else alert('Правый: "Мой напарник скажет что он говорит правду."\nЛевый: "Мой напарник скажет что он таким себя не считает."')
                        continue
                    }
                    else if (bothQuestion == 2) {
                        if (leftTruthful == 1) alert('Левый: "Да."\nПравый: "Нет."')
                        else alert('Правый: "Да."\nЛевый: "Нет."')
                        continue
                    }
                    else if (bothQuestion == 3) {
                        if (leftTruthful == 1) alert('Левый: "Он может назвать любого из нас, его выбор абсолютно случаен."\nПравый: "Моего напарника."')
                        else alert('Правый: "Он может назвать любого из нас, его выбор абсолютно случаен."\nЛевый: "Моего напарника."')
                        continue
                    }
                    else {
                        if (leftTruthful == 1) alert('Левый: "Да."\nПравый: "Нет, мы связаны одной судьбой."')
                        else alert('Правый: "Да."\nЛевый: "Нет, мы связаны одной судьбой."')
                        continue
                    }
                }
                else if (hallAction == 4) {
                    if (leftTruthful == 1) alert('Левый: "Выбирай ' + correctDoor + ' дверь."\nПравый: "Выбирай ' + deathDoor + ' дверь."')
                    else alert('Левый: "Выбирай ' + deathDoor + ' дверь."\nПравый: "Выбирай ' + correctDoor + ' дверь."')
                    continue
                }
                else if (hallAction == 5) {
                    const chosenDoor = +prompt('1 - Выбрать 1 дверь.\n2 - Выбрать 2 дверь.\n3 - Выбрать 3 дверь.\n4 - Выбрать 4 дверь.\n5 - Выбрать 5 дверь.\n6 - Выбрать 6 дверь.\n7 - Выбрать 7 дверь.\n8 - Выбрать 8 дверь.\n9 - Выбрать 9 дверь.\n10 - Выбрать 10 дверь.\n11 - Выбрать 11 дверь.\n12 - Выбрать 12 дверь.\n13 - Выбрать 13 дверь.\n14 - Выбрать 14 дверь.\n15 - Выбрать 15 дверь.\n16 - Выбрать 16 дверь.\n17 - Выбрать 17 дверь.\n18 - Выбрать 18 дверь.\n19 - Выбрать 19 дверь.\n20 - Выбрать 20 дверь.')
                    if (chosenDoor == correctDoor) {
                        if (leftTruthful == 1) alert('ПРАВИЛЬНАЯ ДВЕРЬ\nДверь открывается легко - так, будто её ждали. За ней не зал с двадцатью створками, а короткий коридор: узкий, с низким потолком и одной-единственной дверью в конце.\nЗа спиной - шаги. Вы оборачиваетесь: один из стражей идёт следом. Тот самый, чьи слова оказались правдой.\nЛевый: "Ты угадал. Это редкость. Большинство выбирает неверную и возвращается. Некоторые выбирают ту, откуда не возвращаются. Ты - первый за долгое время, кто дошёл сюда."\nОн останавливается в паре шагов от вас. Впереди - дверь. Одна.\nЛевый: "Можешь идти дальше. А можешь спросить. Я ответил правдой один раз, отвечу ещё на пару вопросов."')
                        else alert('ПРАВИЛЬНАЯ ДВЕРЬ\nДверь открывается легко - так, будто её ждали. За ней не зал с двадцатью створками, а короткий коридор: узкий, с низким потолком и одной-единственной дверью в конце.\nЗа спиной - шаги. Вы оборачиваетесь: один из стражей идёт следом. Тот самый, чьи слова оказались правдой.\nПравый: "Ты угадал. Это редкость. Большинство выбирает неверную и возвращается. Некоторые выбирают ту, откуда не возвращаются. Ты - первый за долгое время, кто дошёл сюда."\nОн останавливается в паре шагов от вас. Впереди - дверь. Одна.\nПравый: "Можешь идти дальше. А можешь спросить. Я ответил правдой один раз, отвечу ещё на пару вопросов."')

                        while (true) {
                            const askChoice = +prompt('ВЫБОР\n1 - расспросить про отель.\n2 - расспросить про Айкара.\n3 - расспросить про Молчальника.\n4 - идти дальше')
                            if (askChoice == 1) { alert('Стражник: "Отель старше королевства. Стоял здесь, когда на этом месте была не дорога, а тракт. Его построил тот, кого теперь зовут Смотрителем. Он был первым гостем - и первым, кто не захотел уходить.\nСмотритель заключил сделку с туманом. Отель не должен пустовать. Гости должны входить - и оставаться. Но остаться навсегда можно только по-настоящему. Вот он и придумал путь: каждый гость должен сам дойти до своего номера."'); continue }
                            else if (askChoice == 2) { alert('Стражник: "Айкар - не хозяин. Он такой же гость, как и ты. Только дошёл до конца и согласился остаться при стойке. Смотритель дал ему выбор: стоять за стойкой или исчезнуть. Он выбрал стойку. И ждёт того, кто придёт его сменить."'); continue }
                            else if (askChoice == 3) { alert('Стражник: "Молчальник? Он был здесь до меня. До Смотрителя, может, тоже - не знаю. Он не гость и не хозяин. Он - голос отеля. Когда отель хочет что-то сказать, говорит он.\nОн не лжёт и не говорит правду. Он говорит то, что нужно услышать. Тех, кто пытается его переспорить, он просто перестаёт замечать. А тех, кто слушает, - запоминает. По-своему."'); continue }
                            else if (askChoice == 4) break
                        }
                        exitHall = true
                        break
                    } else if (chosenDoor == deathDoor) {
                        deathAttempts += 1
                        alert('ДВЕРЬ В НИКУДА\nВы открываете дверь. За ней - ничего.\nНе темнота, не туман, не комната. Просто ничего. Мир заканчивается ровно на пороге, и дальше нет даже пустоты - есть только отсутствие всего.\nВы делаете шаг.\nИ ничего не происходит. Вы не падаете, не задыхаетесь - вы просто перестаёте быть. Медленно, тихо, без боли. Как будто кто-то очень аккуратно стирает вас из списка.\nГде-то очень далеко, в другой жизни, был отель. Был Айкар за стойкой. Был король с картой. Был зал с двадцатью дверями. Всё это становится тонким, как дым, и гаснет.\nЭто всё.')
                        if (savedByMolchalnik == true) {
                            alert('ВТОРАЯ ОШИБКА\nМолчальник молчит. Пыль в луче света замирает. И на этот раз он не возвращает тебя.\n[Здесь будет вторая концовка - её напишет автор]')
                            exitHall = true
                            break
                        } else {
                            alert('ПОМОЩЬ\nПыль.\nВы чувствуете пыль на лице. Потом - пол под ладонями. Потом - собственное дыхание.\nВы открываете глаза. Зал с двадцатью створками. Два стража у входа.\nМолчальник: "Я не ожидал такой ошибки."\nМолчальник: "Ты был так близко. Ты смотрел, думал, выбирал. А потом шагнул в никуда, будто это ничего не значило."\nМолчальник: "Я вернул тебя. Не отель - я. Отель уже принял тебя, ты был за порогом. Но я вытащил. Потому что ты мне понравился, стражник."\nМолчальник: "Это последний раз. Я даю тебе ещё один шанс. Не потому, что так положено. Потому что я так хочу. Отель не любит, когда я хочу. Но иногда уступает."\nМолчальник: "Выбирай, стражник. И на этот раз - думай. Не заставляй меня пожалеть."')
                            savedByMolchalnik = true
                            break
                        }
                    } else {
                        alert('ОБРАТНО В ЗАЛ\nДверь открывается, и вы снова оказываетесь в зале с двадцатью створками.')
                        continue
                    }
                }
            }
            if (exitHall == true) break
        }
    }

    if (doorSideChoice == 2) {
        alert('КЛАДОВАЯ\nУзкая длинная кладовая с высоким потолком. Свет падает сверху ровно, без теней. Пахнет старым деревом, пылью и чем-то кислым. Вдоль стены висят пять портретов в одинаковых рамах.\nНа каждом - мужчина в старом форменном сюртуке портье. Лица разные, но есть в них общее: взгляд чуть мимо, осанка ровная, будто все пятеро - один человек, нарисованный в разное время. Под каждым портретом - табличка.\nПрямо под каждым портретом, в стене, - пять мини-лифтов. Маленькие, узкие, как раз под размер чемодана: металлические дверцы, решётка, кнопка вызова. Внутри пусто. Дверцы приоткрыты, будто ждут.\nА в углу кладовой, сваленные в кучу, лежат пять чемоданов - разных, потрёпанных, каждый со своей историей. Они стоят не под портретами, а отдельно. Будто их сюда свалили. Или будто они сами сюда пришли.')

        const suitcaseNames = ['Саквояж с двойным дном', 'Сундук с медью', 'Кожаный портфель', 'Деревянный кейс', 'Плетёный короб']
        const portraitNames = ['Великий комбинатор', 'Мечтатель на краю обрыва', 'Хранитель тишины', 'Властелин секунд', 'Творец мимолётности']
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
                alert('СМЕРТЬ\nСтены кладовой сжимаются вокруг тебя. Ты падаешь на пол, и последнее, что слышишь, - как мини-лифты тихо щёлкают, будто прощаясь.\nХолодно. Не больно - просто холодно. Свет в кладовой гаснет медленно.')
                alert('НОВЫЙ ПОСТОЯЛЕЦ\nЧерез несколько дней в кладовой станет на один чемодан больше.\nЕго поставят в угол, к остальным пяти. На бирке будет твоё имя, а под ней - одна строка: «Прибыл. Выбыл. Не дождался».')
                alert('КОРОНА\nКороль ждал неделю. Потом две. Потом перестал считать.\nНа рассвете двадцатого дня в тронный зал вошёл стражник с пустыми руками. Он молча положил на стол корону.\nКороль прослушал всё до конца. Дважды.')
                alert('ОГОНЬ\nНа следующий день король отдал приказ.\nК отелю «Последняя дверь» вышла стража - с факелами, смолой и приказом не возвращаться без пепла.\nК утру от отеля осталось только пепелище.')
                alert('КОНЕЦ: «ПОСТОЯЛЕЦ»\nТы умер в кладовой, так и не открыв проход.\nНо иногда, проезжая мимо старой дороги, люди всё ещё видят туман. И в тумане - крыльцо.\nОтель не сгорел. Отель просто затаился.')
                dieCount += 1
                storageExit = true
                break
            }

            if (Object.keys(liftOccupancy).length == 5) {
                alert('ВСЕ ЧЕМОДАНЫ НА МЕСТЕ\nПять мини-лифтов закрываются одновременно. Стена под портретами вздрагивает и медленно отходит в сторону, открывая проход дальше.')
                storageExit = true
                break
            }

            const roomChoice = +prompt('ВЫБОР ДЕЙСТВИЯ\n1 - Подойти к портретам.\n2 - Подойти к чемоданам.\n3 - Выйти из кладовой (если проход открыт).')

            if (roomChoice == 2) {
                const availableIndexes = []
                for (let i = 0; i < suitcaseNames.length; i++) {
                    const alreadyInInventory = casse.indexOf(suitcaseNames[i]) != -1
                    const alreadyInLift = Object.values(liftOccupancy).indexOf(i) != -1
                    if (alreadyInInventory == false && alreadyInLift == false) availableIndexes.push(i)
                }
                if (availableIndexes.length == 0) { alert('В углу больше нет чемоданов.'); continue }

                for (let i = availableIndexes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    const temp = availableIndexes[i]
                    availableIndexes[i] = availableIndexes[j]
                    availableIndexes[j] = temp
                }

                let availableMenu = 'ЧЕМОДАНЫ В УГЛУ\n'
                for (let i = 0; i < availableIndexes.length; i++) availableMenu += (i + 1) + ' - ' + suitcaseNames[availableIndexes[i]] + '\n'
                availableMenu += '0 - Ничего не брать.'
                const suitcaseChoice = +prompt(availableMenu)

                if (suitcaseChoice == 0) continue
                if (suitcaseChoice < 1 || suitcaseChoice > availableIndexes.length) { alert('Такого чемодана нет.'); continue }

                const chosenSuitcaseIndex = availableIndexes[suitcaseChoice - 1]
                const chosenSuitcaseName = suitcaseNames[chosenSuitcaseIndex]

                if (casse.length >= 9) { alert('ИНВЕНТАРЬ ПОЛОН'); continue }

                casse.push(chosenSuitcaseName)
                alert('Ты берёшь «' + chosenSuitcaseName + '».')
                continue
            }

            if (roomChoice == 1) {
                let portraitMenu = 'ПОРТРЕТЫ\n'
                for (let i = 0; i < portraitNames.length; i++) {
                    const liftStatus = liftOccupancy[i] != undefined ? ' [лифт занят]' : ' [лифт пуст]'
                    portraitMenu += (i + 1) + ' - ' + portraitNames[i] + liftStatus + '\n'
                }
                portraitMenu += '0 - Отойти.'
                const portraitChoice = +prompt(portraitMenu)

                if (portraitChoice == 0) continue
                if (portraitChoice < 1 || portraitChoice > portraitNames.length) { alert('Такого портрета нет.'); continue }

                const portraitIndex = portraitChoice - 1
                const portraitActionChoice = +prompt('ПОРТРЕТ: ' + portraitNames[portraitIndex] + '\n1 - Прочитать табличку.\n2 - Поставить чемодан в лифт.\n0 - Отойти.')

                if (portraitActionChoice == 0) continue
                if (portraitActionChoice == 1) { alert('ТАБЛИЧКА\n' + portraitTablets[portraitIndex]); continue }

                if (portraitActionChoice == 2) {
                    if (liftOccupancy[portraitIndex] != undefined) {
                        const removeChoice = +prompt('Этот лифт уже занят.\n1 - Вытащить чемодан.\n2 - Оставить.')
                        if (removeChoice == 1) {
                            const placedIdx = liftOccupancy[portraitIndex]
                            delete liftOccupancy[portraitIndex]
                            alert('Ты вытаскиваешь «' + suitcaseNames[placedIdx] + '» из лифта.')
                        }
                        continue
                    }
                    if (casse.length == 0) { alert('Ты ещё не взял ни одного чемодана.'); continue }

                    let ownedMenu = 'ТВОИ ЧЕМОДАНЫ\n'
                    for (let i = 0; i < casse.length; i++) ownedMenu += (i + 1) + ' - ' + casse[i] + '\n'
                    ownedMenu += '0 - Отмена.'
                    const ownedChoice = +prompt(ownedMenu + '\nКакой чемодан поставить?')

                    if (ownedChoice == 0) continue
                    if (ownedChoice < 1 || ownedChoice > casse.length) { alert('Такого чемодана нет.'); continue }

                    const selectedName = casse[ownedChoice - 1]
                    const selectedIdx = suitcaseNames.indexOf(selectedName)

                    if (correctPairs[portraitIndex] == selectedIdx) {
                        alert('ВЕРНО\nТы ставишь «' + selectedName + '» в мини-лифт под портретом «' + portraitNames[portraitIndex] + '».')
                        casse.splice(ownedChoice - 1, 1)
                        liftOccupancy[portraitIndex] = selectedIdx
                    } else {
                        wrongLiftAttempts += 1
                        if (wrongLiftAttempts > 3) {
                            health -= 10
                            alert('НЕВЕРНО\nМини-лифт не принимает этот чемодан.\nСтена бьёт тебя током.\nТы теряешь 10 HP. Осталось: ' + health + '.')
                        } else {
                            alert('НЕВЕРНО\nМини-лифт не принимает этот чемодан.')
                        }
                    }
                    continue
                }
            }

            if (roomChoice == 3) {
                if (Object.keys(liftOccupancy).length == 5) { storageExit = true; break }
                else { alert('Проход ещё не открыт.'); continue }
            }
        }

        if (storageExit == true) {
            alert('ПРОХОД ОТКРЫТ\nТы выходишь из кладовой в узкий коридор.')
        }
    }

    alert('КУХНЯ\nВы сразу попадаете на кухню. Пар, котлы, ножи на крюках. У плиты — повар в белом фартуке и колпаке. В руке у него тяжёлый тесак.\nПовар: "Сюда можно только постояльцам."\nВы: "Я и есть постоялец."\nПовар качает головой.\nПовар: "Нет. Постояльцы не ходят. Постояльцы лежат."\nОн поднимает тесак.\nПовар: "Значит, ужин будет из тебя."')
    fightChief()
    if (health <= 0) break

    alert('ГАЛЕРЕЯ НАД ПРОВАЛОМ\nКоридор уходит вперёд, но пола под ним больше нет. Балкон без перил, а под ним - чернота. Доски скрипят.')
    const galleryRoll = rollD6()
    if (galleryRoll >= 5) {
        alert('ЛОВУШКА\nДоска проваливается. Вы теряете 8 HP.')
        health -= 8
    } else if (galleryRoll >= 3) {
        alert('ОСТОРОЖНО\nВы идёте медленно. На выходе находите кошель.')
        const galleryLoot = rollLoot()
        balance += galleryLoot
        alert('НАГРАДА\nВы подбираете ' + galleryLoot + ' монет.')
    } else {
        alert('ЛЁГКИЙ ПУТЬ\nДоски держат. В конце галереи - сундук.')
        const galleryLoot = rollLoot()
        balance += galleryLoot
        alert('НАГРАДА\nВы достаёте ' + galleryLoot + ' монет.')
    }
    if (health <= 0) {
        alert('ПАДЕНИЕ\nДоска обломилась. Вы летите вниз.')
        dieCount += 1
        break
    }

    alert('ГОСТИНАЯ «ПЛЮЩ И ПЫЛЬ»\nПлющ пророс сквозь стены. Мебель в пыли. В углах - тени. Из-под пыли торчит край сундука. На камине - склянка.')
    const guestRoomChoice = +prompt('ВЫБОР\n1 - Обыскать сундук.\n2 - Взять склянку.\n3 - Пройти мимо.')
    if (guestRoomChoice == 1) {
        const guestLoot = rollLoot()
        balance += guestLoot
        alert('СУНДУК\nВнутри ' + guestLoot + ' монет.')
    } else if (guestRoomChoice == 2) {
        alert('СКЛЯНКА\nВы выпиваете жидкость. Восстанавливаете 10 HP.')
        health += 10
        if (health > maxHealth) health = maxHealth
    } else {
        alert('МИМО\nВы проходите мимо.')
    }

    alert('КОТЕЛЬНАЯ\nЖарко. У котла стоит человек в кожаном фартуке и каске. В руке — разводной ключ.\nМашинист: "Сюда нельзя. Котельная — только для своих."')
    const machineAnswer = +prompt('ДИАЛОГ\n1 - "Я постоялец. Мне нужно пройти."\n2 - "Кто ты?"')
    if (machineAnswer == 1) alert('Машинист: "Постояльцы не ходят по котельной. Постояльцы греются в котлах."')
    else alert('Машинист: "Я тот, кто топит котлы. И тот, кто не пускает гостей."')
    fightMachine()
    if (health <= 0) break

    alert('БИБЛИОТЕКА\nСтеллажи с книгами за сотни лет. На столе — открытая гостевая книга и карта отеля.')
    const libraryChoice = +prompt('ВЫБОР\n1 - Прочитать гостевую книгу.\n2 - Взять карту.\n3 - Искать тайник.')
    if (libraryChoice == 1) { alert('КНИГА\nЗапись: «Смотритель боится своего отражения. Зеркало — его слабость.»'); connection += 1 }
    else if (libraryChoice == 2) { alert('КАРТА\nВы берёте карту.'); connection += 1 }
    else if (libraryChoice == 3) { const libraryLoot = rollLoot(); balance += libraryLoot; alert('ТАЙНИК\nСундук. Внутри ' + libraryLoot + ' монет.') }

    alert('ДВОР С КОЛОДЦЕМ\nУ колодца — человек в доспехе из коры. В руке — секатор.\nСадовник: "Ты пришёл к колодцу. Значит, хочешь пить. Но вода не для всех."')
    const gardenerChoice = +prompt('ДИАЛОГ\n1 - "Я просто хочу пройти."\n2 - "Кто ты?"\n3 - "Что в колодце?"')
    if (gardenerChoice == 1) alert('Садовник: "Только через меня."')
    else if (gardenerChoice == 2) alert('Садовник: "Я тот, кто поливает этот сад. И тот, кто не пускает гостей."')
    else alert('Садовник: "В колодце — те, кто не дошёл. Они всё ещё шепчут."')
    fightGardener()
    if (health <= 0) break

    alert('КОРОЛЕВСКИЕ АПАРТАМЕНТЫ\nНа столе — письмо. На кровати — шкатулка. На стене — портрет.')
    const kingRoomChoice = +prompt('ВЫБОР\n1 - Прочитать письмо.\n2 - Открыть шкатулку.\n3 - Пройти мимо.')
    if (kingRoomChoice == 1) { alert('ПИСЬМО\n«Я тоже был послан королём. Я дошёл и не решился идти дальше. Не сдавайся.»\nВы чувствуете прилив сил.'); health += 5; if (health > maxHealth) health = maxHealth }
    else if (kingRoomChoice == 2) { const kingLoot = rollLoot(); balance += kingLoot; alert('ШКАТУЛКА\nВнутри ' + kingLoot + ' монет.') }
    else alert('МИМО\nПортрет провожает вас взглядом.')

    alert('ЛАБОРАТОРИЯ\nМеханизмы, ловушки, записи. У стены — человек в резиновом халате. В руке — электрический жезл.\nУчёный: "Ага! Новый образец!"')
    const scientistChoice = +prompt('ДИАЛОГ\n1 - "Я не образец. Я гость."\n2 - "Что ты здесь делаешь?"\n3 - "Отойди."')
    if (scientistChoice == 1) alert('Учёный: "Все так говорят. А потом — разряд."')
    else if (scientistChoice == 2) alert('Учёный: "Я изучаю отель. И гостей. Особенно гостей."')
    else alert('Учёный: "Отойти? Но мы только начали!"')
    fightScientist()
    if (health <= 0) break

    alert('ТЕМНИЦА\nСыро, темно. У стены — человек в форме тюремщика. В руке — плеть. На поясе — ключи.\nНадзиратель: "Сюда можно только по делу."')
    const wardenChoice = +prompt('ДИАЛОГ\n1 - "Я ищу выход."\n2 - "Кто ты?"\n3 - "Выпусти меня."')
    if (wardenChoice == 1) alert('Надзиратель: "В темнице нет выхода. Только вход."')
    else if (wardenChoice == 2) alert('Надзиратель: "Я тот, кто держит гостей."')
    else alert('Надзиратель: "Выпустить? Ха. Ты ещё не заперт."')
    fightWarden()
    if (health <= 0) break

    alert('ЗЕК\nВ одной из клеток сидит человек в лохмотьях.\nЗек: "Ты убил его. Значит, ты не просто гость."')
    while (true) {
        const prisonerChoice = +prompt('ДИАЛОГ\n1 - "Кто ты?"\n2 - "Что ты знаешь об отеле?"\n3 - "Как пройти дальше?"\n0 - Уйти.')
        if (prisonerChoice == 0) break
        if (prisonerChoice == 1) { alert('Зек: "Я был гостем. Дошёл до темницы — и остался."'); continue }
        else if (prisonerChoice == 2) { alert('Зек: "Смотритель — не хозяин. Он такой же гость. Просто первый."'); connection += 1; continue }
        else if (prisonerChoice == 3) { alert('Зек: "Дальше — торговец. Он продаст то, что поможет. Но не дёшево."'); continue }
    }

    tradeWithMerchant()

    alert('ЗАЛ С ЛОВУШКАМИ\nДлинный зал. Плиты на полу. В конце — дверь. На стене: «Кто спешит — тот падает. Кто думает — тот проходит».')
    const trapChoice = +prompt('ВЫБОР\n1 - Пройти быстро.\n2 - Пройти медленно.\n3 - Осмотреть стены.')
    if (trapChoice == 1) {
        const trapRoll = rollD6()
        if (trapRoll >= 4) { alert('ЛОВУШКА\nИз стены вылетает стрела. Вы теряете 6 HP.'); health -= 6 }
        else alert('ПРОХОД\nВы пробегаете зал.')
    } else if (trapChoice == 2) {
        alert('ОСТОРОЖНО\nВы идёте медленно. В конце зала находите кошель.')
        const trapLoot = rollLoot()
        balance += trapLoot
        alert('НАГРАДА\nВы подбираете ' + trapLoot + ' монет.')
    } else {
        alert('СТЕНЫ\nЗа факелом — рычаг. Ловушки отключаются.')
        connection += 1
    }
    if (health <= 0) {
        alert('СМЕРТЬ\nСтрела попадает в сердце.')
        dieCount += 1
        break
    }

    alert('КОРИДОР ПЕРЕД НОМЕРОМ 14\nВы стоите перед двумя дверями.\nЛевая - с номером «14». Ваш номер. Дверь приоткрыта. Внутри тепло, пахнет воском. Кровать застелена. На столе - чашка чая, ещё горячего.\nПравая - тёмная, без номера. Тянет тишиной.\nОтель шепчет из-за стен: «Останься. Ты устал. Ты заслужил отдых. Король не узнает.»\nВы вспоминаете Эдварда. Марту. Семью Ортис. Всех, кто остался.')
    let finalChoice = 0
    while (finalChoice != 1 && finalChoice != 2) {
        finalChoice = +prompt('ВЫБОР\n1 - Войти в свой номер. Остаться на ночь.\n2 - Идти дальше. Сразиться со Смотрителем.')
        if (finalChoice != 1 && finalChoice != 2) alert('Вы стоите в нерешительности. Отель ждёт.')
    }

    if (finalChoice == 1) {
        alert('НОМЕР 14\nВы открываете дверь.\nТепло. Тишина. Мягкий свет. Вы садитесь на край. Снимаете сапоги. Ложитесь.\nВеки тяжелеют. Последняя мысль: «Я вернусь. Завтра. Обязательно вернусь.»\nЗавтра не наступит.')
        alert('УТРО, КОТОРОГО НЕ БУДЕТ\nВы просыпаетесь от того, что дверь вашего номера закрывается. Сама собой.\nВы пытаетесь встать - не можете. Тело не слушается.\nСтены сжимаются. И тут вы понимаете: это не номер. Это рама. Ваш портрет на стене коридора.\nРядом с Эдвардом. Рядом с Мартой. Рядом с семьёй Ортис.\nПод вашим портретом появляется табличка: «Стражник. Прибыл. Выбыл. Не дождался».')
        alert('КОНЕЦ: «ПОСТОЯЛЕЦ №14»\nВы остались в своём номере. Отель забрал вас в себя - навсегда.\nКороль будет ждать неделю. Потом две. Потом перестанет считать.\nОтель сгорит. Но не до конца.\nВы стали одним из них.')
        dieCount += 1
        break
    }

    if (finalChoice == 2) {
        alert('ВЫ ИДЁТЕ ДАЛЬШЕ\nВы отворачиваетесь от двери с номером «14».\nТёмная дверь открывается сама.\nЗа ней - большой номер. В центре комнаты стоит Смотритель.\nНа груди у него - связка ключей. Сотни ключей.\nСмотритель: "Ты дошёл. Первый за долгое время. Но это ничего не меняет."')

        if (connection >= 2) {
            alert('ПОДСКАЗКИ\nВы вспоминаете всё, что узнали. О слабости Смотрителя. О его страхе. Вы знаете, куда бить.')
        }

        fightBoss()

        if (winCount >= 1) break
        if (health <= 0) break
    }
}