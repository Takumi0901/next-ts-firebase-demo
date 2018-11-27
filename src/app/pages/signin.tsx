import * as React from 'react'
import * as Redux from 'redux'
import { connect } from 'react-redux'
import App from '../components/App'
import Env from '../firebase'
import withData from '../config'
import Router from 'next/router'
import { compose, pure, withHandlers } from 'recompose'
import { signIn, signOut } from '../redux/modules/auth/index'
import { IAuth } from '../redux/modules/auth/types'
import { IStore } from '../redux/IStore'

export interface Props {
  auth: any
  loginWithGitHub(): void
  logoutGitHub(): void
  signIn(token: string): void
  signOut: () => void
  token: IAuth
}

const connector = connect(
  (state: IStore) => {
    return {
      token: state.auth.token
    }
  },
  dispatch => Redux.bindActionCreators({ signIn, signOut }, dispatch)
)

export const enhancer = compose<Props>(
  withData,
  pure,
  connector,
  withHandlers({
    loginWithGitHub: props => () => {
      Env.instance.firebase
        .auth()
        .signInWithPopup(Env.instance.providerGitHub)
        .then((result: any) => {
          const token = result.credential.accessToken
          props.signIn(token)
          Router.push('/')
        })
        .catch(error => {
          console.log('error on google auth')
          console.log(error)
        })
    },
    logoutGitHub: props => () => {
      Env.instance.firebase
        .auth()
        .signOut()
        .then(() => {
          props.signOut()
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
)

const SignIn: React.SFC<Props> = props => {
  return (
    <App>
      <h1>SignIn Page</h1>
      <button onClick={() => props.loginWithGitHub()}>login</button>
      <button onClick={() => props.logoutGitHub()}>logout</button>
    </App>
  )
}

export default enhancer(SignIn)
