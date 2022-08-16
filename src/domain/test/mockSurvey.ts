import { faker } from '@faker-js/faker'

import { LoadSurveyList } from '@/domain/useCases'

export const mockSurveyModel = (
  date = faker.date.recent(),
  didAnswer = faker.datatype.boolean()
): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  date,
  didAnswer
})

export const mockSurveyModelList = (length = 1): LoadSurveyList.Model[] => {
  return Array.from({ length }, () => mockSurveyModel())
}
