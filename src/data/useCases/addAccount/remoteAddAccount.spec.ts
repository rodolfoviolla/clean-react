import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models/accountModel'
import { mockAddAccount } from '@/domain/test'
import { AddAccountParams } from '@/domain/useCases/addAccount'

import { RemoteAddAccount } from './remoteAddAccount'

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
})
