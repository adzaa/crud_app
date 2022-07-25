import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor() {
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			user_id   : '',
			f_name  : '',
			l_name : '',
			number 	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(user_data) {
		this.setState({
			user_id   : user_data.user.id,
			f_name  : user_data.user.f_name,
			l_name : user_data.user.l_name,
			number     : user_data.user.number
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Update state users variable by props method ---//
	handleUpdateUser(e) {
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			id        : this.state.user_id,
			f_name  : this.state.f_name,
			l_name : this.state.l_name,
			number     : this.state.number
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
			toastr.warn('User data updated successfully!', {position : 'top-right', heading: 'Done'});
		}
	}
    //--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.f_name.length === 0) {
    		error.f_name = ['This field is required!'];
    	}
    	if(fields.l_name.length === 0) {
    		error.l_name = ['This field is required!'];
    	}
    	if(fields.number.length === 0) {
    		error.number = ['This field is required!'];
    	}
		this.setState({
			errors : error
		})
		if(fields.f_name.length === 0 || fields.l_name.length === 0 || fields.number.length === 0) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while update user ---//
	reset() {
        this.setState(this.baseState);
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade box" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="username" className="col-form-label">First Name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('f_name') ? 'is-invalid' : ''}`}
			            		 id="f_name" name="f_name" placeholder="First Name" onChange={this.handleInputFieldChange} value={this.state.f_name}/>
			            		{this.renderErrorFor('f_name')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="l_name" className="col-form-label">Last Name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('mobile_no') ? 'is-invalid' : ''}`}
			            		 id="l_name" name="l_name" placeholder="Last Name" onChange={this.handleInputFieldChange} value={this.state.l_name}/>
			            		{this.renderErrorFor('l_name')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="number" className="col-form-label">Number:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('number') ? 'is-invalid' : ''}`}
			            		 id="number" name="number" placeholder="Number" onChange={this.handleInputFieldChange} value={this.state.number}/>
			            		{this.renderErrorFor('number')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit