import React,{Component} from 'react';
import './RestModal.css';
import Modal from 'react-modal';

class ItemModal extends Component{
    constructor(props){
        super(props);
       


    }

    

    
    render(){

        return(
            <div>
     
        <Modal
          isOpen={this.props.isOpen}
         onRequestClose={this.closeModal}
         contentLabel="Add Menu Item Modal"
         className="ModalStyle"
        >
 
             <div> 
                 <hr/>
                 <h2 className="mode" >confirm order</h2><hr/>
                
             </div>
             <br/><br/>
             
          <button onClick={this.props.isClosed} className="formStyle btn btn-danger">close</button>
          
          
        </Modal>
      </div>
        );
    }
}
export default ItemModal;