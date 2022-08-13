import { faker } from '@faker-js/faker'

import { SurveyModel } from '@/domain/models'

export const mockSurveyModel = (date = faker.date.recent(), didAnswer = faker.datatype.boolean()): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    { answer: faker.random.words(), image: faker.internet.url() },
    { answer: faker.random.words(), image: faker.internet.url() }
  ],
  date,
  didAnswer
})

export const mockSurveyModelList = (): SurveyModel[] => Array.from({ length: 3 }, () => mockSurveyModel())
