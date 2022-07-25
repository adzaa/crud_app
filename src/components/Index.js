import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'


class Index extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			users     : [
				{id : 11, f_name : "Muhamed", l_name : "Ali", number : "066475xxx"},
				{id : 22, f_name : "Ime", l_name : "Prezime", number : "066475xxx"},
				{id : 33, f_name : "Drugoime", l_name : "Drugoprezime", number : "066475xxx"}
			],
			editUser : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Update state variable while any user insert or update ---//
	handleUpdateState(data, operation) {
		//--- 'operation==1' means update user ---//
		if(operation === 1) {
			this.setState(prevState => ({
				users : prevState.users.filter(user => {
					if(user.id === data.id)
						return Object.assign(user, data);
					else
						return user;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert user ---//
		var new_users = this.state.users.concat(data);
		this.setState({
			users : new_users
		})
	}
	//--- Find editable user and update state variable ---//
	handleEditUser(userId) {
		this.setState({
			editUser : this.state.users.find(x => x.id === userId)
		})
	}
	//--- Delete user and update state ---//
	handleDeleteUser(id) {
		this.setState(prevState => ({
			users : prevState.users.filter((user, i) => {
				return i !== id;
			})
		}))
		toastr.error('User has been deleted successfully!', {position : 'top-right', heading: 'Done'});
	}

    render() {
      return (
<div className='card'>
  <div className="card-header">
    <h4 className="card-title" style={{float:"left"}}> Users </h4>
    <button type="button" className="btn btn-primary btn-sm" style={{float:"right"}} data-toggle="modal" data-target="#addModal"> Add User </button>
  </div>
  <table class="responsive-card-table unstriped">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Number</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody> {this.state.users.map((user, i) => ( <tr className="number" key={i}>
        <td data-label="First Name"> {user.f_name} </td>
        <td data-label="Last Name"> {user.l_name} </td>
        <td data-label="Number"> {user.number} </td>
        <div className=' p-2 buttons '>
          <button className="btn btn-info btn-sm " onClick={this.handleEditUser.bind(this, user.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
          <button className="btn btn-danger btn-sm " onClick={this.handleDeleteUser.bind(this, i)}> Delete </button>
        </div>
      </tr> ))} </tbody>
    <Create updateState={this.handleUpdateState} />
    <Edit updateState={this.handleUpdateState} user={this.state.editUser} />
  </table>
</div>
        )
    }
}
export default Index