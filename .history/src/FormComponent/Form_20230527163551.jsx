import React, { Component } from 'react'
import InputField from './InputField'
import TableField from './TableField'

export default class Form extends Component {
    state = {
        students: []
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

    render() {
        return (
            <div className='container'>
                <InputField add={this.add} students={this.state.students}></InputField>
                <TableField students={this.state.students} deleteStudent={this.delete}></TableField>
            </div>
        )
    }
}
