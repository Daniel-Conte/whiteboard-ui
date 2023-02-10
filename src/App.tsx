import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/nodes/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefaultEdge";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square", // NODE_TYPE
    data: {}, // O que o componente atribuído ao node type receberá em props.data
    position: {
      x: 200,
      y: 400,
    },
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    data: {},
    position: {
      x: 1000,
      y: 400,
    },
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((currEdges) => addEdge(connection, currEdges)),
    []
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ type: "default" }}
      >
        <Background gap={12} size={2} color={zinc[200]} />

        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
