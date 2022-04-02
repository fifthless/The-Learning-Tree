addLayer("d", {
    name: "draw", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    color: "#D2E99C",

    requires: new Decimal(16), // Can be a function that takes requirement increases into account
    
    resource: "Draws", // Name of prestige currency
    
    baseResource: "knowledge", // Name of resource prestige is based on

    baseAmount() {return player["k"].points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    //CURRENCY
    exponent: 0.5, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
      
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    hotkeys: [
        {key: "d", description: "d: Reset for Draw", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    layerShown() {  
        if(hasUpgrade ("d",11)){return true}
        return hasMilestone("m",3)
    
    },

    milestones: {  
        0: {
            requirementDescription: "<b>Art Keeper</b><br>1 Mind Strengthen",
            effectDescription: "You can keep this layer when you do a layer 2 reset",
            done() { return player.d.points.gte(1) },
        },    
    },

    
    upgrades: {

        11: {
            title: "Opened-Art",
            description: "Draw start to effect read book gain",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked  }, // The upgrade is only visible when this is true
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    
    }
})
