import React, { useRef, useContext, Fragment, useState } from "react";
import "./AppointmentForm.css";
import UserList from "./UserList";
import Table from "react-bootstrap/Table";
import UserContext from "../Store/UserContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const AppointmentForm = () => {
    const userCtx = useContext(UserContext);
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState();
    const nameInputRef = useRef();
    const mobileInputRef = useRef();
    const emailInputRef = useRef();

    const editHandler = (user) => {
        // console.log(user);
        setUpdate(true);
        nameInputRef.current.value = user.name;
        mobileInputRef.current.value = user.mobile;
        emailInputRef.current.value = user.email;
        setUser(user);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const mobile = mobileInputRef.current.value;
        const email = emailInputRef.current.value;

        if (!update) {
            const user = {
                name: name,
                mobile: mobile,
                email: email,
            };
            userCtx.addUser(user);
        } else {
            const userToEdit = {
                id: user.id,
                name: name,
                mobile: mobile,
                email: email,
            };
            // console.log(userToEdit);
            userCtx.editUser(userToEdit);
            setUpdate(false);
        }

        event.target.reset();
    };
    let content;
    const UserCtx = useContext(UserContext);

    if (UserCtx.listOfUser.length === 0) {
        content = <div>No Appointments</div>;
    } else {
        content = (
            <Table striped hover>
                <tbody>
                    {UserCtx.listOfUser.map((data) => (
                        <UserList
                            key={data.id}
                            id={data.id}
                            name={data.name}
                            email={data.email}
                            mobile={data.mobile}
                            onEdit={() => {
                                editHandler(data);
                            }}
                        ></UserList>
                    ))}
                </tbody>
            </Table>
        );
    }

    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput">Name</Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            ref={nameInputRef}
                        />
                    </Col>
                </Row>
                <Row className="inputs">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput">
                            Mobile Number
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            type="number"
                            ref={mobileInputRef}
                        />
                    </Col>
                </Row>
                <Row className="inputs">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput">Email</Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            type="email"
                            ref={emailInputRef}
                        />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Button type="submit" className="btn">
                            {!update ? `Submit` : `Update`}
                        </Button>
                    </Col>
                </Row>
            </Form>
            {content}
        </Fragment>
    );
};

export default AppointmentForm;
