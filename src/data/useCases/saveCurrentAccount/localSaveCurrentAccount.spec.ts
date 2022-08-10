import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'

import { LocalSaveCurrentAccount } from './localSaveCurrentAccount'
import { mockAccountModel } from '@/domain/test'

const makeSut = () => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveCurrentAccount(setStorageMock)

  return { sut, setStorageMock }
}

describe('LocalSaveCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.save(mockAccountModel())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if account is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
