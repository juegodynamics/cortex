interface ElkNode {
    name: string;
    westPorts: string[];
    eastPorts: string[];
}

const newNode = (
    name: string,
    westPorts: string[],
    eastPorts: string[],
): ElkNode => ({ name, westPorts, eastPorts });

const getPortString = (
    port: string,
    side: 'WEST' | 'EAST' | 'NORTH' | 'SOUTH',
): string => `    port ${port} {
        ^port.side: ${side}
        label "${port}"
    }`;

const getNodeString = (node: ElkNode) => `node ${node.name} {
    nodeLabels.placement: "H_CENTER V_CENTER INSIDE"
    nodeSize.constraints: "NODE_LABELS PORTS PORT_LABELS"
    portConstraints: FIXED_SIDE
    label "${node.name}"

${node.westPorts.map(port => getPortString(port, 'WEST')).join('\n\n')}
${node.eastPorts.map(port => getPortString(port, 'EAST')).join('\n\n')}
}\n`;

interface Edge {
    start: [string, string];
    end: [string, string];
}

const newEdge = (
    startNode: string,
    startPort: string,
    endNode: string,
    endPort: string,
): Edge => ({
    start: [startNode, startPort],
    end: [endNode, endPort],
});

const getEdgeString = (edge: Edge) =>
    `edge ${edge.start[0]}.${edge.start[1]} -> ${edge.end[0]}.${edge.end[1]}`;

type RecipeName = string;
type ItemName = string;

type RecipeMaster = Record<RecipeName, [string[], string[]]>;

// const saphirite_ore =  'saphirite_ore'
// const crushed_saphirite = 'crushed_saphirite';
// const crushed_stone = 'crushed_stone';
// const mineral_catalyst = 'mineral_catalyst';

type Label = string;

// Types
// const

// Forms
// const ore:Label = '🜝'
// const crushed:Label = 'crsh'
// const chunks:Label = 'chnk'
// const crystals:Label = 'crys'

// const getSaphirite

const master: RecipeMaster = {
    saphirite_ore_crushing: [
        ['saphirite_ore'],
        ['crushed_saphirite', 'crushed_stone'],
    ],
    iron_ore_catalyst: [
        ['mineral_catalyst', 'crushed_saphirite', 'crushed_jivolite'],
        ['iron_ore'],
    ],
    iron_plate_saph: [['crushed_saphirite'], ['iron_plate']],
    crushed_saphirite_ore_sorting: [
        ['crushed_saphirite'],
        ['iron_ore', 'copper_ore', 'slag'],
    ],
    crushed_ferrous_mixture: [
        ['crushed_saphirite', 'crushed_jivolite', 'crushed_rubyte'],
        ['crushed_ferrous_mixture'],
    ],
    saphirite_hydro_refining: [
        ['crushed_saphirite', 'purified_water'],
        ['saphirite_chunks', 'blue_geode', 'sulfuric_waste_water'],
    ],
    nickel_ore_catalyst: [
        ['crystal_catalyst', 'saphirite_chunks', 'rubyte_chunks'],
        ['nickel_ore'],
    ],
    ferrous_sludge: [
        [
            'ferrous_powder',
            'saphirite_chunks',
            'rubyte_chunks',
            'jivolite_chunks',
            'thermal_water',
            'sulfuric_acid',
        ],
        ['ferrous_sludge'],
    ],
    saphirite_chunks_sorting: [
        ['saphirite_chunks'],
        ['iron_ore', 'copper_ore', 'silicon_ore', 'nickel_ore', 'slag'],
    ],
    saphirite_leaching: [
        ['saphirite_chunks', 'sulfuric_acid'],
        ['saphirite_crystals'],
    ],
    titanium_ore_catalyst: [
        [
            'hybrid_catalyst',
            'saphirite_crystals',
            'crotinnium_crystals',
            'rubyte_crystals',
        ],
        ['titanium_ore'],
    ],
    gold_ore_catalyst: [
        [
            'hybrid_catalyst',
            'saphirite_crystals',
            'rubyte_crystals',
            'bobmonium_crystals',
        ],
        ['gold_ore'],
    ],
    uranium_ore_catalyst: [
        [
            'hybrid_catalyst',
            'saphirite_crystals',
            'stiratite_crystals',
            'rubyte_crystals',
        ],
        ['uranium_ore'],
    ],
    ferrous_slurry: [
        [
            'ferrous_dust',
            'saphirite_crystals',
            'jivolite_crystals',
            'rubyte_crystals',
            'sulfuric_acid',
        ],
        ['ferrous_slurry'],
    ],
    saphirite_crystals_sorting: [
        ['saphirite_crystals'],
        [
            'iron_ore',
            'copper_ore',
            'silicon_ore',
            'nickel_ore',
            'titanium_ore',
            'slag',
        ],
    ],
    saphirite_thermal_refining: [
        ['saphirite_crystals'],
        ['purified_saphirite'],
    ],
    tungsten_ore_catalyst: [
        [
            'hybrid_catalyst',
            'purified_saphirite',
            'purified_jivolite',
            'purified_stiratite',
        ],
        ['tungsten_ore'],
    ],
    purified_saphirite_sorting: [
        ['purified_saphirite'],
        [
            'iron_ore',
            'copper_ore',
            'silicon_ore',
            'nickel_ore',
            'titanium_ore',
            'tungsten_ore',
        ],
    ],
    jivolite_ore_crushing: [
        ['jivolite_ore'],
        ['crushed_jivolite', 'crushed_stone'],
    ],
    crushed_jivolite_ore_sorting: [
        ['crushed_jivolite'],
        ['iron_ore', 'copper_ore', 'slag'],
    ],
};

