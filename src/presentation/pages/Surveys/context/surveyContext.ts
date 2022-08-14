import { createContext } from 'react'

import { SurveyModel } from '@/domain/models'

export type SurveyContextStateType = { surveyList?: SurveyModel[], error?: Error, reload?: boolean }

type SurveyContextSetStateFnType = (values: SurveyContextStateType) => void

type SurveyContextType = [SurveyContextStateType, SurveyContextSetStateFnType]

export const SurveyContext = createContext<SurveyContextType>(null)
