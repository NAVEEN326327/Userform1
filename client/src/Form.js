import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css';
import firebase from './firebase';

export default class Form extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            dob: new Date(),
            dob1: new Date(),
            email: '',


            phone: 91,

            nameError: "Don't include special charater",
            phoneError: "",
            emailError: "eg: abc@gmail.com",
            dobError: "age must be > 18",
            otpSent: "",

            lastError: "",

            users: []


        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/')
            .then(res => {
                this.setState({
                    users: res.data.name
                })

            });
    }

    validName() {
        if (this.state.name.length > 1 && !(this.state.name.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/))) {
            this.setState({
                nameError: ""
            })
        }
    }


    validEmail() {

        if (this.state.email.length < 6 || this.state.email.indexOf("@") < 2 || (this.state.email.indexOf(".") < this.state.email.indexOf("@")) || this.state.email.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/)) {

            this.setState({
                emailError: "email format is not good"
            })
        } else {
            this.setState({
                emailError: "Email format is good"
            })
            return 1;

        }

    }

    validPhone() {
        if (this.state.phone.length != 12) {
            this.setState({
                phoneError: "Invalid phone number"
            })
        } else {
            this.setState({
                phoneError: ""
            })
        }

    }

    validDOB() {
        if (this.state.dob < "02/02/2002") {
            this.setState({
                dobError: "age is less than 18"
            })
        }
    }

    onClickForOtp() {
        this.setState({
            otpSent: "OTP Sent"
        })
    }




    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
        this.validName();


    }

    onChangeDOB(dob) {

        this.setState({
            dob: dob
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
        this.validEmail();
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
        this.validPhone();


    }



    onSubmit(e) {
        e.preventDefault();
        //  for submiting current user detail to DB

        const user = {
            name: this.state.name,
            dob: this.state.dob,
            email: this.state.email,
            phone: this.state.phone
        }
        console.log(user.value);


        // window.location = '/';

        if (this.validEmail() == 1) {
            console.log(user);



            axios.post('http://localhost:5000/user-form', user)
                .then(res => alert(res.data));
            this.setState({
                lastError: "Submitted!"
            })

        } else {
            this.setState({
                lastError: "Please fill up all details correct!"
            })
        }

    }

    render() {
        return (

            <div className="container">
                <div><h1>User Form</h1></div>
                <form className="form" onSubmit={this.onSubmit} >

                    <div className="form-group">
                        <input type="text" className="name" value={this.state.name} onChange={this.onChangeName} placeholder="name" required />
                        <span className="msg" >{this.state.nameError}</span>

                    </div>

                    <div className="form-group">
                        <DatePicker
                            onChange={this.onChangeDOB}

                            selected={this.state.dob}
                        />
                        <span className="msg" >{this.state.dobError}</span>


                    </div>

                    <div className="form-group">
                        <input type="text" className="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="email" required />
                        <span className="msg" >{this.state.emailError}</span>

                    </div>

                    <div>
                        <input type="number" className="phone" value={this.state.phone} onChange={this.onChangePhone} placeholder="phone" required />


                        <button className="btn btn-primary"    >Verify</button>
                        <input type="text" placeholder="OTP" className="otp"></input>
                        <button className="btn btn-primary">Enter OTP</button>
                    </div>
                    <div>
                        <span className="msg" >{this.state.phoneError}</span>

                        <span className="msg" >{this.state.otpSent}</span>

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>

                    <div className="errormsg">
                        <span className="msg" >{this.state.lastError}</span>

                    </div>

                </form>
            </div>
        )
    }

}