import Env from '../firebase'
import Router from 'next/router'
import Cookies from 'js-cookie'

export const loginWithGitHub = () => () => {
  Env.instance.firebase
    .auth()
    .signInWithPopup(Env.instance.providerGitHub)
    .then((result: any) => {
      const token = result.credential.accessToken
      console.log(result)
      Cookies.set('token', token)
      Router.push('/')
    })
    .catch(error => {
      console.log('error on google auth')
      console.log(error)
    })
}

export const logoutGitHub = () => () => {
  Env.instance.firebase
    .auth()
    .signOut()
    .then(() => {
      Cookies.remove('token')
      Router.push('/signin')
    })
    .catch(error => {
      console.log(error)
    })
}
