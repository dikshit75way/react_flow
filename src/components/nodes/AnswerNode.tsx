import { memo } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { CheckCircle, Trash2 } from 'lucide-react';
import type { AnswerNodeData, AppNode } from '../../types/flow.types';

const AnswerNode = ({ data, selected, id }: NodeProps<AppNode>) => {
  // Narrowing the type to AnswerNodeData
  const nodeData = data as AnswerNodeData;
  const { deleteElements } = useReactFlow();

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative rounded-2xl border transition-all duration-500 shadow-xl px-6 py-5 min-w-[220px]
        ${selected ? 'border-emerald-400 ring-8 ring-emerald-500/10 bg-emerald-50/80 shadow-emerald-100 scale-105' : 'border-emerald-100/50 bg-white/90 hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-1'}
      `}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-white !shadow-sm" 
      />
      
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-md shadow-emerald-200">
          <CheckCircle className="w-4 h-4" />
        </div>
        
        <div className="flex-1">
          <label className="text-[10px] font-bold text-emerald-600/50 uppercase tracking-wider block mb-0.5">Response</label>
          <div className="text-sm font-black text-emerald-900 leading-tight">
            {nodeData.answer}
          </div>
        </div>

        {selected && (
          <button
            className="absolute -top-3 -right-3 bg-rose-500 text-white p-2 rounded-full shadow-xl hover:bg-rose-600 transition-all hover:scale-110 active:scale-90 z-50 border-2 border-white"
            onClick={(e) => {
              e.stopPropagation();
              deleteElements({ nodes: [{ id }] });
            }}
            title="Delete Node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-emerald-600 !border-2 !border-white !shadow-sm" 
      />
    </motion.div>
  );
};

export default memo(AnswerNode);
