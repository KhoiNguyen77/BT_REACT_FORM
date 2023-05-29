import React, { Component, useState } from 'react'

export default class TableField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }
    handleInput = e => {
        let inputValue = e.target.value
        let result = [];
        const { students } = this.props;
        let cloneStudents = [...students];
        cloneStudents.filter(student => {
            if (student.key == inputValue) {
                result.push(student)
            }
            console.log(result);
            return result
        })
    }
    render() {
        const { students, deleteStudent, edit } = this.props;
        return (
            <div className='container'>
                <div class="row mb-3">
                    <div class="col">
                        <div>
                            <p>Tìm kiếm sinh viên theo mã</p>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Nhập mã sinh viên" id="searchName" onChange={this.handleInput} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="btnSearch"><i className="fa fa-search" /></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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
                                    <button className='btn btn-primary mx-3' onClick={() => {
                                        edit(student.key)
                                    }}>Edit</button>
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
