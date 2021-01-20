import React from "react";
import {Button} from "antd";
import {deleteData} from "../../api";


function DeleteButton({record, handleDelete}) {

    const onClickHandle = () => {
        handleDelete(record._id);
    }

    return (
        <Button size={"small"} type={"danger"} onClick={onClickHandle}>
            删除
        </Button>
    )
}

export default DeleteButton;