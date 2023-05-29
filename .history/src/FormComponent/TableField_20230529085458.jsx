import React, { Component, useState } from 'react'

export default class TableField extends Component {
    handleSearch = () => {
        let keyword = document.querySelector("#btnSearch").value.trim();
        let result = [];
        const { students } = this.props;
        let cloneStudents = [...students];
        cloneStudents.filter(student => {
            if (student.id == keyword || student.name == keyword || student.phoneNumber == keyword || student.email == keyword) {
                result.push(student)
            }
            return result
        })
        console.log(result);
    }
    render() {
        const { students, deleteStudent, edit } = this.props;
        return (
            <div className='container'>
                <div class="row mb-3">
                    <div class="col">
                        <div>
                            <p>Tìm kiếm sinh viên</p>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Nhập thông tin sinh viên" id="searchName" />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="btnSearch"><i className="fa fa-search" /></span>
                                </div>
                                <button classname="btn btn-primary" onClick={this.handleSearch}>Tìm kiếm</button>
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