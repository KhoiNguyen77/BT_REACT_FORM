import React, { Component, useState } from 'react'

export default class TableField extends Component {
    constructor(props) {
        super(props);
    }
    handleSearch = (e) => {
        let keyword = e.target.value.trim();
        let result = [];
        const { students } = this.props;
        let cloneStudents = [...students];
        // cloneStudents.filter(student => )
    }
    render() {
        const { students, deleteStudent, edit } = this.props;
        return (
            <div className='container'>
                <div class="row mb-3">
                    <div class="col">
                        <p>Tìm kiếm sinh viên</p>
                        <div class="input-group">

                            <input type="text" class="form-control" placeholder="Nhập thông tin sinh viên" id="searchName" />
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="btnTimNV"><i class="fa fa-search"></i></span>
                            </div>
                            <button className='btn btn-primary'>Tìm kiếm</button>
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
