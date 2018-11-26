import { withData } from 'next-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  console.log(headers)
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = {
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
}

export default withData(client)
