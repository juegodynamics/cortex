import { FactoryNodeProps } from "./FactoryNode";
import { FactoryEdgeProps, getEdgeString } from "./FactoryEdge";

export { FactoryNodeProps, FactoryEdgeProps, getEdgeString };

export type RecipeName = string;
export type RecipeMaster = Record<RecipeName, [string[], string[]]>;

export const master: RecipeMaster = {
    saphirite_ore_crushing: [
        ["saphirite_ore"],
        ["crushed_saphirite", "crushed_stone"],
    ],
    iron_ore_catalyst: [
        ["mineral_catalyst", "crushed_saphirite", "crushed_jivolite"],
        ["iron_ore"],
    ],
    iron_plate_saph: [["crushed_saphirite"], ["iron_plate"]],
    crushed_saphirite_ore_sorting: [
        ["crushed_saphirite"],
        ["iron_ore", "copper_ore", "slag"],
    ],
    crushed_ferrous_mixture: [
        ["crushed_saphirite", "crushed_jivolite", "crushed_rubyte"],
        ["crushed_ferrous_mixture"],
    ],
    saphirite_hydro_refining: [
        ["crushed_saphirite", "purified_water"],
        ["saphirite_chunks", "blue_geode", "sulfuric_waste_water"],
    ],
    nickel_ore_catalyst: [
        ["crystal_catalyst", "saphirite_chunks", "rubyte_chunks"],
        ["nickel_ore"],
    ],
    ferrous_sludge: [
        [
            "ferrous_powder",
            "saphirite_chunks",
            "rubyte_chunks",
            "jivolite_chunks",
            "thermal_water",
            "sulfuric_acid",
        ],
        ["ferrous_sludge"],
    ],
    saphirite_chunks_sorting: [
        ["saphirite_chunks"],
        ["iron_ore", "copper_ore", "silicon_ore", "nickel_ore", "slag"],
    ],
    saphirite_leaching: [
        ["saphirite_chunks", "sulfuric_acid"],
        ["saphirite_crystals"],
    ],
    titanium_ore_catalyst: [
        [
            "hybrid_catalyst",
            "saphirite_crystals",
            "crotinnium_crystals",
            "rubyte_crystals",
        ],
        ["titanium_ore"],
    ],
    gold_ore_catalyst: [
        [
            "hybrid_catalyst",
            "saphirite_crystals",
            "rubyte_crystals",
            "bobmonium_crystals",
        ],
        ["gold_ore"],
    ],
    uranium_ore_catalyst: [
        [
            "hybrid_catalyst",
            "saphirite_crystals",
            "stiratite_crystals",
            "rubyte_crystals",
        ],
        ["uranium_ore"],
    ],
    ferrous_slurry: [
        [
            "ferrous_dust",
            "saphirite_crystals",
            "jivolite_crystals",
            "rubyte_crystals",
            "sulfuric_acid",
        ],
        ["ferrous_slurry"],
    ],
    saphirite_crystals_sorting: [
        ["saphirite_crystals"],
        [
            "iron_ore",
            "copper_ore",
            "silicon_ore",
            "nickel_ore",
            "titanium_ore",
            "slag",
        ],
    ],
    saphirite_thermal_refining: [
        ["saphirite_crystals"],
        ["purified_saphirite"],
    ],
    tungsten_ore_catalyst: [
        [
            "hybrid_catalyst",
            "purified_saphirite",
            "purified_jivolite",
            "purified_stiratite",
        ],
        ["tungsten_ore"],
    ],
    purified_saphirite_sorting: [
        ["purified_saphirite"],
        [
            "iron_ore",
            "copper_ore",
            "silicon_ore",
            "nickel_ore",
            "titanium_ore",
            "tungsten_ore",
        ],
    ],
    jivolite_ore_crushing: [
        ["jivolite_ore"],
        ["crushed_jivolite", "crushed_stone"],
    ],
    crushed_jivolite_ore_sorting: [
        ["crushed_jivolite"],
        ["iron_ore", "copper_ore", "slag"],
    ],
};

const convertMaster = () => {
    const nodes: Record<string, FactoryNodeProps> = {};
    const ingredientIndex: Record<string, string[]> = {};
    const productIndex: Record<string, string[]> = {};

    Object.entries(master).forEach(([recipeName, [ingredients, products]]) => {
        nodes[recipeName] = {
            name: recipeName,
            ingredients,
            products,
        };

        ingredients.forEach((ingredient) => {
            ingredientIndex[ingredient] = [
                ...(ingredientIndex[ingredient] || []),
                recipeName,
            ];
        });

        products.forEach((product) => {
            productIndex[product] = [
                ...(productIndex[product] || []),
                recipeName,
            ];
        });
    });

    const edges: Record<string, FactoryEdgeProps> = {};

    Object.entries(ingredientIndex).forEach(
        ([ingredient, ingredientRecipes]) => {
            if (productIndex[ingredient]?.length) {
                productIndex[ingredient].forEach((productRecipe) => {
                    ingredientRecipes.forEach((ingredientRecipe) => {
                        const edge: FactoryEdgeProps = {
                            start: { node: productRecipe, port: ingredient },
                            end: { node: ingredientRecipe, port: ingredient },
                        };
                        edges[getEdgeString(edge)] = edge;
                    });
                });
            }
        }
    );

    return {
        nodes: Object.values(nodes),
        edges: Object.values(edges),
    };
};

export const { nodes: FactoryNodes, edges: FactoryEdges } = convertMaster();
