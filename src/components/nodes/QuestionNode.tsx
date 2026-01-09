import { memo, useCallback, type ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { HelpCircle, Trash2, PlusCircle, AlignLeft } from 'lucide-react';
import type { QuestionNodeData, Answer, AppNode } from '../../types/flow.types';

const QuestionNode = ({ id, data, selected }: NodeProps<AppNode>) => {
  // Narrowing the type to QuestionNodeData
  const nodeData = data as QuestionNodeData;
  const isAdmin = nodeData.mode === 'admin';

  const onQuestionChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    nodeData.onNodeUpdate?.(id, { question: evt.target.value });
  }, [id, nodeData.onNodeUpdate]);

  const onAnswerChange = useCallback((answerId: string, text: string) => {
    const newAnswers = nodeData.answers.map((a: Answer) => 
      a.id === answerId ? { ...a, text } : a
    );
    nodeData.onNodeUpdate?.(id, { answers: newAnswers });
  }, [id, nodeData.answers, nodeData.onNodeUpdate]);

  const addAnswer = useCallback(() => {
    const newAnswerId = `a-${Date.now()}`;
    const newAnswers = [
      ...(nodeData.answers || []),
      { id: newAnswerId, text: '' }
    ];
    nodeData.onNodeUpdate?.(id, { answers: newAnswers });
  }, [id, nodeData.answers, nodeData.onNodeUpdate]);

  const removeNode = useCallback(() => {
    nodeData.onNodeDelete?.(id);
  }, [id, nodeData.onNodeDelete]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`group relative rounded-2xl border transition-all duration-500 overflow-visible
        ${selected ? 'border-indigo-400 ring-8 ring-indigo-500/10 premium-shadow' : 'border-slate-200/60 shadow-xl'}
        ${isAdmin ? 'w-[300px] bg-white' : 'w-[450px] p-8 glass-card'}
      `}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target" 
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white !shadow-sm" 
      />
      
      {isAdmin && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-1 rounded-full shadow-lg border-2 border-white">
          <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Decision
          </span>
        </div>
      )}
      
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="bg-slate-100 p-2 rounded-xl text-slate-600 shrink-0">
            <AlignLeft className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Question Path</label>
            {isAdmin ? (
              <textarea 
                className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 transition-all resize-none leading-relaxed" 
                value={nodeData.question} 
                onChange={onQuestionChange}
                placeholder="Type your question here..."
                rows={2}
              />
            ) : (
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{nodeData.question}</h2>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Options</span>
          </div>

          <div className="flex flex-col gap-2">
            {nodeData.answers?.map((answer: Answer) => (
              <div key={answer.id} className="relative group/answer">
                {isAdmin ? (
                  <div className="flex items-center gap-2">
                    <input 
                      className="flex-1 bg-slate-50 border-none rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 transition-all" 
                      value={answer.text} 
                      onChange={(e) => onAnswerChange(answer.id, e.target.value)}
                      placeholder="Answer option..."
                    />
                  </div>
                ) : (
                  <div className="w-full text-left bg-white border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 rounded-xl px-5 py-3.5 transition-all duration-200 group-hover:scale-[1.02] shadow-sm">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{answer.text}</span>
                  </div>
                )}
                
                {isAdmin && (
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={answer.id}
                    className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white !shadow-sm !-right-2 hover:!scale-150 transition-transform"
                  />
                )}
              </div>
            ))}
          </div>

          {isAdmin && (
              <div className="flex flex-row justify-center  items-center gap-2 mt-2 pt-2 border-t border-slate-100">
              <button 
                className="flex items-center  w-full  justify-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 rounded-lg text-[15px] font-black uppercase transition-all active:scale-95" 
                onClick={addAnswer}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Option
              </button>
            </div>
          )}
        </div>
      </div>

      {isAdmin && selected && (
        <button
          className="absolute -top-3 -right-3 bg-rose-500 text-white p-2 rounded-full shadow-xl hover:bg-rose-600 transition-all hover:scale-110 active:scale-90 z-50 border-2 border-white"
          onClick={(e) => {
            e.stopPropagation();
            removeNode();
          }}
          title="Delete Node"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      
      {isAdmin && (!nodeData.answers || nodeData.answers.length === 0) && (
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="default-source" 
            className="!w-4 !h-4 !bg-indigo-600 !border-2 !border-white !shadow-md" 
          />
      )}
    </motion.div>
  );
};

export default memo(QuestionNode);
