import type { Edge } from '@xyflow/react';
import type { AppNode } from '../types/flow.types';

// SDE Interview Q&A Flow
export const initialNodes: AppNode[] = [
  {
    id: 'q1',
    type: 'question',
    position: { x: 250, y: 50 },
    data: {
      question: 'What is your experience level with software development?',
      answers: [
        { id: 'a1', text: '0-2 years (Junior)', nextQuestionId: 'q2' },
        { id: 'a2', text: '2-5 years (Mid-level)', nextQuestionId: 'q3' },
        { id: 'a3', text: '5+ years (Senior)', nextQuestionId: 'q4' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q2',
    type: 'question',
    position: { x: 100, y: 250 },
    data: {
      question: 'Which programming language are you most comfortable with?',
      answers: [
        { id: 'a4', text: 'JavaScript/TypeScript', nextQuestionId: 'q5' },
        { id: 'a5', text: 'Python', nextQuestionId: 'q5' },
        { id: 'a6', text: 'Java', nextQuestionId: 'q5' },
        { id: 'a7', text: 'C++', nextQuestionId: 'q5' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q3',
    type: 'question',
    position: { x: 400, y: 250 },
    data: {
      question: 'Have you worked with cloud platforms?',
      answers: [
        { id: 'a8', text: 'Yes, AWS', nextQuestionId: 'q6' },
        { id: 'a9', text: 'Yes, Azure', nextQuestionId: 'q6' },
        { id: 'a10', text: 'Yes, GCP', nextQuestionId: 'q6' },
        { id: 'a11', text: 'No cloud experience', nextQuestionId: 'q6' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q4',
    type: 'question',
    position: { x: 700, y: 250 },
    data: {
      question: 'Do you have experience leading technical teams?',
      answers: [
        { id: 'a12', text: 'Yes, led multiple teams', nextQuestionId: 'q6' },
        { id: 'a13', text: 'Yes, led small team', nextQuestionId: 'q6' },
        { id: 'a14', text: 'No leadership experience', nextQuestionId: 'q6' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q5',
    type: 'question',
    position: { x: 100, y: 450 },
    data: {
      question: 'Are you familiar with data structures and algorithms?',
      answers: [
        { id: 'a15', text: 'Very comfortable', nextQuestionId: 'q7' },
        { id: 'a16', text: 'Somewhat familiar', nextQuestionId: 'q7' },
        { id: 'a17', text: 'Need to learn more', nextQuestionId: 'q7' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q6',
    type: 'question',
    position: { x: 550, y: 450 },
    data: {
      question: 'What type of projects have you worked on?',
      answers: [
        { id: 'a18', text: 'Web Applications', nextQuestionId: 'q7' },
        { id: 'a19', text: 'Mobile Apps', nextQuestionId: 'q7' },
        { id: 'a20', text: 'Backend Systems', nextQuestionId: 'q7' },
        { id: 'a21', text: 'Full Stack', nextQuestionId: 'q7' },
      ],
      isAnswered: false,
    },
  },
  {
    id: 'q7',
    type: 'question',
    position: { x: 325, y: 650 },
    data: {
      question: 'When can you start if selected?',
      answers: [
        { id: 'a22', text: 'Immediately', nextQuestionId: null },
        { id: 'a23', text: 'Within 2 weeks', nextQuestionId: null },
        { id: 'a24', text: 'Within 1 month', nextQuestionId: null },
        { id: 'a25', text: 'Need to discuss', nextQuestionId: null },
      ],
      isAnswered: false,
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'q1', sourceHandle: 'a1', target: 'q2', animated: true },
  { id: 'e1-3', source: 'q1', sourceHandle: 'a2', target: 'q3', animated: true },
  { id: 'e1-4', source: 'q1', sourceHandle: 'a3', target: 'q4', animated: true },
  { id: 'e2-5', source: 'q2', sourceHandle: 'a4', target: 'q5', animated: true },
  { id: 'e2-5b', source: 'q2', sourceHandle: 'a5', target: 'q5', animated: true },
  { id: 'e3-6', source: 'q3', sourceHandle: 'a8', target: 'q6', animated: true },
];
