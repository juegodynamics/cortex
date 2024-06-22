algorithm: 'layered'
spacing.portPort: 0

node saphirite_ore_crushing {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_ore_crushing"

    port saphirite_ore {
        ^port.side: WEST
        label "saphirite_ore"
    }
    port crushed_saphirite {
        ^port.side: EAST
        label "crushed_saphirite"
    }

    port crushed_stone {
        ^port.side: EAST
        label "crushed_stone"
    }
}


node iron_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "iron_ore_catalyst"

    port mineral_catalyst {
        ^port.side: WEST
        label "mineral_catalyst"
    }

    port crushed_saphirite {
        ^port.side: WEST
        label "crushed_saphirite"
    }

    port crushed_jivolite {
        ^port.side: WEST
        label "crushed_jivolite"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }
}


node iron_plate_saph {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "iron_plate_saph"

    port crushed_saphirite {
        ^port.side: WEST
        label "crushed_saphirite"
    }
    port iron_plate {
        ^port.side: EAST
        label "iron_plate"
    }
}


node crushed_saphirite_ore_sorting {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "crushed_saphirite_ore_sorting"

    port crushed_saphirite {
        ^port.side: WEST
        label "crushed_saphirite"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }

    port copper_ore {
        ^port.side: EAST
        label "copper_ore"
    }

    port slag {
        ^port.side: EAST
        label "slag"
    }
}


node crushed_ferrous_mixture {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "crushed_ferrous_mixture"

    port crushed_saphirite {
        ^port.side: WEST
        label "crushed_saphirite"
    }

    port crushed_jivolite {
        ^port.side: WEST
        label "crushed_jivolite"
    }

    port crushed_rubyte {
        ^port.side: WEST
        label "crushed_rubyte"
    }
    port crushed_ferrous_mixture {
        ^port.side: EAST
        label "crushed_ferrous_mixture"
    }
}


node saphirite_hydro_refining {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_hydro_refining"

    port crushed_saphirite {
        ^port.side: WEST
        label "crushed_saphirite"
    }

    port purified_water {
        ^port.side: WEST
        label "purified_water"
    }
    port saphirite_chunks {
        ^port.side: EAST
        label "saphirite_chunks"
    }

    port blue_geode {
        ^port.side: EAST
        label "blue_geode"
    }

    port sulfuric_waste_water {
        ^port.side: EAST
        label "sulfuric_waste_water"
    }
}


node nickel_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "nickel_ore_catalyst"

    port crystal_catalyst {
        ^port.side: WEST
        label "crystal_catalyst"
    }

    port saphirite_chunks {
        ^port.side: WEST
        label "saphirite_chunks"
    }

    port rubyte_chunks {
        ^port.side: WEST
        label "rubyte_chunks"
    }
    port nickel_ore {
        ^port.side: EAST
        label "nickel_ore"
    }
}


node ferrous_sludge {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "ferrous_sludge"

    port ferrous_powder {
        ^port.side: WEST
        label "ferrous_powder"
    }

    port saphirite_chunks {
        ^port.side: WEST
        label "saphirite_chunks"
    }

    port rubyte_chunks {
        ^port.side: WEST
        label "rubyte_chunks"
    }

    port jivolite_chunks {
        ^port.side: WEST
        label "jivolite_chunks"
    }

    port thermal_water {
        ^port.side: WEST
        label "thermal_water"
    }

    port sulfuric_acid {
        ^port.side: WEST
        label "sulfuric_acid"
    }
    port ferrous_sludge {
        ^port.side: EAST
        label "ferrous_sludge"
    }
}


node saphirite_chunks_sorting {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_chunks_sorting"

    port saphirite_chunks {
        ^port.side: WEST
        label "saphirite_chunks"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }

    port copper_ore {
        ^port.side: EAST
        label "copper_ore"
    }

    port silicon_ore {
        ^port.side: EAST
        label "silicon_ore"
    }

    port nickel_ore {
        ^port.side: EAST
        label "nickel_ore"
    }

    port slag {
        ^port.side: EAST
        label "slag"
    }
}


node saphirite_leaching {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_leaching"

    port saphirite_chunks {
        ^port.side: WEST
        label "saphirite_chunks"
    }

    port sulfuric_acid {
        ^port.side: WEST
        label "sulfuric_acid"
    }
    port saphirite_crystals {
        ^port.side: EAST
        label "saphirite_crystals"
    }
}


node titanium_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "titanium_ore_catalyst"

    port hybrid_catalyst {
        ^port.side: WEST
        label "hybrid_catalyst"
    }

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }

    port crotinnium_crystals {
        ^port.side: WEST
        label "crotinnium_crystals"
    }

    port rubyte_crystals {
        ^port.side: WEST
        label "rubyte_crystals"
    }
    port titanium_ore {
        ^port.side: EAST
        label "titanium_ore"
    }
}


node gold_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "gold_ore_catalyst"

    port hybrid_catalyst {
        ^port.side: WEST
        label "hybrid_catalyst"
    }

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }

    port rubyte_crystals {
        ^port.side: WEST
        label "rubyte_crystals"
    }

    port bobmonium_crystals {
        ^port.side: WEST
        label "bobmonium_crystals"
    }
    port gold_ore {
        ^port.side: EAST
        label "gold_ore"
    }
}


node uranium_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "uranium_ore_catalyst"

    port hybrid_catalyst {
        ^port.side: WEST
        label "hybrid_catalyst"
    }

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }

    port stiratite_crystals {
        ^port.side: WEST
        label "stiratite_crystals"
    }

    port rubyte_crystals {
        ^port.side: WEST
        label "rubyte_crystals"
    }
    port uranium_ore {
        ^port.side: EAST
        label "uranium_ore"
    }
}


