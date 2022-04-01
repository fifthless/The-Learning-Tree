addLayer("m",{
    name: "Mind Strengthen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return{
        unlocked: true,
        points: new Decimal(0),
}},

    color: "#F5B7B1",

    requires: new Decimal(15), // Can be a function that takes requirement increases into account

    resource: "Mind Strengthen", // Name of prestige currency
        baseResource: "knowledge", // Name of resource prestige is based on
        baseAmount() { return player["k"].points}, // Get the current amount of baseResource

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

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
    {key: "m", description: "m: Reset for Mind Strengthen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
],

    layerShown(){ 
        if(player[this.layer].points>0){return true} 
        return hasMilestone("k",1)},

    upgrades: {

        11: {
                title: "Keeping Mind",
                description: "You can keep this layer even if you make a “Mind Strengthen” reset",
                cost: new Decimal(0),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
                
            },

        12: {
                title: "Opened-Mind",
                description: "Mind Strengthen start to effect word gain",
                cost: new Decimal(1),
                unlocked() { return hasUpgrade("m",11)}, // The upgrade is only visible when this is true
                effect() {
                    return player[this.layer].points.add(1).pow(0.5)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        

    },

})