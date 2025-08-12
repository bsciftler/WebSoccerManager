import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeTypes,
  EdgeTypes,
  OnNodesDelete,
  OnEdgesDelete,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Event, GraphNode, GraphEdge, NodeType } from '../types';
import { EventNode } from './nodes/EventNode';
import { KnotNode } from './nodes/KnotNode';
import { GroupNode } from './nodes/GroupNode';

interface GraphEditorProps {
  events: Event[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onNodeDoubleClick?: (nodeId: string) => void;
}

const nodeTypes: NodeTypes = {
  event: EventNode,
  knot: KnotNode,
  group: GroupNode,
};

export const GraphEditor: React.FC<GraphEditorProps> = ({
  events,
  onSelectionChange,
  onNodeDoubleClick,
}) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // Convert events to React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    return events.map((event, index) => ({
      id: event.id,
      type: 'event' as NodeType,
      position: { x: index * 200, y: index * 100 },
      data: { event },
      selected: false,
    }));
  }, [events]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const newSelected = selectedNodes.includes(node.id)
        ? selectedNodes.filter(id => id !== node.id)
        : [...selectedNodes, node.id];
      
      setSelectedNodes(newSelected);
      onSelectionChange?.(newSelected);
    },
    [selectedNodes, onSelectionChange]
  );

  const onNodeDoubleClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeDoubleClick?.(node.id);
    },
    [onNodeDoubleClick]
  );

  const onSelectionChangeHandler = useCallback(
    (elements: { nodes: Node[]; edges: Edge[] }) => {
      const selectedIds = elements.nodes.map(node => node.id);
      setSelectedNodes(selectedIds);
      onSelectionChange?.(selectedIds);
    },
    [onSelectionChange]
  );

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClickHandler}
        onSelectionChange={onSelectionChangeHandler}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
