import { useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Settings, PlayCircle } from 'lucide-react';
import '@xyflow/react/dist/style.css';

import { AdminPage } from './components/AdminPage';
import { GuestPage } from './components/GuestPage';
import { initialNodes, initialEdges } from './data/initialFlow';
import type { AppNode, QuestionNodeData } from './types/flow.types';
import './App.css';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const location = useLocation();

  const onNodeUpdate = useCallback((nodeId: string, newData: Partial<QuestionNodeData>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onNodeDelete = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 overflow-hidden font-['Outfit']">
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-5 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Layout className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Flow Builder
            </h1>
            <p className="text-xs text-slate-500 font-medium">Enterprise Workflow Engine</p>
          </div>
        </div>

        <nav className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            Guest Runner
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              location.pathname === '/admin'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <Settings className="w-4 h-4" />
            Admin Editor
          </Link>
        </nav>
      </header>

      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <Routes location={location}>
              <Route
                path="/"
                element={<GuestPage nodes={nodes} edges={edges} />}
              />
              <Route
                path="/admin"
                element={
                  <AdminPage
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    setNodes={setNodes}
                    setEdges={setEdges}
                    onNodeUpdate={onNodeUpdate}
                    onNodeDelete={onNodeDelete}
                  />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;