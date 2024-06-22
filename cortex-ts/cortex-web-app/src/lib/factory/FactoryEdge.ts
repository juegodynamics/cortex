export interface PortPointer {
    node: string;
    port: string;
}

export interface FactoryEdgeProps {
    start: PortPointer;
    end: PortPointer;
}

export const getEdgeString = (edge: FactoryEdgeProps): string =>
    JSON.stringify(edge);
