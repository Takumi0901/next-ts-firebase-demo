import * as React from 'react'
import App from '../components/App'
import { enhancer, Props } from '../components/enhancers/Auth'

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
