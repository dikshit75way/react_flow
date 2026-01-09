import QuestionNode from './QuestionNode';
import AnswerNode from './AnswerNode';
import EndNode from './EndNode';

export { QuestionNode, AnswerNode, EndNode };

export const nodeTypes = {
  question: QuestionNode,
  answer: AnswerNode,
  end: EndNode,
};
