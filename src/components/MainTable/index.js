import React from "react";
import {Table, Card} from "antd";
import AddButton from "../AddButton";
import ButtonGroup from "antd/es/button/button-group";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import {getData} from "../../api";
import axios from "axios";


class MainTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [
                {
                    title: "编号",
                    dataIndex: "_id",
                    key: "key"
                },
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: "操作",
                    key: "operation",
                    render: (text, record) => {


                        const handleDelete = (id) => {
                            this.setState(
                                {
                                    dataSource: this.state.dataSource.filter((body) => {
                                        if (body._id !== id) return true;
                                    })
                                }
                            )
                        }

                        const handleEdit = (data) => {
                            this.setState(
                                {
                                    dataSource: this.state.dataSource.map((body) => {
                                        if (body._id === data._id) {
                                            return data;
                                        }
                                        return body
                                    })
                                }
                            )
                        }

                        return (
                            <ButtonGroup>
                                <EditButton record={record} handleEdit={handleEdit}/>
                                <DeleteButton record={record} handleDelete={handleDelete}/>
                            </ButtonGroup>
                        )
                    }
                }
            ]

        }
    }


    componentDidMount = () => {
        axios.get("http://127.0.0.1:5000/").then(response => {
            const data = response.data.result;

            this.setState(
                {
                    dataSource: [...response.data.result],
                }
            )

        }).catch(error => {
            console.log(error)
        })
    }




    render() {
        const handleCreate = (data) => {
            let dataSource = [...this.state.dataSource]
            dataSource.push(data)

            this.setState(
                {
                    dataSource
                }
            )
        }

        return (
            <Card title="数据表"
                  extra={
                      <AddButton handleCreate={handleCreate}/>
                  }
            >
                <Table dataSource={this.state.dataSource} columns={this.state.columns}/>

            </Card>


        )
    }
}

export default MainTable;