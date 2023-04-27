import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { Start } from './Start'
import { JavaScriptLogo } from './components/JavaScript'

function App () {
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>
        <Start />
      </Container>
    </main>
  )
}

export default App
