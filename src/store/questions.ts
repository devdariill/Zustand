import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types.d'
// extension redux devtools chrome

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  reset: () => void
}

const logger = (config) => (set: any, get: any, api: any) => {
  return config(
    (...args) => {
      console.log('--------')
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    // set,
    get,
    api
  )
}

export const useQuestionsStore = create<State>()(devtools(logger(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      // const data = getAllQuestions()
      const res = await fetch('http://localhost:5173/data.json')
      const data = await res.json()
      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions }, false, 'FETCH_QUESTIONS')
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // const state = get() // get().questions
      const newQuestions = structuredClone(questions)

      const quesionIndex = newQuestions.findIndex((q: Question) => q.id === questionId)
      const questionInfo = newQuestions[quesionIndex]

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectUserAnswer) confetti()
      newQuestions[quesionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      set({ questions: newQuestions }, false, 'SELECT_ANSWER')
    },
    goToNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'GO_TO_NEXT_QUESTION')
      }
    },
    goToPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false, 'GO_TO_PREVIOUS_QUESTION')
      }
    },
    reset: () => {
      set({ questions: [], currentQuestion: 0 })
    }
  }
}, {
  name: 'questions'
  // getStorage: localStorage // default
  // getStorage: sessionStorage
}))))
