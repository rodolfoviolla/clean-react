type Answer = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  question: string
  answer: Answer[]
  date: Date
  didAnswer: boolean
}
