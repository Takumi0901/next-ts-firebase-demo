import React from 'react'
import App from '../components/App'
import Env from '../firebase'

export default class extends React.Component {
  componentDidMount() {
    Env.instance.firestore
      .collection('users')
      .get()
      .then(response => {
        response.forEach(doc => {
          const document = doc.data()
          console.log('******************')
          console.log(document)
          console.log('******************')
        })
      })
  }

  render() {
    return (
      <App>
        <h1>Add an RFP</h1>
      </App>
    )
  }
}
