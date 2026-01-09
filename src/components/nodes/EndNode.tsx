import { memo } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Trophy, Trash2, Home } from 'lucide-react';
import type { EndNodeData, AppNode } from '../../types/flow.types';

const EndNode = ({ data, selected, id }: NodeProps<AppNode>) => {
  const nodeData = data as EndNodeData;
  const { deleteElements } = useReactFlow();

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative rounded-3xl border transition-all duration-500 shadow-2xl px-8 py-6 min-w-[240px] text-center
        ${selected ? 'border-indigo-400 ring-8 ring-indigo-500/10 bg-indigo-50/80' : 'border-indigo-100 bg-white/90'}
      `}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white !shadow-sm" 
      />
      
      <div className="flex flex-col items-center gap-3">
        <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-200">
          <Trophy className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-indigo-600/50 uppercase tracking-[0.2em] block">Workflow End</label>
          <div className="text-lg font-black text-slate-900 leading-tight">
            {nodeData.title || 'Completed'}
          </div>
          <div className="text-[10px] font-bold text-slate-400 max-w-[180px]">
            {nodeData.message || 'Users reach this point to finish the flow.'}
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
      
      <div className="mt-4 flex justify-center opacity-20">
         <Home className="w-4 h-4 text-indigo-300" />
      </div>
    </motion.div>
  );
};

export default memo(EndNode);
