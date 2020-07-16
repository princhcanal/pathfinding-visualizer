export type Vertex = { node: number; weight: number; x: number; y: number };
export type Distances = { [key: string]: number };
export type Previous = { [key: string]: number };
export type AdjacencyList = { [key: string]: Vertex[] };
export type PathfindingAnimation = { index: number; state: string };
