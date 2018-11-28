import * as Redux from 'redux'
import { connect } from 'react-redux'
import Env from '../../firebase'
import Router from 'next/router'
import { compose, pure, withHandlers } from 'recompose'
import { signIn, signOut } from '../../redux/modules/auth/index'
import { IStore } from '../../redux/IStore'

export interface Props {
  auth: any
  loginWithGitHub(): void
  logoutGitHub(): void
  signIn(token: string): void
  signOut: () => void
  token: string
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
