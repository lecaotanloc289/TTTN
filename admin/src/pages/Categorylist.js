import {  Button, Table, notification } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegCopy } from 'react-icons/fa6'
import CopyToClipboard from 'react-copy-to-clipboard'
const Categorylist = () => {
    const categories = useSelector((state) => state.data.categories)
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (placement) => {
        api.success({
            message: 'Copy success!',
            placement,
        })
    }
    const columns = [
        {
            title: 'Icon',
            dataIndex: 'icon',
            render: (img) => (
                <div>
                    <img alt='Category icon' src={img} width={50} />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => b.name.localeCompare(a.name),
            sortDirections: ['descend', 'asc'],
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Copy id',
            dataIndex: '_id',
            render: (id) => (
                <div>
                    {contextHolder}
                    <CopyToClipboard text={id}>
                        <Button onClick={() => openNotification('top')}>
                            <FaRegCopy />
                        </Button>
                    </CopyToClipboard>
                </div>
            ),
        },
    ]

    const onChange = (pagination, filters, sorter, extra) => {}
    return (
        <>
            <h3 className="mb-4 title">Category list</h3>
            
            <Table
                style={{ textAlign: 'center' }}
                columns={columns}
                dataSource={categories}
                onChange={onChange}
            />
        </>
    )
}

export default Categorylist
