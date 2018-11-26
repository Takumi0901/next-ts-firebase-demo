import React from 'react'
import App from '../components/App'
import Env from '../firebase'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import withData from '../config'

const query = gql`
  query {
    viewer {
      login
      email
      login
      avatarUrl
    }
  }
`

type State = {
  auth: any
  user: any
}

class Index extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      auth: '',
      user: {}
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    this.setState({
      auth: token || ''
    })
  }

  loginWithGoogle() {
    Env.instance.firebase
      .auth()
      .signInWithPopup(Env.instance.providerGitHub)
      .then((result: any) => {
        let token = result.credential.accessToken
        // The signed-in user info.
        let user = result.user
        this.setState({ auth: token })
        localStorage.setItem('token', token)
        console.log(result.credential)
        console.log(user)
        // ...
      })
      .catch(error => {
        console.log('error on google auth')
        console.log(error)
      })
  }

  logoutGoogle() {
    Env.instance.firebase
      .auth()
      .signOut()
      .then(result => {
        console.log(result)
        this.setState({ auth: '' })
        localStorage.removeItem('token')
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <App>
        <h1>Add an RFP</h1>
        {this.state.auth.length > 0 && (
          <Query query={query} fetchPolicy="network-only">
            {({ data: { viewer } }) => {
              if (!viewer) return null
              return (
                <div>
                  <img src={viewer.avatarUrl} alt="" width={16} />
                  <p>{viewer.login}</p>
                  <p>{viewer.email}</p>
                </div>
              )
            }}
          </Query>
        )}
        <button onClick={this.loginWithGoogle.bind(this)}>login</button>
        <button onClick={this.logoutGoogle.bind(this)}>logout</button>
      </App>
    )
  }
}

export default withData(Index)
