import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import { enhancer, Props } from './enhancers/Auth'
import Cookies from 'js-cookie'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

type SProps = {
  pathname?: any
  classes?: any
}

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

const Header: React.SFC<Props & SProps> = ({
  pathname,
  classes,
  loginWithGitHub,
  token = Cookies.get('token') || '',
  logoutGitHub
}) => (
  <header>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Firebase demo
        </Typography>
        {token.length > 0 && (
          <Query query={query} fetchPolicy="network-only">
            {({ data: { viewer } }) => {
              if (!viewer) {
                return null
              }
              return (
                <div>
                  <img src={viewer.avatarUrl} alt="" width={28} />
                  <Button color="inherit" onClick={() => logoutGitHub()}>
                    Logout
                  </Button>
                </div>
              )
            }}
          </Query>
        )}
      </Toolbar>
    </AppBar>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href="/signin">
      <a className={pathname === '/signin' ? 'is-active' : ''}>SignIn</a>
    </Link>
  </header>
)

export default enhancer(withStyles(styles)(Header))