const convertMaster = () => {
    const nodes: Record<string, ElkNode> = {};
    const ingredientIndex: Record<string, string[]> = {};
    const productIndex: Record<string, string[]> = {};

    Object.entries(master).forEach(([recipeName, [ingredients, products]]) => {
        nodes[recipeName] = {
            name: recipeName,
            westPorts: ingredients,
            eastPorts: products,
        };

        ingredients.forEach(ingredient => {
            ingredientIndex[ingredient] = [
                ...(ingredientIndex[ingredient] || []),
                recipeName,
            ];
        });

        products.forEach(product => {
            productIndex[product] = [
                ...(productIndex[product] || []),
                recipeName,
            ];
        });
    });

    const edges: Record<string, Edge> = {};

    Object.entries(ingredientIndex).forEach(
        ([ingredient, ingredientRecipes]) => {
            if (productIndex[ingredient]?.length) {
                productIndex[ingredient].forEach(productRecipe => {
                    ingredientRecipes.forEach(ingredientRecipe => {
                        const edge: Edge = {
                            start: [productRecipe, ingredient],
                            end: [ingredientRecipe, ingredient],
                        };
                        edges[getEdgeString(edge)] = edge;
                    });
                });
            }
        },
    );

    return {
        nodes: Object.values(nodes),
        edges: Object.values(edges),
    };
};

const getNodesEdgesString = ({
    nodes,
    edges,
}: {
    nodes: ElkNode[];
    edges: Edge[];
}): string =>
    [
        ...nodes.map(node => getNodeString(node)),
        ...edges.map(edge => getEdgeString(edge)),
    ].join('\n\n');

console.log(
    // getNodesEdgesString({
    //     nodes: [
    //         newNode('sphOreCrush', ['sphOre'], ['sphCrushed', 'stoneCrushed']),
    //         newNode(
    //             'sphHydro',
    //             ['sphCrushed', 'purH20'],
    //             ['sphChunks', 'bGeode', 'sulWH20'],
    //         ),
    //         newNode('sphLeach', ['sphChunks', 'sulAcid'], ['sphCrystal']),
    //         newNode('sphThermRefine', ['sphCrystal'], ['purSph']),
    //         newNode(
    //             'purSphSort',
    //             ['purSph'],
    //             ['ironOre', 'cuOre', 'siOre', 'niOre', 'tiOre', 'tungOre'],
    //         ),
    //     ],
    //     edges: [
    //         newEdge('sphOreCrush', 'sphCrushed', 'sphHydro', 'sphCrushed'),
    //         newEdge('sphHydro', 'sphChunks', 'sphLeach', 'sphChunks'),
    //         newEdge('sphLeach', 'sphCrystal', 'sphThermRefine', 'sphCrystal'),
    //         newEdge('sphThermRefine', 'purSph', 'purSphSort', 'purSph'),
    //     ],
    // }),

    `algorithm: 'layered'
spacing.portPort: 0

${getNodesEdgesString(convertMaster())}`,
);
