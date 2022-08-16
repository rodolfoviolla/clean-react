import { LoadSurveyList } from '@/domain/useCases'
import { createContext } from 'react'

export type SurveyContextStateType = { surveyList?: LoadSurveyList.Model[], error?: Error, reload?: boolean }

type SurveyContextSetStateFnType = (values: SurveyContextStateType) => void

type SurveyContextType = [SurveyContextStateType, SurveyContextSetStateFnType]

export const SurveyContext = createContext<SurveyContextType>(null)
