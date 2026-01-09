import { memo, useState } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow
} from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { Trash2 } from 'lucide-react';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = useState(false);
  const { deleteElements } = useReactFlow();

  return (
    <>
      <BaseEdge 
        id={id} 
        path={edgePath} 
        markerEnd={markerEnd} 
        className={`!stroke-[3px] transition-all duration-300 ${isHovered ? '!stroke-indigo-400' : '!stroke-slate-200'}`} 
      />
      {/* Animated layer */}
      <BaseEdge 
        path={edgePath} 
        className="!stroke-indigo-400 !stroke-[2px] [stroke-dasharray:10,20] [animation:edge-flow_30s_linear_infinite]" 
        style={{ opacity: isHovered ? 0.8 : 0.4 }}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all duration-200 shadow-sm
              ${isHovered 
                ? 'bg-rose-50 border-rose-200 text-rose-600 scale-110 cursor-pointer' 
                : 'bg-white border-slate-100 text-slate-500'}
            `}
            onClick={(e) => {
              if (isHovered) {
                e.stopPropagation();
                deleteElements({ edges: [{ id }] });
              }
            }}
            >
              {isHovered ? (
                <div className="flex items-center gap-1">
                  <Trash2 className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Delete</span>
                </div>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest">{data?.label as string}</span>
              )}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(CustomEdge);
