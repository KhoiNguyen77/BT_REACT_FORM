import React, { Component, PureComponent } from 'react'

export default class InputField extends PureComponent {
    constructor(props) {
        super(props);
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
            disabledEdit: true,
            display: "",
            updateDisplay: "none",
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("cũ");
        if (nextProps.student !== this.state.values) {
            console.log("mới");
            this.setState({
                values: nextProps.student,
                errors: {
                    key: "",
                    name: "",
                    phoneNumber: "",
                    email: ""
                },
                disabledEdit: true,
                display: nextProps.display,
                updateDisplay: nextProps.updateDisplay
            })
        }
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
            Disabled: result,
            disabledEdit: false,
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
            updateDisplay: "none"
        })
        const { add } = this.props;
        add(this.state.values);
    }

    handleEdit = e => {
        e.preventDefault();
        document.querySelector("form.card").reset();
        this.setState({
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
            display: "",
            updateDisplay: "none"
        })
        document.querySelector("#key").disabled = false
        const { update } = this.props;
        update(this.state.values);
    }
    render() {
        return (
            <div className='container mb-5'>
                <form className='card'>
                    <div className="card-header bg-dark">
                        <h3 className='text-white'>Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <p className='d-inline-block'>Key</p> <span className='text-danger'>{this.state.errors.key}</span>
                                <input type="number" id='key' uniqe="id" min-maxLength="[3,5]" data-type="number" className='form-control' onChange={this.handleInput} placeholder='Please enter your key' />
                            </div>
                            <div className="col-6">
                                <p className='d-inline-block' >Name</p> <span className='text-danger'>{this.state.errors.name}</span>
                                <input type="text" id='name' data-type="letter" className='form-control' onChange={this.handleInput} placeholder='Please enter your name' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className='d-inline-block'>Phone Number</p> <span className='text-danger'>{this.state.errors.phoneNumber}</span>
                                <input type="number" id='phoneNumber' className='form-control' min-maxLength="[8,10]" data-type="number" onChange={this.handleInput} placeholder='Please enter your phone number' />
                            </div>
                            <div className="col-6">
                                <p className='d-inline-block'>Email</p> <span className='text-danger'>{this.state.errors.email}</span>
                                <input type="email" id='email' className='form-control' onChange={this.handleInput} data-type="email" placeholder='Please enter your email' />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type='submit' onClick={this.handleSubmit} className='btn btn-success' disabled={this.state.Disabled} style={{ display: this.state.display }}>Thêm</button>
                        <button type='submit' className='btn btn-primary mx-2' disabled={this.state.disabledEdit} onClick={this.handleEdit} style={{ display: this.state.updateDisplay }} >Update</button>
                    </div>
                </form>
            </div>
        )
    }
}
