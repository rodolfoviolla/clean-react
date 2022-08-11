import { SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get (key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
