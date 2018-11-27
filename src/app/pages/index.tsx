import React from 'react'
import App from '../components/App'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import withData from '../config'
import { compose, pure } from 'recompose'
import { IStore } from '../redux/IStore'
import { connect } from 'react-redux'

export interface Props {
  token: string
}

const connector = connect((state: IStore) => {
  return {
    token: state.auth.token
  }
})

export const enhancer = compose<Props, {}>(withData, connector, pure)

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

const Index: React.SFC<Props> = props => {
  return (
    <App>
      <h1>Add an RFP</h1>
      {props.token.length > 0 && (
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
    </App>
  )
}

export default enhancer(Index)
