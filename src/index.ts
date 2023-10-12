import { v4 as uuidv4 } from 'uuid'

// Step 2: Create Some Classes
// ==================================================================================Classes==================================================================================

abstract class InventoryItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(_name: string, _price: number, _description: string) {
        this._id = uuidv4();
        this._name = _name;
        this._price = _price;
        this._description = _description;
    }

// getters and setters
    public get id(): string {
        return this._id;
    }

    // made a setter but I don't think it should be allowed to be set because it might not be unique
    // anymore so I commented it out, but had it here to meet requirements
    // public set id(id: string) {
    //     this._id = id;
    // }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number) {
        this._price = price;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

}


class Weapon extends InventoryItem {

    private _damage: number
    private _range: boolean

    constructor(name: string, price: number, description: string, _damage: number, _range: boolean) {
        super(name, price, description)
        this._damage = _damage
        this._range = _range
    }

// getters and setters
    public get damage(): number {
        return this._damage
    }

    public set damage(damage: number) {
        this._damage = damage
    }

    public get range(): boolean {
        return this._range
    }

    public set range(range: boolean) {
        this._range = range
    }
}

class Armor extends InventoryItem {

    private _defense: number

    constructor(name: string, price: number, description: string, _defense: number) {
        super(name, price, description)
        this._defense = _defense
    }

// getters and setters
    public get defense(): number {
        return this._defense
    }

    public set defense(defense: number) {
        this._defense = defense
    }
}

class Character {

    private _id: string
    private _name: string
    private _archtype: string
    private _fightingStyle: 'melee' | 'ranged'
    private _inventory: InventoryItem[]

    constructor(_name: string, _archtype: string, _fightingStyle: 'melee' | 'ranged', _inventory: InventoryItem[] = []){
        this._id = uuidv4()
        this._name = _name
        this._archtype = _archtype
        this._fightingStyle = _fightingStyle
        this._inventory = _inventory
    }
// getters amd setters
    public get id(): string {
        return this._id;
    }

    // made a setter but I don't think it should be allowed to be set because it might not be unique
    // anymore so I commented it out, but had it here to meet requirements
    // public set id(id: string) {
    //     this._id = id;
    // }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get archtype(): string {
        return this._archtype;
    }

    public set archtype(archtype: string) {
        this._archtype = archtype;
    }

    public get fightingStyle(): 'melee' | 'ranged' {
        return this._fightingStyle;
    }

    public set fightingStyle(fightingStyle: 'melee' | 'ranged') {
        this._fightingStyle = fightingStyle;
    }

    public get inventory(): InventoryItem[] {
        return this._inventory;
    }

    public set inventory(inventory: InventoryItem[]) {
        this._inventory = inventory;
    }

// ========Character Class Methods========
    addToInventory(inventoryItem: InventoryItem): void {
        this._inventory.push(inventoryItem)
    }

    removeFromInventory(inventoryItem: InventoryItem) {
        this._inventory = this._inventory.filter(item => item.name !== inventoryItem.name)
    }

    removeQuantityFromInventory(inventoryItem: InventoryItem, quantityToRemove: number){
        let numberToRemove: number = quantityToRemove
        this._inventory = this._inventory.filter(item => {
            if (numberToRemove > 0 && item.name === inventoryItem.name) {
                numberToRemove --
                return false
            } else return true
        })
    }

    inventoryValue(): number{
        let total = 0
        this._inventory.forEach(item => {
            total += item.price
        })
        console.log(`Total Inventory Value: ${total} Coins`)
        return total
    }

    printInventory(): void{
        this._inventory.forEach(item => {
            console.log(`Item: ${item.name} Price: ${item.price} Coins`)
        })
    }
}

class Inventory {

    private _items: InventoryItem[]

    constructor(_items: InventoryItem[]){
        this._items = _items
    }

// getters and setters
    public get items(): InventoryItem[] {
        return this._items
    }

    public set items(items: InventoryItem[]) {
        this._items = items
    }
}

