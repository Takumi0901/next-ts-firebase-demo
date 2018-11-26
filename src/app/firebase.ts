import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FIREBASE_CONFIG } from '../../.firebase/config'

export default class Env {
  private static singleInstance: Env

  public readonly firebase: firebase.app.App
  public readonly firestore: firebase.firestore.Firestore
  public readonly providerGoogle: any
  public readonly providerGitHub: any

  private constructor() {
    this.firebase = firebase.initializeApp(FIREBASE_CONFIG)
    this.firestore = this.firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    this.firestore.settings(settings)
    this.providerGoogle = new firebase.auth.GoogleAuthProvider()
    this.providerGitHub = new firebase.auth.GithubAuthProvider()
  }

  public static get instance(): Env {
    if (!this.singleInstance) {
      this.singleInstance = new Env()
    }
    return this.singleInstance
  }
}
