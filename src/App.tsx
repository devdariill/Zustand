import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { Start } from './Start'
import { JavaScriptLogo } from './components/JavaScript'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <p>Questions</p>}
      </Container>
    </main>
  )
}

export default App