class Shop {

    private _items: InventoryItem[]

    constructor(_items: InventoryItem[]){
        this._items = _items
    }

// getters and setters
    public get items(): InventoryItem[] {
        return this._items
    }

    public set items(items: InventoryItem[]) {
        this._items = items
    }

// ========Shop Class Methods========
    shopConstructor(item1: InventoryItem, item2: InventoryItem, item3: InventoryItem): void{
        const anItem = item1
        const anItem2 = item2
        const anItem3 = item3
        this._items.push(anItem, anItem2, anItem3)
    }
    autoConstructor(): void{
        const anItem = new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75)
        const anItem2 = new Armor('Justiciar Chestguard', 18249491, "A Justiciar's chestguard. They once roamed the land casting judgements on wrongdoers, their decisions were never questioned.", 75)
        const anItem3 = new Armor('Justiciar Legguards', 13744156, "	A Justiciar's platelegs. Their once bright colours have since faded.", 75)
        this._items.push(anItem, anItem2, anItem3)
    }
}

// Step 4: Driver Code
// ==================================================================================Classes==================================================================================

const SeanMcGoodGuy = new Character('SeanMcGoodGuy', 'Paladin', 'melee')
const anInventory = new Inventory([new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false), new Armor('Justiciar Legguards', 13744156, "	A Justiciar's platelegs. Their once bright colours have since faded.", 75)])
console.log(anInventory)
SeanMcGoodGuy.addToInventory(new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false))
SeanMcGoodGuy.addToInventory(new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false))
SeanMcGoodGuy.addToInventory(new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false))
SeanMcGoodGuy.addToInventory(new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75))
SeanMcGoodGuy.addToInventory(new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75))
SeanMcGoodGuy.addToInventory(new Armor('Justiciar Chestguard', 18249491, "A Justiciar's chestguard. They once roamed the land casting judgements on wrongdoers, their decisions were never questioned.", 75))
SeanMcGoodGuy.addToInventory(new Armor('Justiciar Legguards', 13744156, "	A Justiciar's platelegs. Their once bright colours have since faded.", 75))
SeanMcGoodGuy.addToInventory(new Weapon('Bronze Crossbow', 480, 'A bronze crossbow.', 21, true))
SeanMcGoodGuy.addToInventory(new Weapon('Bronze Crossbow', 480, 'A bronze crossbow.', 21, true))
SeanMcGoodGuy.addToInventory(new Weapon('Bronze Crossbow', 480, 'A bronze crossbow.', 21, true))
SeanMcGoodGuy.inventoryValue()
SeanMcGoodGuy.printInventory()
SeanMcGoodGuy.removeFromInventory(new Weapon('Bronze Crossbow', 480, 'A bronze crossbow.', 21, true))
SeanMcGoodGuy.removeQuantityFromInventory(new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false), 2)
SeanMcGoodGuy.inventoryValue()
SeanMcGoodGuy.printInventory()
const SeanMcGoodGuyFavShop = new Shop([
    new Weapon('Saradomin Sword', 130000, 'The incredible blade of an Icyene.', 53, false),
    new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75),
    new Armor('Justiciar Chestguard', 18249491, "A Justiciar's chestguard. They once roamed the land casting judgements on wrongdoers, their decisions were never questioned.", 75),
    new Armor('Justiciar Legguards', 13744156, "	A Justiciar's platelegs. Their once bright colours have since faded.", 75)])
console.log(SeanMcGoodGuyFavShop)
SeanMcGoodGuyFavShop.shopConstructor(
    new Weapon('Ghrazi Rapier', 47388698, 'A razor sharp rapier, smeared with vampyric blood.', 87, false),
    new Weapon('Crystal Bow', 300000, 'A nice sturdy magical bow.', 65, true),
    new Armor('Dragon Full Helm', 66805691, 'Protects your head and looks impressive too.', 60)
)
SeanMcGoodGuyFavShop.autoConstructor()
console.log(SeanMcGoodGuyFavShop)