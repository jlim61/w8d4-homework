import { v4 as uuidv4 } from 'uuid'


// ==================================================================================Types==================================================================================

type InventoryItem = {
    id: string
    name: string
    description: string
    value: number
}

type Armor = InventoryItem & {
    defense: number
}

type Weapon = InventoryItem & {
    damage: number
}

type RPGCharacter = {
    id: string
    name: string
    archtype: string
    fightingStyle: 'ranged' | 'melee'
    inventory: InventoryItem[]
}

// ==================================================================================Functions==================================================================================

function createCharacter(aName: string, aArchtype: string, aFightingStyle: 'ranged' | 'melee'): RPGCharacter {
    return {
        id: uuidv4(),
        name: aName,
        archtype: aArchtype,
        fightingStyle: aFightingStyle,
        inventory: []
    }
}

function createInventoryItem(aName: string, aDescription: string, aValue: number, aDefenseOrDefense: number, isArmor: boolean): Armor | Weapon {
    if (isArmor) {
        return {
            id: uuidv4(),
            name: aName,
            description: aDescription,
            value: aValue,
            defense: aDefenseOrDefense
        }
    } else {
        return {
            id: uuidv4(),
            name: aName,
            description: aDescription,
            value: aValue,
            damage: aDefenseOrDefense
        }
    }
}

function addToInventory(characterInventory: RPGCharacter, item: InventoryItem): void {
    characterInventory.inventory.push(item)
}


function removeFromInventory(characterInventory: RPGCharacter, itemName: string): void {
    // filter says if true, leave it alone. if it is false, it removes
    // we have an current item we are looking at filter(item)
    // looking to see if id's match => item.id != itemID
    // so if the statement is TRUE, it leaves the item. If it is FALSE, then it removes
    characterInventory.inventory = characterInventory.inventory.filter(item => item.name != itemName)
}

function removeQuantityFromInventory(characterInventory: RPGCharacter, itemName: string, quantity: number){
    let numberToRemove: number = quantity
    characterInventory.inventory = characterInventory.inventory.filter(anItem => {
        if (numberToRemove > 0 && anItem.name === itemName) {
            numberToRemove --
            return false
        } else return true
    })
}

function inventoryValue(characterInventory: RPGCharacter): number {
    let total = 0
    characterInventory.inventory.forEach(item => {
        total += item.value
    })
    console.log(`Total Inventory Value: ${total}`)
    return total
}

function printInventory (characterInventory: RPGCharacter): void {
    characterInventory.inventory.forEach(item => {
        console.log(`${item.name} - ${item.value}`)
    })
}

// ==================================================================================Driver Code==================================================================================

const DriverCharacter = createCharacter('DriverCharacter', 'Warrior', 'melee')
const Sword = createInventoryItem('Sword', "A sturdy blade.", 800, 80, false)
addToInventory(DriverCharacter, Sword)
addToInventory(DriverCharacter, Sword)
addToInventory(DriverCharacter, Sword)
console.log('Added 3 Swords')
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
const Bow = createInventoryItem('Bow', "A well-crafted bow.", 500, 70, false)
addToInventory(DriverCharacter, Bow)
console.log('Added Bow')
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
const Club = createInventoryItem('Club', "Looks great for bludgeoning", 300, 40, false)
addToInventory(DriverCharacter, Club)
addToInventory(DriverCharacter, Club)
addToInventory(DriverCharacter, Club)
console.log('Added 3 Clubs')
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
const Helmet = createInventoryItem('Helmet', "No arrows to the head for this lad.", 600, 60, true)
addToInventory(DriverCharacter, Helmet)
console.log('Added Helmet')
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
console.log('Removing all swords from inventory')
removeFromInventory(DriverCharacter, 'Sword')
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
console.log('removing 2 clubs from inventory')
removeQuantityFromInventory(DriverCharacter, 'Club', 2)
printInventory(DriverCharacter)
inventoryValue(DriverCharacter)
