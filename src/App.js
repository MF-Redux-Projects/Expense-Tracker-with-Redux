import Layout from "./components/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Transactions from "./components/pages/Transactions";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={''} element={<Home/>}/>
                    <Route path={'/transactions'} element={<Transactions/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
