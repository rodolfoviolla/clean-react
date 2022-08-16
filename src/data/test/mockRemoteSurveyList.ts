import { faker } from '@faker-js/faker'

import { RemoteLoadSurveyList } from '@/data/useCases'

export const mockRemoteSurveyModel = (
  date = faker.date.recent().toISOString(),
  didAnswer = faker.datatype.boolean()
): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  date,
  didAnswer
})

export const mockRemoteSurveyModelList = (length = 1): RemoteLoadSurveyList.Model[] => {
  return Array.from({ length }, () => mockRemoteSurveyModel())
}
