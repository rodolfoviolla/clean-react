import { faker } from '@faker-js/faker'

import { SurveyModel } from '@/domain/models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    { answer: faker.random.words(), image: faker.internet.url() },
    { answer: faker.random.words(), image: faker.internet.url() }
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyModelList = (): SurveyModel[] => Array.from({ length: 3 }, mockSurveyModel)
