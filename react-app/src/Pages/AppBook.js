import React,{useState} from 'react';
import '../App.css';
import { store } from "../actions/store";
import { Provider } from "react-redux";
import DCandidates from '../components/DCandidates';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import ImportBook from '../components/ImportBook';


function AppBook() {
  const [active, setActive]=useState("FirstTitle");
  return (
    <>
    <Provider store={store}>
    <nav class="footer">

<button class="navButon" onClick={()=> setActive("FirstTitle")}>Shto Studentin</button>
<button class="navButon" onClick={()=> setActive("SecondTitle")}>Shto Librin</button>
</nav>
      <ToastProvider autoDismiss={true}>
      <Container maxWidth="lg">
    
   
    
      <div>
        {active === "FirstTitle" && <DCandidates / >}
        {active === "SecondTitle" && <ImportBook / >}
      </div>

    </Container>
      </ToastProvider>
      </Provider>
    </>
  );
}

export default AppBook;