import Env from '../firebase'
import Router from 'next/router'
import Cookies from 'js-cookie'

export const loginWithGitHub = props => () => {
  Env.instance.firebase
    .auth()
    .signInWithPopup(Env.instance.providerGitHub)
    .then((result: any) => {
      const token = result.credential.accessToken
      console.log(result)
      props.updateToken(() => token)
      Cookies.set('token', token)
      Router.push('/')
    })
    .catch(error => {
      console.log('error on google auth')
      console.log(error)
    })
}

export const logoutGitHub = props => () => {
  Env.instance.firebase
    .auth()
    .signOut()
    .then(() => {
      Cookies.remove('token')
      props.updateToken(() => '')
      Router.push('/signin')
    })
    .catch(error => {
      console.log(error)
    })
}
