addLayer("m",{
    name: "Mind Strengthen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches : ["d"],
    startData() { return{
        unlocked: true,
        points: new Decimal(0),
}},

    color: "#9CE2E9",

    requires: new Decimal(13), // Can be a function that takes requirement increases into account

    resource: "Mind Strengthen", // Name of prestige currency
        baseResource: "knowledge", // Name of resource prestige is based on
        baseAmount() { return player["k"].points}, // Get the current amount of baseResource

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    canBuyMax(){return true},

    //CURRENCY
    exponent: 0.7, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
    
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
},

row: 1, // Row the layer is in on the tree (0 is the first row)

hotkeys: [
    {key: "m", description: "m: Reset for Mind Strengthen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
],

    layerShown(){ 
        if(hasMilestone ("m",0)){return true}
        return hasMilestone("k",1)},

     milestones: {
        0: {
                requirementDescription: "<b>Mind Keeper</b><br>1 Mind Strengthen",
                effectDescription: "You can keep this layer when you do a layer 2 reset",
                done() { return player.m.points.gte(1) },
        },

        1: {
                requirementDescription: "<b>AutoKnown</b><br>5 Mind Strengthen",
                effectDescription: "Lets you autobuy knowledge upgrade",
                done() { return player.m.points.gte(5) },
            },

        

        3: {
                requirementDescription: "<b>Art</b><br>15 Mind Strengthen",
                effectDescription: "Unlock a new Layer “draw” ",
                done() { return player.m.points.gte(10) }
            }
    },

    upgrades: {

        11: {
                title: "Opened-Mind",
                description: "Mind Strengthen start to effect read book gain",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked  }, // The upgrade is only visible when this is true
                effect() {
                    return player[this.layer].points.add(1).pow(0.5)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },

        12: {
                title: "Known",
                description: "Mind Strengthen start to effect knowledge gain",
                cost: new Decimal(2),
                unlocked() { return hasUpgrade("m",11)}, // The upgrade is only visible when this is true
                effect() {
                    return player[this.layer].points.add(1).pow(0.4)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },

        13: {
                title: "Minder",
                description: "Mind Strengthen effect knowledge gain and read book gain <b>AGAIN</b>",
                cost: new Decimal(3),
                unlocked() { return hasUpgrade("m",12)}, // The upgrade is only visible when this is true
                effect() {
                    return player[this.layer].points.add(1).pow(0.7)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },  

        

        

        21: {
                title: "Harmony",
                description: "Unlock the first knowledge buyable",
                cost: new Decimal(10),
                unlocked() { return hasUpgrade("m",21)}, // The upgrade is only visible when this is true
            },  


        

    },

})