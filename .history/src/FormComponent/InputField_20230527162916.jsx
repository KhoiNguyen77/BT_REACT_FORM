import React, { Component } from 'react'

export default class InputField extends Component {
    state = {
        values: {
            key: 0,
            name: "",
            phoneNumber: 0,
            email: ''
        },
        errors: {
            key: "*",
            name: "*",
            phoneNumber: "*",
            email: "*"
        },
        Disabled: true
    }
    handleInput = e => {
        const { students } = this.props;
        const { id, value, } = e.target;
        const inputValues = { ...this.state.values }
        const errors = { ...this.state.errors }
        let message = ""
        inputValues[id] = value;
        let dataType = e.target.getAttribute("data-type");
        // eslint-disable-next-line default-case
        switch (dataType) {
            case "letter": {
                let regexLetter = /^[a-zA-Z]+$/;
                if (!regexLetter.test(value)) {
                    message = id + ' must be letters';
                }
                break;
            }
            case "number": {
                let min = JSON.parse(e.target.getAttribute("min-maxLength"))[0];
                let max = JSON.parse(e.target.getAttribute("min-maxLength"))[1];
                if (value.length < min || value.length > max) {
                    message = id + ` must be from ${min} to ${max} length`
                }
                break;
            }
            // eslint-disable-next-line no-fallthrough
            case "email": {
                var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!mailformat.test(value)) {
                    message = id + ' must be in correct form'
                    break;
                }
            }
        }
        if (e.target.getAttribute("uniqe")) {
            if (students.find(student => student.key == value)) {
                message = id + " has exists!";
            }
        }
        if (value.trim() == "") {
            message = id + " can't be blank";
        }
        errors[id] = message
        let result = this.checkValidForm(errors);
        this.setState({
            values: inputValues,
            errors: errors,
            Disabled: result
        })

    }
    checkValidForm = (errors) => {
        let output = false;
        for (let key in errors) {
            console.log(errors[key]);
            if (errors[key] !== "") {
                output = true;
                break
            }
        }
        return output
    }
    handleSubmit = e => {
        e.preventDefault();
        const { add } = this.props;
        add(this.state.values);
    }

    render() {
        console.log(this.state.values);
        return (
            <div className='container mb-5'>
                <form className='card'>
                    <div className="card-header bg-dark">
                        <h3 className='text-white'>Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <form className='form'>
                                <div className="col-6">
                                    <p className='d-inline-block'>Mã SV</p> <span className='text-danger'>{this.state.errors.key}</span>
                                    <input type="number" id='key' uniqe="id" min-maxLength="[3,5]" data-type="number" className='form-control' onInput={this.handleInput} />
                                </div>
                                <div className="col-6">
                                    <p className='d-inline-block' >Họ tên</p> <span className='text-danger'>{this.state.errors.name}</span>
                                    <input type="text" id='name' data-type="letter" className='form-control' onInput={this.handleInput} />
                                </div>
                            </form>

                        </div>
                        <div className="row">
                            <form className='form'>
                                <div className="col-6">
                                    <p className='d-inline-block'>Số điện thoại</p> <span className='text-danger'>{this.state.errors.phoneNumber}</span>
                                    <input type="number" id='phoneNumber' className='form-control' min-maxLength="[8,10]" data-type="number" onInput={this.handleInput} />
                                </div>
                                <div className="col-6">
                                    <p className='d-inline-block'>Email</p> <span className='text-danger'>{this.state.errors.email}</span>
                                    <input type="email" id='email' className='form-control' onInput={this.handleInput} data-type="email" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type='submit' onClick={this.handleSubmit} className='btn btn-success' disabled={this.state.Disabled}>Thêm</button>
                    </div>
                </form>
            </div>
        )
    }
}
