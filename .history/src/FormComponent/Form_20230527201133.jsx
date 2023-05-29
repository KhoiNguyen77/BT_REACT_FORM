import React, { Component } from 'react'
import InputField from './InputField'
import TableField from './TableField'

export default class Form extends Component {
    state = {
        students: [],
        student: {},
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
        if (findIndex) {
            students.splice(findIndex, 1)
        }
        this.setState({
            students: students
        })
    }
    edit = key => {
        const students = [...this.state.students];
        const student = students.find(student => student.key == key)
        if (student) {
            this.setState({
                student: student
            })
        }
        for (let key in student) {
            document.querySelector(`#${key}`).value = student[key]
            if (key == "key") {
                document.querySelector(`#${key}`).disabled = true;
            }
        }
    }
    update = key => {
        const students = [...this.state.students];
        const student = students.find(student => student.key == key)
        console.log(student);
    }
    render() {
        return (
            <div className='container'>
                <InputField add={this.add} students={this.state.students} student={this.state.student}></InputField>
                <TableField students={this.state.students} deleteStudent={this.delete} edit={this.edit}></TableField>
            </div>
        )
    }
}
