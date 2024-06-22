import ELK, {
    ElkNode,
    ElkExtendedEdge as ElkEdge,
    LayoutOptions,
} from "elkjs/lib/elk.bundled.js";
import {
    FactoryEdgeProps,
    getEdgeString,
    FactoryNodes,
    FactoryEdges,
} from "../lib/factory";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
    Node as RFNode,
    Edge as RFEdge,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow,
    NodeProps,
    Handle,
    Position,
    Background,
    useUpdateNodeInternals,
} from "reactflow";
import "reactflow/dist/style.css";
import {
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Fab,
    Stack,
    TextField,
    Typography,
    useTheme,
    ThemeProvider,
} from "@mui/material";
import { DarkTheme } from "../theme";
import "./Factory.css";
import { GlassSurface } from "../components/surfaces/GlassSurface";
import { Recipe, RecipeIndex } from "../lib/factory/Recipe";
import AddIcon from "@mui/icons-material/Add";

const elk = new ELK();
const NODE_WIDTH = 300;

type RFNodeProps = { recipe: Recipe };

const getNodeHeight = ({ recipe }: RFNodeProps) =>
    16 +
    20 *
        Math.max(
            recipe?.ingredients?.length || 0,
            recipe?.products?.length || 0
        );

const layoutNodes = async ({
    nodes: rfNodes,
    edges: rfEdges,
}: {
    nodes: RFNode<RFNodeProps>[];
    edges: RFEdge[];
}) => {
    const layoutOptions: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "100",
        "elk.spacing.nodeNode": "80",
    };

    const graph: ElkNode = {
        id: "root",
        layoutOptions: layoutOptions,
        children: rfNodes.map((rfNode) => ({
            id: rfNode.id,
            width: rfNode.width || 300,
            height: rfNode.height || getNodeHeight(rfNode.data),
        })),
        edges: rfEdges.map((rfEdge) => ({
            id: rfEdge.id,
            sources: [`${rfEdge.source}`],
            targets: [`${rfEdge.target}`],
        })),
    };

    const layedGraph = await elk.layout(graph);
    const layedElkNodeMap: Record<string, ElkNode> =
        layedGraph.children!.reduce(
            (part, next) => ({ ...part, [next.id]: next }),
            {}
        );

    return {
        nodes: rfNodes.map((rfNode) => {
            const elkNode = layedElkNodeMap[rfNode.id];
            return {
                ...rfNode,
                position: {
                    x: elkNode.x!,
                    y: elkNode.y!,
                },
            };
        }),
        edges: rfEdges,
    };
};

const RecipeNodeComponent = ({
    id,
    data: { recipe },
}: NodeProps<RFNodeProps>) => {
    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
        updateNodeInternals(id);
    }, [id, updateNodeInternals]);

    return (
        <div>
            {recipe.ingredients?.map((ingredient, ingredientIndex) => (
                <Handle
                    key={`${recipe.name}.ingredient.${ingredient.name}`}
                    id={`${recipe.name}.ingredient.${ingredient.name}`}
                    position={Position.Left}
                    type="target"
                    style={{ top: 11 + 16 * ingredientIndex, left: -16 }}
                />
            ))}

            <GlassSurface
                minHeight={`${16 * Math.max(recipe.ingredients?.length || 0, recipe.products?.length || 0)}px`}
                sx={{ p: 1 }}
            >
                {recipe.name}
            </GlassSurface>

            {recipe.products?.map((product, productIndex) => (
                <Handle
                    key={`${recipe.name}.product.${product.name}`}
                    id={`${recipe.name}.product.${product.name}`}
                    position={Position.Right}
                    type="source"
                    style={{ top: 11 + 16 * productIndex, right: -16 }}
                />
            ))}
        </div>
    );
};

const nodeTypes = {
    recipe: RecipeNodeComponent,
};

const getUnique = <T,>(arr: T[]): T[] =>
    arr.filter(
        (element, index, _arr) =>
            _arr.findIndex((_element) => _element === element) === index
    );

const recipesToReactFlow = (recipeNames: string[]) => {
    const uniqueRecipeNames = getUnique(recipeNames);
    const nodes: Record<string, RFNode<{ recipe: Recipe }>> = {};
    const ingredientIndex: Record<string, string[]> = {};
    const productIndex: Record<string, string[]> = {};

    uniqueRecipeNames.forEach((recipeName) => {
        const recipe = RecipeIndex[recipeName];
        nodes[recipeName] = {
            id: recipeName,
            type: "recipe",
            position: { x: 0, y: 0 },
            data: { recipe },
        };

        recipe.ingredients?.forEach(({ name: ingredient }) => {
            ingredientIndex[ingredient] = [
                ...(ingredientIndex[ingredient] || []),
                recipeName,
            ];
        });

        recipe.products?.forEach(({ name: product }) => {
            productIndex[product] = [
                ...(productIndex[product] || []),
                recipeName,
            ];
        });
    });

    const edges: Record<string, RFEdge> = {};

    Object.entries(ingredientIndex).forEach(([itemName, ingredientRecipes]) => {
        productIndex[itemName]?.forEach((productRecipe) => {
            ingredientRecipes.forEach((ingredientRecipe) => {
                const edge: RFEdge = {
                    id: `${productRecipe}.product.${itemName}-->${ingredientRecipe}.ingredient.${itemName}`,
                    source: productRecipe,
                    sourceHandle: `product.${itemName}`,
                    target: ingredientRecipe,
                    targetHandle: `ingredient.${itemName}`,
                    data: { label: itemName },
                };
                edges[edge.id] = edge;
            });
        });
    });

    return { nodes: Object.values(nodes), edges: Object.values(edges) };
};

