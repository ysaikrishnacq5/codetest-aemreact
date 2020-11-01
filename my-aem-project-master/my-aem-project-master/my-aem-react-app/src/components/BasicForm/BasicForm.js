import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import { Modal, ModalBody } from 'react-bootstrap';
require('./BasicForm.scss');

const BasicFormEditConfig = {
    emptyLabel: 'Basic Form',
    isEmpty: function(props) {
        return !props.heading || props.heading.trim().length < 1;
    }
};

class BasicForm extends Component {
  state = {
    fields: { firstname: '', lastname: '', emailid: '', phone: '', referred: '' },
    isModalShow: false,
    errors: {}
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  }

  componentDidMount() {
	  console.log(this.props);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
    	this.setState({	
            isModalShow: true	
          });	
          console.log("Form submitted", this.state.fields);	
          const requestOptions = {	
            method: 'POST',	
            headers: { 'Content-Type': 'application/json' },	
            body: JSON.stringify(this.state.fields)	
          };	
          fetch('https://login.salesforce.com/services/data/v48.0/sobjects/Lead', requestOptions)	
            .then(response => {	
              response.json();	
              this.resetFormData();	
            })	
            .catch(err => {	
              console.log("Error occurred while posting form data", err);	
              this.resetFormData();	
            })	
        }	
      }	
  resetFormData() {
      let fields = {};
      fields["firstname"] = "";
      fields["lastname"] = "";
      fields["emailid"] = "";
      fields["phone"] = "";
      fields["referred"] = "";
      setTimeout(() => {	
          this.setState({ isModalShow: false });	
          this.setState({ fields: fields });	
        }, 10000);	
    }	
    handleClose() {	
      this.setState({	
        isModalShow: false	
      })	
    }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstname"].trim()) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your firstname.";
    }

    if (!fields["lastname"].trim()) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }

    if (!fields["emailid"].trim()) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (!fields["phone"].trim()) {
      formIsValid = false;
      errors["phone"] = "*Please enter your phone number.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }


  render() {
  // let headingElement =  React.createElement(this.props.heading);
	//let headingElement = this.props.headingType ? React.createElement(this.props.headingType, {className: this.props.headingColor},this.props.heading) : '';
    return (<div id="main-registration-container">	
    <Modal size="lg" show={this.state.isModalShow} aria-labelledby="example-modal-sizes-title-lg"	
        onHide={() => this.setState({ isModalShow: false })}>	
        <Modal.Body><div>{JSON.stringify(this.state.fields)}</div></Modal.Body>	
      </Modal>	
      <div id="formdata">
	          <h3>{this.props.heading}</h3>
	          <h4>{this.props.subheading}</h4>
	          <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
            <label>First Name</label>
            <input type="text" name="firstname" value={this.state.fields.firstname} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.firstname}</div>
            <label>Last Name</label>
            <input type="text" name="lastname" value={this.state.fields.lastname} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.lastname}</div>
            <label>Email Address</label>
            <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.emailid}</div>
            <label>Phone Number ( US phone format )</label>
            <input type="text" name="phone" value={this.state.fields.phone} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.phone}</div>
            <label>How did you hear about us ?</label>
            <select name="referred" value={this.state.fields.referred} onChange={this.handleChange}>
              <option id="Google" >Google</option>
              <option id="Fleetcor" >Fleetcor</option>
              <option id="Friend" >Friend</option>
            </select>
          <input type="submit" className="button" value="Submit" />
              </form>
      </div>
      </div>);
  }

}

export default BasicForm;

MapTo('my-aem-project/components/content/basic-form')(BasicForm, BasicFormEditConfig);