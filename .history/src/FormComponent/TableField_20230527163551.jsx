import React, { Component } from 'react'

export default class TableField extends Component {

    render() {
        const { students, deleteStudent } = this.props;
        return (
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ Tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => {
                            return <tr>
                                <td>{student.key}</td>
                                <td>{student.name}</td>
                                <td>{student.phoneNumber}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button className='btn btn-primary mx-3'>Edit</button>
                                    <button className='btn btn-danger' onClick={() => {
                                        deleteStudent(student.key)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