node ferrous_slurry {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "ferrous_slurry"

    port ferrous_dust {
        ^port.side: WEST
        label "ferrous_dust"
    }

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }

    port jivolite_crystals {
        ^port.side: WEST
        label "jivolite_crystals"
    }

    port rubyte_crystals {
        ^port.side: WEST
        label "rubyte_crystals"
    }

    port sulfuric_acid {
        ^port.side: WEST
        label "sulfuric_acid"
    }
    port ferrous_slurry {
        ^port.side: EAST
        label "ferrous_slurry"
    }
}


node saphirite_crystals_sorting {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_crystals_sorting"

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }

    port copper_ore {
        ^port.side: EAST
        label "copper_ore"
    }

    port silicon_ore {
        ^port.side: EAST
        label "silicon_ore"
    }

    port nickel_ore {
        ^port.side: EAST
        label "nickel_ore"
    }

    port titanium_ore {
        ^port.side: EAST
        label "titanium_ore"
    }

    port slag {
        ^port.side: EAST
        label "slag"
    }
}


node saphirite_thermal_refining {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "saphirite_thermal_refining"

    port saphirite_crystals {
        ^port.side: WEST
        label "saphirite_crystals"
    }
    port purified_saphirite {
        ^port.side: EAST
        label "purified_saphirite"
    }
}


node tungsten_ore_catalyst {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "tungsten_ore_catalyst"

    port hybrid_catalyst {
        ^port.side: WEST
        label "hybrid_catalyst"
    }

    port purified_saphirite {
        ^port.side: WEST
        label "purified_saphirite"
    }

    port purified_jivolite {
        ^port.side: WEST
        label "purified_jivolite"
    }

    port purified_stiratite {
        ^port.side: WEST
        label "purified_stiratite"
    }
    port tungsten_ore {
        ^port.side: EAST
        label "tungsten_ore"
    }
}


node purified_saphirite_sorting {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "purified_saphirite_sorting"

    port purified_saphirite {
        ^port.side: WEST
        label "purified_saphirite"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }

    port copper_ore {
        ^port.side: EAST
        label "copper_ore"
    }

    port silicon_ore {
        ^port.side: EAST
        label "silicon_ore"
    }

    port nickel_ore {
        ^port.side: EAST
        label "nickel_ore"
    }

    port titanium_ore {
        ^port.side: EAST
        label "titanium_ore"
    }

    port tungsten_ore {
        ^port.side: EAST
        label "tungsten_ore"
    }
}


node jivolite_ore_crushing {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "jivolite_ore_crushing"

    port jivolite_ore {
        ^port.side: WEST
        label "jivolite_ore"
    }
    port crushed_jivolite {
        ^port.side: EAST
        label "crushed_jivolite"
    }

    port crushed_stone {
        ^port.side: EAST
        label "crushed_stone"
    }
}


node crushed_jivolite_ore_sorting {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "crushed_jivolite_ore_sorting"

    port crushed_jivolite {
        ^port.side: WEST
        label "crushed_jivolite"
    }
    port iron_ore {
        ^port.side: EAST
        label "iron_ore"
    }

    port copper_ore {
        ^port.side: EAST
        label "copper_ore"
    }

    port slag {
        ^port.side: EAST
        label "slag"
    }
}


edge saphirite_ore_crushing.crushed_saphirite -> iron_ore_catalyst.crushed_saphirite

edge saphirite_ore_crushing.crushed_saphirite -> iron_plate_saph.crushed_saphirite

edge saphirite_ore_crushing.crushed_saphirite -> crushed_saphirite_ore_sorting.crushed_saphirite

edge saphirite_ore_crushing.crushed_saphirite -> crushed_ferrous_mixture.crushed_saphirite

edge saphirite_ore_crushing.crushed_saphirite -> saphirite_hydro_refining.crushed_saphirite

edge jivolite_ore_crushing.crushed_jivolite -> iron_ore_catalyst.crushed_jivolite

edge jivolite_ore_crushing.crushed_jivolite -> crushed_ferrous_mixture.crushed_jivolite

edge jivolite_ore_crushing.crushed_jivolite -> crushed_jivolite_ore_sorting.crushed_jivolite

edge saphirite_hydro_refining.saphirite_chunks -> nickel_ore_catalyst.saphirite_chunks

edge saphirite_hydro_refining.saphirite_chunks -> ferrous_sludge.saphirite_chunks

edge saphirite_hydro_refining.saphirite_chunks -> saphirite_chunks_sorting.saphirite_chunks

edge saphirite_hydro_refining.saphirite_chunks -> saphirite_leaching.saphirite_chunks

edge saphirite_leaching.saphirite_crystals -> titanium_ore_catalyst.saphirite_crystals

edge saphirite_leaching.saphirite_crystals -> gold_ore_catalyst.saphirite_crystals

edge saphirite_leaching.saphirite_crystals -> uranium_ore_catalyst.saphirite_crystals

edge saphirite_leaching.saphirite_crystals -> ferrous_slurry.saphirite_crystals

edge saphirite_leaching.saphirite_crystals -> saphirite_crystals_sorting.saphirite_crystals

edge saphirite_leaching.saphirite_crystals -> saphirite_thermal_refining.saphirite_crystals

edge saphirite_thermal_refining.purified_saphirite -> tungsten_ore_catalyst.purified_saphirite

edge saphirite_thermal_refining.purified_saphirite -> purified_saphirite_sorting.purified_saphirite
