import * as React from 'react'
import App from '../components/App'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { enhancer, Props } from '../components/enhancers/Auth'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

const SignIn: React.SFC<Props> = props => {
  const { classes } = props
  return (
    <App>
      <Typography align={'center'} variant={'h3'}>
        SignIn Page
      </Typography>
      <Paper className={classes.root} elevation={1}>
        <Button variant="contained" size="large" color={'primary'} fullWidth onClick={() => props.loginWithGitHub()}>
          Githubでログインする
        </Button>
      </Paper>
    </App>
  )
}

export default enhancer(withStyles(styles)(SignIn))
