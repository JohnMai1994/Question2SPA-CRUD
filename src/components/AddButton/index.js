import React from "react";
import ButtonGroup from "antd/es/button/button-group";
import {Button} from "antd";


function AddButton({handleCreate}) {
    let randomNum = Math.floor(Math.random() * 100)

    const fakeData = {
        _id: `600850f28f5cf62c7cc11a${randomNum}`,
        name: `Johnny Boy ${randomNum}`,
        age: `${randomNum}`,
        address: `${randomNum} Finch Ave`
    }

    const onClickHandle = () => {
        handleCreate(fakeData);
    }

    return (
        <ButtonGroup>
            <Button size={"small"} type="text" danger
                    onClick={onClickHandle}
            >
                新增
            </Button>
        </ButtonGroup>

    )
}

export default AddButton;