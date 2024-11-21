import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormExample(props) {
    // eslint-disable-next-line react/prop-types
    const {schema} = props;

    const Helper = (props) => {
        // eslint-disable-next-line react/prop-types
        const {subject, depth} = props;

        const properties = Object.keys(subject);

        return properties.map((property, index) => {

            return subject[property] && typeof subject[property] === "object"
                ? <Row className="mb-3" key={index}>
                    <Form.Label className={"depth-"+depth}>{property}</Form.Label>
                    <Helper subject={subject[property]} depth={depth+1} />
                </Row>
                : <Form.Control placeholder={property}/>;
        });
    };

    return (
        <Form>
            <Helper subject={schema} depth={0}/>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default FormExample;