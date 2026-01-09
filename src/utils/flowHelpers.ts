import { Position } from '@xyflow/react';

/**
 * Generate a unique ID for nodes and edges
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get node position helpers
 */
export const getHandlePosition = (nodeType: string): {
  source: Position;
  target: Position;
} => {
  switch (nodeType) {
    case 'start':
      return { source: Position.Bottom, target: Position.Top };
    case 'end':
      return { source: Position.Bottom, target: Position.Top };
    default:
      return { source: Position.Bottom, target: Position.Top };
  }
};
