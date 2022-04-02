addLayer("k", {
    name: "knowledge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches : ["m"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    color: "#D5F5E3",

    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    
    resource: "Knowledge", // Name of prestige currency
    
    baseResource: "Read Book", // Name of resource prestige is based on

    baseAmount() {return player.points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    //CURRENCY
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('k', 14)) mult = mult.times(upgradeEffect('k', 14))
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        if (hasUpgrade('m', 14)) mult = mult.times(upgradeEffect('m', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    
    hotkeys: [
        {key: "k", description: "k: Reset for knowledge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown(){return true},

    milestones: {
        1: {
            requirementDescription: "<b>Mind Breaking</b><br>20 knowledge",
            effectDescription: "Lets you prestige for Mind Strengthen",
            done() { return player.k.points.gte(20) }
            }
        },
    
    upgrades: {

        11: {
            title: "Reading",
            description: "You can Read a book per second",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
        },

        12:{
            title:"SPEED!",
            description:"“Reading” now read twice amount of book per sec",
            cost: new Decimal(1),
            unlocked(){ return hasUpgrade("k",11)},
        },

        13:{
            title:"Reading with skill",
            description:"Knowledge increase your read book every second",
            cost: new Decimal(5),
            unlocked(){ return hasUpgrade("k",12)},
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        
        14:{
            title:"Skillful",
            description:"Read Book increase knowledge points gain",
            cost: new Decimal(15),
            unlocked(){ return hasUpgrade("k",13)},
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

    
    },

    autoUpgradeif (hasMilestone('m', 1)) {return true}

