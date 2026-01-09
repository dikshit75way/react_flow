import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, RotateCcw, HelpCircle, MessageSquare } from 'lucide-react';
import type { GuestPageProps, Answer, QuestionNodeData } from '../types/flow.types';

export function GuestPage({ nodes, edges }: GuestPageProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(() => {
    return nodes.length > 0 ? nodes[0].id : null;
  });

  const [history, setHistory] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = useMemo(() => {
    return nodes.find((n) => n.id === currentQuestionId);
  }, [nodes, currentQuestionId]);

  const handleAnswerClick = (answerId: string) => {
    if (isTransitioning) return;
    
    setSelectedAnswerId(answerId);
    setIsTransitioning(true);

    const edge = edges.find(
      (e) => e.source === currentQuestionId && e.sourceHandle === answerId
    );

    setTimeout(() => {
      if (edge?.target) {
        setHistory((prev) => [...prev, currentQuestionId!]);
        setCurrentQuestionId(edge.target);
      } else {
        setCompleted(true);
      }
      setSelectedAnswerId(null);
      setIsTransitioning(false);
    }, 600);
  };

  const handleRestart = () => {
    setCurrentQuestionId(nodes.length > 0 ? nodes[0].id : null);
    setHistory([]);
    setCompleted(false);
    setSelectedAnswerId(null);
    setIsTransitioning(false);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQuestionId(prev);
    }
  };

  if (completed) {
    return (
      <div className="flex h-full items-center justify-center p-6 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl shadow-indigo-100 border border-slate-100 text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Success!</h2>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">
            You have successfully completed the workflow. Your responses have been processed.
          </p>
          <button 
            className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 group"
            onClick={handleRestart}
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Restart Process
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-slate-400 font-bold flex flex-col items-center gap-4">
          <HelpCircle className="w-12 h-12" />
          No path available.
        </div>
      </div>
    );
  }

  // Cast data to QuestionNodeData for the runner
  const data = currentQuestion.data as QuestionNodeData;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex max-w-4xl mx-auto w-full p-8 md:p-16">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-indigo-600 font-black tracking-[0.2em] text-[10px] uppercase font-outfit">
                  <div className="h-[6px]  w-8 bg-indigo-600" />
                  Step {history.length + 1} of Workflow
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black text-slate-800 font-outfit tracking-tight">
                  {data.question}
                </h1>
              </div>

              <div className="grid gap-3">
                {data.answers?.map((answer: Answer) => (
                  <motion.button
                    key={answer.id}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(answer.id)}
                    disabled={isTransitioning}
                    className={`group flex items-center justify-between p-6 bg-white border-2 rounded-2xl transition-all duration-300
                      ${selectedAnswerId === answer.id 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-600/10' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md'}
                    `}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                        ${selectedAnswerId === answer.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}
                      `}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className={`text-lg font-bold font-outfit ${selectedAnswerId === answer.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {answer.text}
                      </span>
                    </div>
                    
                    {selectedAnswerId === answer.id ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      </motion.div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-8 border-t border-slate-100 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            disabled={history.length === 0 || isTransitioning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <div className="flex gap-1.5">
            {history.map((_, i) => (
              <div key={i} className="w-8 h-1 bg-indigo-600 rounded-full" />
            ))}
            <div className="w-8 h-1 bg-indigo-200 rounded-full" />
          </div>
        </div>

        <button 
          onClick={handleRestart}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl transition-all active:scale-95"
          title="Restart Workflow"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
