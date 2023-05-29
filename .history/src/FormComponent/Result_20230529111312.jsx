/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react'

export default class extends Component {
    state = {
        result: {}
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.result != this.state.result) {
            this.setState({
                result: nextProps.result
            })
        }
    }
    render() {
        return (
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
                    <tr>
                        <td>{this.state.result.key}</td>
                        <td>{this.state.result.name}</td>
                        <td>{this.state.result.phoneNumber}</td>
                        <td>{this.state.result.email}</td>
                        <td>
                        </td>
                    </tr>

                </tbody>
            </table>
        )
    }
}
