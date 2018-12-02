import Header from './Header'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4
  }
})

const App = ({ children, classes }: { children?: any; classes: any }) => (
  <main>
    <Header />
    <Grid className={classes.root} container spacing={24} justify={'center'}>
      <Grid item xs={8}>
        {children}
      </Grid>
    </Grid>
  </main>
)

export default withStyles(styles)(App)
