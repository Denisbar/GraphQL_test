let render = ReactDOM.render;
let browserHistory = ReactRouter.browserHistory;
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;
let Link = ReactRouter.Link;

render((
    <Router history={browserHistory}>
        <Route path="/" component={List} />
    </Router>
), document.getElementById('app'))