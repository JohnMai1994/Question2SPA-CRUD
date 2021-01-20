import React from "react";
import {Button} from "antd";


function EditButton({record, handleEdit}) {

    const fakeData = {
        _id : record._id,
        name: "Johnny Boy!!",
        age: "18",
        address: "119 Olive Ave"
    }

    const onClickHandle = () => {
        handleEdit(fakeData);
    }

    return (
        <Button size={"small"} type={"primary"} onClick={onClickHandle}>
            修改
        </Button>
    )
}

export default EditButton;