import './App.css'
import Layout from "./components/Layout.jsx";
import {Container} from "react-bootstrap";

function App() {
    return (
        <Container
            className="p-3">
            < Container
                className="p-5 mb-4 bg-light rounded-3">
                <h1 className="header"> Welcome To RDF2JSON-OM</h1>
                <Layout/>
            </Container>
        </Container>
    )
}

export default App
