import { compose, pure, withHandlers } from 'recompose'
import { loginWithGitHub, logoutGitHub } from '../../lib/firebaseActions'

export interface Props {
  loginWithGitHub(): void
  logoutGitHub(): void
  token: string
}

export const enhancer = compose<Props>(
  pure,
  withHandlers({
    loginWithGitHub,
    logoutGitHub
  })
)
