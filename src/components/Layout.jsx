import {useState} from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Editor from "./Editor.jsx";

const Layout = () => {

    const [input, setInput] = useState({
        iri: "",
        rdf: ""
    });

    const [data, setData] = useState({
        json: ""
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
        axios.post("http://localhost:8080/full-object?iri=" + input.iri, input.rdf, {
            "headers": {
                "content-type": "text/plain",
            }
        }).then((response) => {
            setData({
                json: response.data
            })
        });
    };

    return (
        <div className="jsoneditor-div">
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
            <Editor
                value={data.json}
            />
        </div>
    )
}

export default Layout;