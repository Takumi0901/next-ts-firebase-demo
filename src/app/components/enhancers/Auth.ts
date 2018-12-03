import { compose, pure, withHandlers, withState } from 'recompose'
import Cookies from 'js-cookie'
import { loginWithGitHub, logoutGitHub } from '../../lib/firebaseActions'

export interface Props {
  loginWithGitHub(): void
  logoutGitHub(): void
  updateToken: (token: any) => void
  token: string
  classes: any
}

export const enhancer = compose<Props>(
  pure,
  withState('token', 'updateToken', Cookies.get('token') || ''),
  withHandlers({
    loginWithGitHub,
    logoutGitHub
  })
)
