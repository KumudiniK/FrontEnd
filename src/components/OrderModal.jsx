import React,{Component} from 'react';
import './OrderModal.css';
import Modal from 'react-modal';

class OrderModal extends Component{
    constructor(props){
        super(props);
       
    }
    passDetails=()=>{
        this.props.placeOrder()
    }

    show=()=>{
       
        const {list}=this.props
       
        const mapped=list.map((receipt)=>{
            if(receipt.count>0)
            {
                return(
                   
                    <tr>
                        <td>{receipt.MenuItem}</td>
                        <td>{receipt.count}</td>
                        <td>{receipt.Price}</td>
                        <td>{receipt.Price*receipt.count}</td>
                    </tr>
                   
                  
                );
            }

        })
        return mapped
    }
    render(){
       
        console.log(this.props)
        return(
           
            <div>
                <Modal
          isOpen={this.props.isOpen}
         onRequestClose={this.closeModal}
         contentLabel="Order Modal"
         className="ModalStyle"
        >
            <h1>Confirm Your Order</h1>
            <hr/>
            <table className="tableStyle">
              <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                   
                    {this.show()}
                
                
            </table><br/><br/>
             <button className="paybt btn btn-success" onClick={this.passDetails}>Pay</button>
          <button onClick={this.props.isOdClosed} className="formStyle btn btn-danger">Close</button>
        </Modal>
          

            </div>
        
        );
    }


}
export default OrderModal;