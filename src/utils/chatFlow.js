// src/utils/chatFlow.js
export const questions = [
  { 
    id: "help_type",
    text: "Como posso te ajudar hoje? (Digite 'Dúvida' ou 'Treino')",
    validate: (answer) => ["dúvida", "treino"].includes(answer.toLowerCase())
  },
  { 
    id: "gender",
    text: "Qual seu gênero? (Masculino/Feminino/Outro)",
    validate: (answer) => answer.trim().length > 0
  },
  { 
    id: "age",
    text: "Qual sua idade?",
    validate: (answer) => !isNaN(answer) && parseInt(answer) > 0
  },
  // ... outras perguntas
];

export function getNextQuestion(currentStep) {
  return questions[currentStep];
}