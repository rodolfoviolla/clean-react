import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models/accountModel'
import { mockAccountModel, mockAddAccount } from '@/domain/test'
import { AddAccountParams } from '@/domain/useCases/addAccount'

import { RemoteAddAccount } from './remoteAddAccount'
import { HttpStatusCode } from '@/data/protocols/http'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  url: string
}

const makeSut = (): SutTypes => {
  const url = faker.internet.url()
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { sut, httpPostClientSpy, url }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy, url } = makeSut()
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toBe(addAccountParams)
  })

  test('Should return AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.add(addAccountParams)
    expect(account).toBe(httpResult)
  })
})
