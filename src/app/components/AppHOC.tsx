const AppHOC = WrappedComponent => {
  const App: React.SFC<{}> = props => {
    return <WrappedComponent {...props} />
  }
  return App
}
