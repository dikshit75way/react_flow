import type { Node, OnNodesChange, OnEdgesChange } from '@xyflow/react';

export interface Answer {
  id: string;
  text: string;
  nextQuestionId?: string | null;
}

export interface QuestionNodeData {
  question: string;
  answers: Answer[];
  isAnswered?: boolean;
  selectedAnswerId?: string;
  mode?: 'admin' | 'guest';
  // Admin Callbacks
  onNodeUpdate?: (nodeId: string, newData: Partial<QuestionNodeData>) => void;
  onNodeDelete?: (nodeId: string) => void;
  // Allow index signature for React Flow compatibility
  [key: string]: unknown;
}

export interface AnswerNodeData {
  answer: string;
  [key: string]: unknown;
}

export interface EndNodeData {
  title: string;
  message: string;
  [key: string]: unknown;
}

export type AppNode = Node<QuestionNodeData | AnswerNodeData | EndNodeData>;

export interface AdminPageProps {
  nodes: AppNode[];
  edges: any[]; // Using any for edges for now as they are standard
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  setNodes: React.Dispatch<React.SetStateAction<AppNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
  onNodeUpdate: (nodeId: string, newData: Partial<QuestionNodeData>) => void;
  onNodeDelete: (nodeId: string) => void;
}

export interface GuestPageProps {
  nodes: AppNode[];
  edges: any[];
}
