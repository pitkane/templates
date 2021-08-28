import { ExampleData } from '../types'
import { db } from './firebase'

export const getExampleData = async (): Promise<ExampleData[]> => {
  try {
    const exampleCollectionRef = db.collection('exampleCollection')
    const snapshot = await exampleCollectionRef.get()

    const casted = snapshot.docs.map((doc) => {
      const collection = doc.data()
      return collection as ExampleData
    })

    return casted
  } catch (error) {
    console.error(error)
    throw Error
  }
}
