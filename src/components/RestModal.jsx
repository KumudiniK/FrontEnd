import React, { Component } from 'react';
import './RestaurantList';
import './RestModal.css';
import Modal from 'react-modal';

class RestModal extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            address:""
        }
    }
    handleName=(event)=>{
        this.setState({Name:event.target.value})
    }
    handleAddress=(event)=>{
        this.setState({address:event.target.value})
    }
    passDetails=()=>{
       //console.log(this.props);
       this.props.renderDetails(this.state.Name,this.state.address) 
       
    }
    
     
      
    render(){
      return(
        <div>
     
        <Modal
          isOpen={this.props.isOpen}
         onRequestClose={this.closeModal}
         contentLabel="Add Resto Modal"
         className="ModalStyle"
        >
 
             <div> 
                 <hr/>
                 <h2 className="mode" >Add New Restaurant Here</h2><hr/>
                 <form>
                     <label className="formStyle">Restaurant Name </label><input type="text"
                      name="RestoName" value={this.state.Name} onChange={this.handleName}/><br/><br/>
                     <label className="formStyle">Address </label><textarea name="address" rows="2" 
                     cols="20" className="tArea"  value={this.state.address} onChange={this.handleAddress}/>
                </form>
             </div>
             <br/><br/>
             <button className="formStyle btn btn-success" onClick={this.passDetails}>Add Restaurant</button>
          <button onClick={this.props.isClosed} className="formStyle btn btn-danger">close</button>
          
          
        </Modal>
      </div>
      );
        
    }

}
export default RestModal;