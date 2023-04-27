import { Button } from '@mui/material'

export const Start = () => {
  return (
    <Button onClick={() => console.log('clicked')} variant='contained'>
      Start
    </Button>
  )
}
