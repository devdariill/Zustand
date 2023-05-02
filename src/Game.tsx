import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types.d'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  const getBackgroundColor = (info: QuestionType, index: number) => {
  // const getBackgroundColor = ({ info, index }: { index: number, info: QuestionType }) => {
    const { userSelectedAnswer, correctAnswer } = info
    if (userSelectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === userSelectedAnswer) return 'red'
    return 'transparent'
  }
  return (
    <Card variant='outlined' sx={{ textAlign: 'left', p: 2, marginTop: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
