export const getAllQuestions = async (limit: number) => {
  const res = await fetch('http://localhost:5173/data.json')
  return await res.json()
}
