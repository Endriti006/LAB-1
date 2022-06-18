import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DashboardStaf from "./DashboardStaf";
import DashboardAbo from "./DashboardAbo";
import DashboardKrye from "./DashboardKrye";
import Login from "./Login";

function App(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/DashboardStaf" component={()=><DashboardStaf authorized={true} />}/>
                <Route exact path="/DashboardAbo" component={()=><DashboardAbo authorized={true} />}/>
                <Route exact path="/DashboardKrye" component={()=><DashboardKrye authorized={true} />}/>
            </Switch>
        </Router>
    )
}

export default App;