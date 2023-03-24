import React, { useContext } from "react";
import UserContext from "../Store/UserContext";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const UserList = (props) => {
    const UserCtx = useContext(UserContext);
    const deleteHandler = () => {
        console.log(props.id);
        UserCtx.deleteUser(props.id);
    };

    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.mobile}</td>
            <td>
                <BsFillPencilFill onClick={props.onEdit}></BsFillPencilFill>
            </td>
            <td>
                <BsFillTrashFill onClick={deleteHandler}></BsFillTrashFill>
            </td>
        </tr>
    );
};

export default UserList;
