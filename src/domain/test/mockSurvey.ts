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

export const mockSurveyModelList = (length: number): LoadSurveyList.Model[] => {
  return Array.from({ length }, () => mockSurveyModel())
}

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveyList: LoadSurveyList.Model[]

  constructor (private readonly length: number) {
    this.surveyList = mockSurveyModelList(this.length)
  }

  async loadAll () {
    this.callsCount++
    return this.surveyList
  }
}
