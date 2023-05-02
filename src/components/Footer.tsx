import { useQuestionsData } from '../Hooks/useQuetionsData'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`👍 ${correct} ❗ ${incorrect} ❓ ${unanswered}`}</strong>
    </footer>
  )
}
