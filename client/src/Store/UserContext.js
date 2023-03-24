import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const UserContext = React.createContext({
    listOfUser: [],
    addUser: (user) => {},
    editUser: (user) => {},
    deleteUser: (id) => {},
});

export default UserContext;

export const UserContextProvider = (props) => {
    const [users, setUsers] = useState([]);
    const getUserData = useCallback(async () => {
        await axios
            .get("http://localhost:5000/api/users")

            .then((res) => {
                // console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                setUsers([]);
                alert(err.message);
            });
    }, []);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const postDataHandler = useCallback(
        async (userDetail) => {
            console.log("Posting data in progress");
            await axios
                .post("http://localhost:5000/api/users", {
                    userDetail,
                })
                .then(() => {
                    getUserData();
                })
                .catch((err) => alert(err.message));
        },
        [getUserData]
    );

    const deleteDataHandler = useCallback(
        async (id) => {
            console.log("Deleting data in progress");
            await axios
                .delete(`http://localhost:5000/api/users/${id}`)
                .then(() => {
                    getUserData();
                })
                .catch((err) => alert(err.message));
        },
        [getUserData]
    );
    const editDataHandler = useCallback(
        async (userDetail) => {
            console.log("Editing data in progress");
            await axios
                .put(`http://localhost:5000/api/users/${userDetail.id}`, {
                    userDetail,
                })
                .then(() => {
                    getUserData();
                })
                .catch((err) => alert(err.message));
        },
        [getUserData]
    );

    const userContext = {
        listOfUser: users,
        addUser: postDataHandler,
        deleteUser: deleteDataHandler,
        editUser: editDataHandler,
    };

    return (
        <div>
            <UserContext.Provider value={userContext}>
                {props.children}
            </UserContext.Provider>
        </div>
    );
};
