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
    render() {
        return (
            <div className='container'>
                <InputField add={this.add}></InputField>
                <TableField students={this.state.students}></TableField>
            </div>
        )
    }
}
