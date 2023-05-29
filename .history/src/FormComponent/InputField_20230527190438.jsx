import React, { Component, PureComponent } from 'react'

export default class InputField extends PureComponent {
    constructor(props) {
        super(props);
        console.log(props.student);
        this.state = {
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
            Disabled: true,
            editStudent: props.student
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            editStudent: nextProps.editStudent
        })

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
            if (errors[key] !== "") {
                output = true;
                break
            }
        }
        return output
    }
    handleSubmit = e => {
        e.preventDefault();
        document.querySelector("form.card").reset();
        this.setState({
            Disabled: true
        })
        const { add } = this.props;
        add(this.state.values);
    }

    render() {
        console.log(this.state.editStudent);
        return (
            <div className='container mb-5'>
                <form className='card'>
                    <div className="card-header bg-dark">
                        <h3 className='text-white'>Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <p className='d-inline-block'>Mã SV</p> <span className='text-danger'>{this.state.errors.key}</span>
                                <input type="number" id='key' uniqe="id" min-maxLength="[3,5]" data-type="number" className='form-control' onInput={this.handleInput} />
                            </div>
                            <div className="col-6">
                                <p className='d-inline-block' >Họ tên</p> <span className='text-danger'>{this.state.errors.name}</span>
                                <input type="text" id='name' data-type="letter" className='form-control' onInput={this.handleInput} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className='d-inline-block'>Số điện thoại</p> <span className='text-danger'>{this.state.errors.phoneNumber}</span>
                                <input type="number" id='phoneNumber' className='form-control' min-maxLength="[8,10]" data-type="number" onInput={this.handleInput} />
                            </div>
                            <div className="col-6">
                                <p className='d-inline-block'>Email</p> <span className='text-danger'>{this.state.errors.email}</span>
                                <input type="email" id='email' className='form-control' onInput={this.handleInput} data-type="email" />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type='submit' onClick={this.handleSubmit} className='btn btn-success' disabled={this.state.Disabled}>Thêm</button>
                        <button type='submit' className='btn btn-primary mx-2'>Update</button>
                    </div>
                </form>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.editStudent != prevState.editStudent) {
            return true;
        } else return false;
    }
}
