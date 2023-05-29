import React, { Component } from 'react'
import InputField from './InputField'
import TableField from './TableField'

export default class Form extends Component {
    state = {
        students: [],
        student: null,
    }
    add = (student) => {
        const students = [...this.state.students];
        students.push(student);
        this.setState({
            students: students
        })
    }
    delete = (key) => {
        const students = [...this.state.students];
        const findIndex = students.findIndex(student => student.key == key)
        if (findIndex != -1) {
            students.splice(findIndex, 1)
        }
        this.setState({
            students: students
        })
    }
    edit = (key) => {
        const students = [...this.state.students];
        const student = students.find(student => student.key == key)
        if (student) {
            this.setState({
                student: student,
                display: "none",
                updateDisplay: ""
            })
        }
    }

    update = updatedStudent => {
        const studentsClone = [...this.state.students];
        const indexStudent = studentsClone.findIndex(student => student.key == updatedStudent.key)

        if (indexStudent > -1) {
            studentsClone[indexStudent] = updatedStudent;
            this.setState({
                students: studentsClone,
                student: null,
            })
        }
    }
    render() {
        return (
            <div className='container'>
                <InputField add={this.add} students={this.state.students} student={this.state.student} update={this.update}></InputField>
                <TableField students={this.state.students} deleteStudent={this.delete} edit={this.edit}></TableField>
            </div>
        )
    }

}
