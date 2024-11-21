import {useState} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Editor from "./Editor.jsx";
import FormExample from "./FormExample.jsx";
import {Container} from "react-bootstrap";

const Layout = () => {

    const [input, setInput] = useState({
        iri: "",
        rdf: ""
    });

    const [data, setData] = useState({
        json: "",
        schema: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //axios.post("http://localhost:8080/full-object?iri=" + input.iri, input.rdf, {
            //axios.post("https://rdf2json.onrender.com/full-object?iri=" + input.iri, input.rdf, {
            axios.post("https://rdf2json.vse.cz/full-object?iri=" + input.iri, input.rdf, {
            "headers": {
                "content-type": "text/plain",
                "Access-Control-Allow-Origin": "http://localhost:5173/"
            }
        }).then((response) => {
            const json = response.data;
            const schema = { ...response.data};
            delete schema['@context'];
            setData({
                json,
                schema,
            })
        });
    };

    return (
        <div>
            <Container
                className="p-5 mb-4 bg-light rounded-3">
                <h1 className="header">Welcome To RDF2JSON-OM</h1>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>RDF to serialize</InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            name="rdf"
                            onChange={handleChange}
                            value={input.rdf}
                            aria-label="RDF to serialize"/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Root IRI</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="iri"
                            onChange={handleChange}
                            value={input.iri}
                            placeholder="http://example.com/person/Person"
                            id="iri"
                            aria-describedby="iri"/>
                        <Button variant="primary" type="submit">RDF2JSON NOW</Button>
                    </InputGroup>
                </Form>
            </Container>
            <Container
                className="p-5 mb-4 bg-light rounded-3">
                <Editor
                    value={data.json}
                />
            </Container>
            {data.schema !== "" && <Container
                className="p-5 mb-4 bg-light rounded-3">
                <FormExample
                    schema={data.schema}/>
            </Container>}
        </div>
    )
}

export default Layout;