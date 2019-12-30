import React, { Component } from 'react';
import './RestoDetails.css';

import axios from './../utils/axios';
import ItemModal from './ItemModal';
import OrderModal from './OrderModal';


class RestoDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            address:"",
            list:[],
            modalState:false,
            oModalState:false
           
            
        }

    }
    fetchFromServer=()=>{
        const id = this.props.match.params.id
        console.log(id);
        axios.get(''+id+'/detail/').then(({ data }) => {
            console.log(data);
            this.setState({Name:data.Name,address:data.address,list:data.list})
            
           
        }).catch(error => {
            console.log(error);
        });

    }

    componentDidMount() {
       this.fetchFromServer();
    }

    deleteItem=(id)=>{
        console.log(id)
        axios.post(''+id+'/deleteItem/').then((Response)=>{
            console.log("Item  Deleted!")
            let index
            for(let i=0;i<this.state.list.length;i++)
            {
                if(this.state.list[i].id==id)
                 index=i
                

            }
            console.log(index)
           const {list}=this.state
            this.state.list.splice(index,1)
            this.setState({list})
        }).catch(error=>{
            console.log(error);
        })
    }

    orderNow=(id)=>{
        
        const {list}= this.state;
        
        const refItem=list.filter((items)=>items.id==id);
        //console.log(refItem)
        if(!refItem[0].count) {
            refItem[0].count = 0;
        }
        refItem[0].count+=1
        console.log(refItem[0].count)
       this.setState({list})
       
        
      

    }
    isOdClosed=()=>{
        
            this.setState({oModalState:false})
        
    }
    handleModal=()=>{
        this.setState({oModalState:true}); 
       
    }
    placeOrder=()=>{
        const id = this.props.match.params.id
        console.log(this.state.list)

    for(let i=0;i<this.state.list.length;i++)
        {
           // console.log("id"+this.state.list[i].id+"count:"+this.state.list[i].count)
           if(this.state.list[i].count>0){
             const obj=[{itemid:this.state.list[i].id,count:this.state.list[i].count}]
              axios.post(''+id+'/userOrder/',obj).then((Response)=>{
                  console.log("order placed")
                }).catch(error=>{
                  console.log(error)
                })


            }
        }
        this.isOdClosed()

       }    

   
    

   

    renderRestoDetails =()=>{
        const { list } = this.state;
        

        const mapped = list.map((dishes) => {
            
            const{toggleState}=this.props.history.location.state
            
           if(!toggleState){
            return (
            
                <div className="col-sm-3" key={dishes.id}>
           <button className="btn btn-warning">{dishes.count}</button>
                  
                
                    <div className="card-body"><button className="btn btn-danger"
                    onClick={()=>{this.deleteItem(dishes.id)}}>Delete</button>
                        <h4 className="card-title">
                         <img src=""/>   
                        {dishes.MenuItem}</h4>
                        <h6>{dishes.Price}</h6>
                        <button className="bt btn btn-success"
                                onClick={()=>{this.orderNow(dishes.id)}}>Add</button>
                       
        
        

                        
                    </div>
                </div>
               
            )

           }
           else{
                    
                return (
            
                    <div className="col-sm-3" key={dishes.id}>
                      
                    
                        <div className="card-body">
                        <button className="btn btn-warning">{dishes.count}</button>
                            <h4 className="card-title">
                             <img src=""/>   
                            {dishes.MenuItem}</h4>
                            <h6>{dishes.Price}</h6>
                            <button className="bt btn btn-success"
                                onClick={()=>{this.orderNow(dishes.id)}}>Add</button>


             
                        </div>
                       
                    </div>
                   
                )
           }


           
              

            
            
        })
        return mapped;
    }
    handleClick=()=>{
        this.setState({modalState:true})

    }

    isClosed=()=>{
        this.setState({modalState:false})
    }
    renderItems=(Item,Price)=>{
        const id = this.props.match.params.id;
        const obj={dish:Item,price:Price}
        axios.post(''+id+'/addItems/',obj).then((Response)=>{
            console.log("Items added Successfully! ")
            this.fetchFromServer()

        }).catch(error=>{
            console.log(error);
        });
        this.isClosed()

    }

    render(){
        const{Name,address}=this.state;
        
        const{toggleState}=this.props.history.location.state
           console.log("fetched state:"+toggleState)
        if(!toggleState){
            return(
                <div>
                    <h1 className="swiggy">Swiggy</h1>
                    <hr/>
            <marquee className="slide">Welcome to Hotel {Name}</marquee>
                    <div className="StaticBox">
                        <h1 className="level1">Hotel {Name}</h1>
                        <h3 className="level2">Address: {address}</h3>
                    </div>
                    <button className="btn btn-primary" onClick={()=>{this.handleModal()}}>place order</button>

                    

                    <OrderModal isOpen={this.state.oModalState} isOdClosed={this.isOdClosed} placeOrder={this.placeOrder}
                     list={this.state.list} />

                  <div className="row">
                    {this.renderRestoDetails()}
                    <div className="col-sm-3">
    
                        <div className="card-body">
                        <h3 className="card-title">Do You Want to add new item?</h3>
                             <button className="btn btn-success" onClick={this.handleClick}>Add Item</button>

                             <br/>
                            
    
                         <ItemModal isOpen={this.state.modalState} isOdClosed={this.state.isOdClosed} 
                         renderItems={this.renderItems}/>
                        </div>
                    </div>
    
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1 className="swiggy">Swiggy</h1>
                    <hr/>
            <marquee className="slide">Welcome to Hotel {Name}</marquee>
                    <div className="StaticBox">
                        <h1 className="level1">Hotel {Name}</h1>
                        <h3 className="level2">Address: {address}</h3>
                    </div>
                    <button className="btn btn-primary" onClick={()=>{this.handleModal()}}>place order</button>
                    

                    <OrderModal isOpen={this.state.oModalState} isClosed={this.isClosed} list={this.state.list}
                    placeOrder={this.placeOrder}
                    />

                  <div className="row">
                    {this.renderRestoDetails()}
                    <div className="col-sm-3">
    
                        
                       
    
                         <ItemModal isOpen={this.state.modalState} isClosed={this.state.isClosed} 
                         renderItems={this.renderItems}/>
                        
                    </div>
    
                    </div>
                </div>
            );
        }
        
            

        
               

        
       
    }

   
}
export default RestoDetails;