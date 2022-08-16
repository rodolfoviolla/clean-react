import { SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value?: object) {
    if (value) return localStorage.setItem(key, JSON.stringify(value))

    localStorage.removeItem(key)
  }

  get (key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