const getFilteredRecipes = ({
    recipeSearchFilter,
}: {
    recipeSearchFilter: string;
}): string[] => {
    const recipeList = Object.values(RecipeIndex).map((recipe) => recipe.name);
    if (!recipeSearchFilter) return recipeList;

    return recipeList.filter((recipe) =>
        [
            recipe,
            ...(RecipeIndex[recipe]?.ingredients?.map(
                (ingredient) => ingredient.name
            ) || []),
            ...(RecipeIndex[recipe]?.products?.map((product) => product.name) ||
                []),
        ].some((key) => key.includes(recipeSearchFilter))
    );
};

type RecipeCounter = Record<string, number>;

const LayoutFlow = ({
    initialRecipeCounter = {},
}: {
    initialRecipeCounter?: RecipeCounter;
}) => {
    const [recipeCounter, setRecipeCounter] =
        useState<Record<string, number>>(initialRecipeCounter);
    const [nodes, setNodes, onNodesChange] = useNodesState<RFNodeProps>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isLayedOut, setIsLayedOut] = useState(false);
    const { fitView } = useReactFlow();

    useEffect(() => {
        if (!isLayedOut) {
            layoutNodes(recipesToReactFlow(Object.keys(recipeCounter)))
                .then(({ nodes: nextNodes, edges: nextEdges }) => {
                    setNodes(nextNodes);
                    setEdges(nextEdges);
                    setIsLayedOut(true);
                })
                .catch(console.warn);
        }
    }, [isLayedOut, recipeCounter, setNodes, setEdges]);

    useEffect(() => {
        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [nodes, fitView]);

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [recipeSearchFilter, setRecipeSearchFilter] = useState("");
    const [page, setPage] = useState(1);

    const options = useMemo(
        () =>
            getFilteredRecipes({ recipeSearchFilter }).slice(
                (page - 1) * 15,
                page * 15
            ),
        [page, recipeSearchFilter]
    );
    const theme = useTheme();

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Fab
                    color="primary"
                    onClick={() => setIsMenuVisible(true)}
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                >
                    <AddIcon fontSize="large" />
                </Fab>
            </ReactFlow>

            <Dialog
                open={isMenuVisible}
                onClose={() => setIsMenuVisible(false)}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>Choose Recipe(s)</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Search"
                        fullWidth
                        value={recipeSearchFilter}
                        onChange={(e) => setRecipeSearchFilter(e.target.value)}
                    />
                    <Divider
                        sx={{
                            mt: 4,
                            opacity: 0.6,
                            border: `0.5px solid ${theme.palette.primary.main}`,
                        }}
                    />
                    <Stack
                        direction="column"
                        spacing={1}
                        divider={
                            <Divider
                                sx={{
                                    opacity: 0.6,
                                    border: `0.5px solid ${theme.palette.primary.main}`,
                                }}
                            />
                        }
                        sx={{ width: "100%" }}
                    >
                        {options.map((option) => (
                            <Stack
                                direction="row"
                                key={option}
                                sx={{ width: "100%" }}
                            >
                                <Box flexGrow={1} width="25%">
                                    <Typography variant="subtitle1">
                                        {option}
                                    </Typography>
                                </Box>
                                <Box flexGrow={1} width="25%">
                                    <Stack
                                        direction="column"
                                        alignItems="flex-start"
                                    >
                                        {RecipeIndex[option].ingredients?.map(
                                            (item) => (
                                                <Typography
                                                    key={item.name}
                                                    variant="body2"
                                                >
                                                    {item.name}
                                                </Typography>
                                            )
                                        )}
                                    </Stack>
                                </Box>
                                <Box flexGrow={1} width="25%">
                                    <Stack
                                        direction="column"
                                        alignItems="flex-start"
                                    >
                                        {RecipeIndex[option].products?.map(
                                            (item) => (
                                                <Typography
                                                    key={item.name}
                                                    variant="body2"
                                                >
                                                    {item.name}
                                                </Typography>
                                            )
                                        )}
                                    </Stack>
                                </Box>
                                <Box flexGrow={1} width="25%">
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setRecipeCounter({
                                                ...recipeCounter,
                                                [option]: 1,
                                            });
                                            setIsMenuVisible(false);
                                            setIsLayedOut(false);
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function App() {
    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
                <ReactFlowProvider>
                    <LayoutFlow />
                </ReactFlowProvider>
            </Box>
        </ThemeProvider>
    );
}
