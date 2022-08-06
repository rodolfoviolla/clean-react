import { faker } from '@faker-js/faker'

export const getAnyOtherErrorStatusCodeThan = (statusCodesToExclude: number[]) => {
  let statusCode: number

  while (statusCodesToExclude.includes(statusCode)) {
    statusCode = faker.internet.httpStatusCode({ types: ['serverError', 'clientError'] })
  }

  return statusCode
}
