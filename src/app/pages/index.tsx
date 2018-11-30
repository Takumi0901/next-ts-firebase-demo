import React from 'react'
import App from '../components/App'
import { compose, pure } from 'recompose'

export interface Props {
  token: string
}

export const enhancer = compose<Props, {}>(pure)

const Index: React.SFC<Props> = props => {
  console.log(props)
  return (
    <App>
      <h1>Add an RFP</h1>
    </App>
  )
}

export default enhancer(Index)
