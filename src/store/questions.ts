import { create } from 'zustand'
import { type Question } from '../types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}
export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      set({
        questions: [

          {
            id: 1,
            question: '¿Cuál es la salida de este código?',
            code: 'console.log(typeof NaN)',
            answers: [
              'undefined',
              'NaN',
              'string',
              'number'
            ],
            correctAnswer: 3
          }

        ]
      })
    }
  }
})
