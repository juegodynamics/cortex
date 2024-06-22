import ELK, {
    ElkNode,
    ElkExtendedEdge as ElkEdge,
    LayoutOptions,
} from "elkjs/lib/elk.bundled.js";
import {
    FactoryEdgeProps,
    FactoryNodeProps,
    getEdgeString,
    FactoryNodes,
    FactoryEdges,
} from "../lib/factory";
import React, { useCallback } from "react";
import ReactFlow, {
    Node as RFNode,
    Edge as RFEdge,
    ReactFlowProvider,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
    NodeProps,
    Handle,
    Position,
    HandleType,
    Background,
    BackgroundVariant,
    useViewport,
    useUpdateNodeInternals,
} from "reactflow";

import "reactflow/dist/style.css";
import { Box, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { DarkTheme } from "../theme";
import "./Factory.css";
import { GlassSurface } from "../components/surfaces/GlassSurface";

const elk = new ELK();

const NODE_WIDTH = 300;

const getNodeHeight = (facNode: FactoryNodeProps) =>
    16 + 20 * Math.max(facNode.ingredients.length, facNode.products.length);

const factoryNodeToSize = (facNode: FactoryNodeProps) => ({
    width: NODE_WIDTH,
    height: getNodeHeight(facNode),
});

const factoryNodeToRFNode = (
    facNode: FactoryNodeProps
): RFNode<FactoryNodeProps> => ({
    id: facNode.name,
    data: facNode,
    position: { x: 0, y: 0 },
    type: "factory",
    ...factoryNodeToSize(facNode),
});

const factoryEdgeToRFEdge = (
    facEdge: FactoryEdgeProps
): RFEdge<FactoryEdgeProps> => ({
    id: getEdgeString(facEdge),
    source: facEdge.start.node,
    sourceHandle: facEdge.start.port,
    target: facEdge.end.node,
    targetHandle: facEdge.end.port,
    data: facEdge,
});

const layoutNodes = async ({
    nodes: rfNodes,
    edges: rfEdges,
}: {
    nodes: RFNode<FactoryNodeProps>[];
    edges: RFEdge<FactoryEdgeProps>[];
}): Promise<{
    nodes: RFNode<FactoryNodeProps>[];
    edges: RFEdge<FactoryEdgeProps>[];
}> => {
    const layoutOptions: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "100",
        "elk.spacing.nodeNode": "80",
    };

    const graph: ElkNode = {
        id: "root",
        layoutOptions: layoutOptions,
        children: rfNodes.map(
            (rfNode: RFNode): ElkNode => ({
                id: rfNode.id,
                width: rfNode.width || 300,
                height: rfNode.height || getNodeHeight(rfNode.data),
                // TODO: Ports?
            })
        ),
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

const initialNodes = FactoryNodes.map((facNode) =>
    factoryNodeToRFNode(facNode)
);
const initialEdges = FactoryEdges.map((facEdge) =>
    factoryEdgeToRFEdge(facEdge)
);

const FactoryNodeComponent = (props: NodeProps<FactoryNodeProps>) => {
    // const nodeObserverRef = React.useRef<HTMLDivElement>(null)
    const updateNodeInternals = useUpdateNodeInternals();
    React.useEffect(() => {
        updateNodeInternals(props.id);
    }, []);

    return (
        <div>
            {props.data.ingredients.map((ingredient, ingredientIndex) => (
                <Handle
                    key={ingredient}
                    id={ingredient}
                    position={Position.Left}
                    type={"target"}
                    style={{
                        top: 11 + 16 * ingredientIndex,
                        left: -16,
                        // transform: `translate(0,${16 * ingredientIndex}px)`,
                    }}
                />
            ))}

            <GlassSurface
                minHeight={`${16 * Math.max(props.data.ingredients.length, props.data.products.length)}px`}
                sx={{
                    p: 1,

                    // height: `${getNodeHeight(props.data)}px`
                }}
            >
                {props.data.name}
            </GlassSurface>

            {props.data.products.map((product, productIndex) => (
                <Handle
                    key={product}
                    id={product}
                    position={Position.Right}
                    type={"source"}
                    style={{
                        top: 11 + 16 * productIndex,
                        right: -16,
                        // transform: `translate(0,${16 * productIndex}px)`,
                    }}
                />
            ))}
        </div>
    );
};

const nodeTypes = {
    factory: FactoryNodeComponent,
};

const LayoutFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [isLayedOut, setIsLayedOut] = React.useState(false);

    const { fitView } = useReactFlow();

    React.useEffect(() => {
        if (!isLayedOut) {
            layoutNodes({ nodes, edges })
                .then(({ nodes: nextNodes, edges: nextEdges }) => {
                    setNodes(nextNodes);
                    setEdges(nextEdges);
                    setIsLayedOut(true);
                })
                .catch((e) => console.warn(e));
        }
    }, [isLayedOut]);

    React.useEffect(() => {
        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [nodes, fitView]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            {/* <Background variant={BackgroundVariant.Cross} /> */}
        </ReactFlow>
    );
};

export default function () {
    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <ReactFlowProvider>
                    <LayoutFlow />
                </ReactFlowProvider>
            </Box>
        </ThemeProvider>
    );
}
