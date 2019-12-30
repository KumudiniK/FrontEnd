import React, { Component } from 'react';

import axios from './../utils/axios';
import { Router } from 'react-router-dom';
import RestModal from './RestModal';




class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantList: [],
            modalState:false,
           Name:"",
           address:"",
           toggleState:null

        }
    }

    fetchFromServer=()=>{
        axios.get('').then(({ data }) => {
            console.log(data);
            this.setState({restaurantList:data})
            //this.setState({data})
        }).catch(error => {
            console.log(error);
        });
        

    }
    componentDidMount() {
        this.fetchFromServer()
        console.log("in DidMount")
        let xy=null
       
        const f=localStorage.getItem('toggleState')  //first check state in localStorage  
       
        if(f==null)                                //if it is null 
        {
            localStorage.setItem('toggleState',false) //set it a default value:false
            
            if(f==='true'){                            // localStorage.getItem() returns string,convert it to boolean
                xy=true
            }
               
            else{
                xy=false
            }

               
        }
        else{                                   // if there is state in localStorage
            const f=localStorage.getItem('toggleState')
            if(f==='true'){
                xy=true
            }
                
            else{
                 xy=false
            }
                
            
        }
        this.setState({toggleState:xy})             //at the end set state of localStorage to this.state
      
    }
    showDetails =(id) =>{
        console.log(id);
        console.log(this.props);
        const State=this.state.toggleState;
        this.props.history.push(''+id+'/detail',{toggleState:State})
      

    }
    deleteResto=(id)=>{
        console.log(id);
        axios.post(''+id+'/deleteResto/').then((Response)=>{
            console.log("Restaurant Deleted!")
            //console.log(this.state.restaurantList);
           // const index=this.state.restaurantList.indexOf(id)
            //console.log(index)
            let index
            for(let i=0;i<this.state.restaurantList.length;i++)
            {
                if(this.state.restaurantList[i].id==id)
                 index=i
                

            }
            console.log(index)
           const {restaurantList}=this.state
            this.state.restaurantList.splice(index,1)
            this.setState({restaurantList})
        }).catch(error=>{
            console.log(error);
        })

    }
    
    
    renderRestaurants = () => {
       const { restaurantList,modalState,toggleState } = this.state;
        const mapped = restaurantList.map((restaurant) => {
            if(!toggleState){   //if role is Admin ; toggleState:false
                return(
                    <div className="col-sm-3" key={restaurant.id}>
                  
                    <div className="card-body">
                        
                            <button className="bt btn btn-info" 
                            onClick={()=>{this.deleteResto(restaurant.id)}}>Delete</button>
                            <h4 className="card-title">
                        
                        {restaurant.Name}</h4>
                        <label>Address:</label><h6>{restaurant.address}</h6>
                        <button className="btn btn-warning" onClick={()=>{this.showDetails(restaurant.id)}}>Menu</button>
                    </div>
                </div>
                    
                );    
            }
            else{
                return (
                
                    <div className="col-sm-3" key={restaurant.id}>
                      
                        <div className="card-body">
                            
                               
                           <h4 className="card-title">
                            
                            {restaurant.Name}</h4>
                            <label>Address:</label><h6>{restaurant.address}</h6>
                            <button className="btn btn-warning" onClick={()=>{this.showDetails(restaurant.id)}}>Menu</button>
                        </div>
                    </div>
                )

            }
            
        })
        return mapped;
    }
    handleClick= (event)=>{
        this.setState({modalState:true})
        console.log(this.state.modalState);
    }
    isClosed=()=>{
        this.setState({modalState:false})
        
    }

    renderDetails= (Name,address)=>{
        //console.log(Name)
        const obj={name:Name,address:address}       //name:entry in DB for restaurant name 
        axios.post('addQ/',obj).then((Response)=>{
            console.log("Successfully added! ")
            this.fetchFromServer()
        }).catch(error => {
            console.log(error);
        });
        this.isClosed()
    }

    toggleRoleUser=()=>{
        const {toggleState}=this.state;  
            if(toggleState==false)
            this.setState({toggleState:! toggleState})
            localStorage.setItem('toggleState',true)
           
       
    }
    toggleRoleAdmin=()=>{
        const{toggleState}=this.state
        //console.log("admin"+toggleState)
        if(toggleState==true)
        this.setState({toggleState:!toggleState})
        localStorage.setItem('toggleState',false)

    }

    

    render() {
        const {toggleState}=this.state
      
        if(!toggleState){
            return (
                <div className="container">
                    
                    <h1 className="swiggy">Swiggy</h1>
                    <hr />
                    
                    <button className="btn btn-info" name="user" onClick={()=>{this.toggleRoleUser()}}>User</button>
                    
                <button style={{marginLeft:'20px'}} className="btn btn-danger" name="admin"
                 onClick={()=>{this.toggleRoleAdmin()}}>Admin</button>
                    <div className="row">
    
                        {this.renderRestaurants()}
                        <div className="col-sm-3">
    
                        <div className="card-body">
                            
                                             
                                <h3 className="card-title">Do You Want to add new Restaurant?</h3>
                           
                                    <button className="btn btn-warning"
                                    onClick={this.handleClick} >Add Restaurant</button>
                          
                        
                        
                                <RestModal isOpen={this.state.modalState} isClosed={this.isClosed} 
                                renderDetails={this.renderDetails} />
    
                            </div>
                        </div>
                        </div>
    
                    </div>
                
            );

        }
        else{
            return (
                <div className="container">
                    
                    <h1 className="swiggy">Swiggy</h1>
                    <hr />
                    
                    <button className="btn btn-info" name="user" onClick={()=>{this.toggleRoleUser()}}>User</button>
                    
                <button style={{marginLeft:'20px'}} className="btn btn-danger" name="admin"
                 onClick={()=>{this.toggleRoleAdmin()}}>Admin</button>
                    <div className="row">
    
                        {this.renderRestaurants()}
                        <div className="col-sm-3">
    
                        
                        <RestModal isOpen={this.state.modalState} isClosed={this.isClosed} 
                                renderDetails={this.renderDetails} />
    
                           
                        </div>
                        </div>
    
                    </div>
                
            );

        }
        
    }
}
export default RestaurantList;