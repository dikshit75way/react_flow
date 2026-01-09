import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  type Connection,
} from '@xyflow/react';
import { Plus } from 'lucide-react';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import type { AdminPageProps, AppNode } from '../types/flow.types';

export function AdminPage({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges,
  onNodeUpdate,
  onNodeDelete,
}: AdminPageProps) {
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const addQuestion = () => {
    const id = `q${Date.now()}`;
    const newNode: AppNode = {
      id,
      type: 'question',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        question: '',
        answers: [],
        mode: 'admin',
        onNodeUpdate: onNodeUpdate,
        onNodeDelete: onNodeDelete
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const adminNodes = nodes.map((n) => ({
    ...n,
    data: { 
      ...n.data, 
      mode: 'admin',
      onNodeUpdate: onNodeUpdate,
      onNodeDelete: onNodeDelete
    }
  }));

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-6 left-6 z-10 flex gap-3">
        <button 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-95 group"
          onClick={addQuestion}
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add Question
        </button>
      </div>

      <ReactFlow
        nodes={adminNodes as any}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes as any}
        edgeTypes={edgeTypes as any}
        fitView
        className="bg-slate-50"
      >
        <Controls />
        <MiniMap 
          className="!bg-white !rounded-xl !border !border-slate-200 !shadow-lg"
          maskColor="rgba(241, 245, 249, 0.6)"
        />
        <Background color="#cbd5e1" gap={20} />
      </ReactFlow>
    </div>
  );
}
