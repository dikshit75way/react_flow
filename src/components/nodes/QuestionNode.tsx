import { memo, useCallback, type ChangeEvent } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { HelpCircle, Trash2, PlusCircle, AlignLeft } from 'lucide-react';
import type { QuestionNodeData, Answer, AppNode } from '../../types/flow.types';

const QuestionNode = ({ id, data, selected }: NodeProps<AppNode>) => {
  const nodeData = data as QuestionNodeData;
  const isAdmin = nodeData.mode === 'admin';

  const onQuestionChange = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement>) => {
      nodeData.onNodeUpdate?.(id, { question: evt.target.value });
    },
    [id, nodeData.onNodeUpdate]
  );

  const onAnswerChange = useCallback(
    (answerId: string, text: string) => {
      const newAnswers = nodeData.answers.map((a: Answer) =>
        a.id === answerId ? { ...a, text } : a
      );
      nodeData.onNodeUpdate?.(id, { answers: newAnswers });
    },
    [id, nodeData.answers, nodeData.onNodeUpdate]
  );

  const addAnswer = useCallback(() => {
    const newAnswerId = `a-${Date.now()}`;
    const newAnswers = [...(nodeData.answers || []), { id: newAnswerId, text: '' }];
    nodeData.onNodeUpdate?.(id, { answers: newAnswers });
  }, [id, nodeData.answers, nodeData.onNodeUpdate]);

  const removeNode = useCallback(() => {
    nodeData.onNodeDelete?.(id);
  }, [id, nodeData.onNodeDelete]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`group relative rounded-2xl border transition-all duration-500
        ${selected ? 'border-indigo-400 ring-8 ring-indigo-500/10' : 'border-slate-200/60 shadow-xl'}
        ${isAdmin ? 'min-w-[400px] max-w-[600px] bg-white' : 'min-w-[500px] max-w-[800px] p-8 glass-card'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white"
      />

      {isAdmin && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-1 rounded-full border-2 border-white">
          <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Decision
          </span>
        </div>
      )}

      <div className="flex flex-col gap-5 p-5">

        {/* ===== HEADER (ICON + LABEL) ===== */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-xl text-slate-600 shrink-0">
            <AlignLeft className="w-5 h-5" />
          </div>

          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-outfit">
            Question Path
          </label>
        </div>

        {/* ===== QUESTION (FULL WIDTH) ===== */}
        <div className="w-full">
          {isAdmin ? (
            <textarea
              className="w-full bg-slate-50 rounded-xl p-4 text-sm font-bold text-slate-800
                         placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500
                         resize-none leading-relaxed font-outfit"
              value={nodeData.question}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
                onQuestionChange(e);
              }}
              onFocus={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Type your question here..."
            />
          ) : (
            <h2 className="text-2xl font-black text-slate-900 leading-tight font-outfit break-words">
              {nodeData.question}
            </h2>
          )}
        </div>

        {/* ===== ANSWERS ===== */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-outfit">
            Available Options
          </span>

          {nodeData.answers?.map((answer: Answer) => (
            <div key={answer.id} className="relative">
              {isAdmin ? (
                <input
                  className="w-full bg-slate-50 rounded-lg px-4 py-2.5 text-xs font-semibold
                             text-slate-700 focus:ring-2 focus:ring-indigo-500"
                  value={answer.text}
                  onChange={(e) => onAnswerChange(answer.id, e.target.value)}
                  placeholder="Answer option..."
                />
              ) : (
                <div className="w-full bg-white border-2 border-slate-100 hover:border-indigo-500
                                hover:bg-indigo-50 rounded-xl px-5 py-3.5 transition-all">
                  <span className="text-sm font-bold text-slate-700">
                    {answer.text}
                  </span>
                </div>
              )}

              {isAdmin && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={answer.id}
                  className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white !-right-2"
                />
              )}
            </div>
          ))}

          {isAdmin && (
            <button
              className="mt-3 flex items-center justify-center gap-1 w-full bg-indigo-50
                         hover:bg-indigo-100 text-indigo-600 py-2 rounded-lg
                         text-[15px] font-black uppercase"
              onClick={addAnswer}
            >
              <PlusCircle className="w-4 h-4" />
              Option
            </button>
          )}
        </div>
      </div>

      {isAdmin && selected && (
        <button
          className="absolute -top-3 -right-3 bg-rose-500 text-white p-2 rounded-full
                     hover:bg-rose-600 border-2 border-white"
          onClick={(e) => {
            e.stopPropagation();
            removeNode();
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default memo(QuestionNode);
