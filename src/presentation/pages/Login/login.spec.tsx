import React from 'react'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import { Authentication, AuthenticationParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { ValidationStub } from '@/presentation/test'

import { Login } from '.'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

  return { sut, authenticationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut: { getByTestId } } = makeSut()

    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut: { getByTestId } } = makeSut()

    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)
    const spinner = getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()

    const emailInput = getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
