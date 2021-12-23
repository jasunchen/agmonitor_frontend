import React from 'react';
import CollapsiblePanel from "./CollapsiblePanel";
import { Link } from 'react-router-dom'
import SpecificAssetPage from "./SpecificAssetPage"


class DashboardAssets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newItem1: "",
        newItem2: "",
        list: []
      };
    }

    // handleChange(evt) {
    //     const value = evt.target.value;
    //     this.setState({
    //         ...this.state,
    //         [evt.target.name]: value
    //     });
    // }
    updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
    }


    addItem() {
        // create a new item with unique id
        const newItem = {
          value1: this.state.assetName, 
          value2: this.state.assetDescription
        };
    
        // copy current list of items
        const list = [...this.state.list];
    
        // add the new item to the list
        list.push(newItem);
    
        // update state with new list, reset the new item input
        this.setState({
          list,
          assetName: "",
          assetDescription: ""
        });
    }

    deleteItem(value1) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.value1 !== value1);
    
        this.setState({ list: updatedList });
      }
    
    editItemName(value1, newValue1) {
      // copy current list of items
      const newList = [...this.state.list];
      for(let i = 0; i < newList.length; i++){
        if (newList[i].value1 == value1){
          newList[i].value1 = newValue1
        }
      };
      
  
      this.setState({ list: newList });
    };


    editItemDescription(value2, newValue2) {
      // copy current list of items
      const newList = [...this.state.list];
      for(let i = 0; i < newList.length; i++){
        if (newList[i].value2 == value2){
          newList[i].value2 = newValue2
        }
      };
      
  
      this.setState({ list: newList });
    };
  

    
    render() {
      return (
        <div>
  
        <h1></h1>
          
          <div className="container">
          <div
            style={{
              padding: 30,
              textAlign: "left",
              maxWidth: 500,
              margin: "auto"
            }}
          >
            Add an Asset...
            <br />
            <input
              type="text"
              placeholder="Type asset name here"
              name = "assetName"
              value={this.state.assetName}
              onChange={e => this.updateInput(e.target.name, e.target.value)}
            />
            <input
              type="textarea"
              placeholder="Type asset description here"
              name = "assetDescription"
              value={this.state.assetDescription}
              onChange={e => this.updateInput(e.target.name, e.target.value)}
              style={{width: "400px"}}
            />
            <button
              className="add-btn btn-floating"
              onClick={() => this.addItem()}>
              Add
            </button>
  

            <br /> <br />
            <ul>
              {this.state.list.map(item => {
                return (
                    <CollapsiblePanel title={item.value1} collapse={false}>
                     <p style={{fontWeight: "bold"}}>Description: </p> <p>{item.value2} </p>
                    <Link to={`/dashboard/${item.value1}`}> <button>See full settings for {item.value1} </button></Link>
                    <br></br>
                   <br></br>
                    <button onClick={() => this.deleteItem(item.value1)}>Delete
                    </button>
                    <br></br>
                   <br></br>

                    <input type="text"
                    placeholder="new asset name here"
                    name = "assetName"
                    value={this.state.assetName}
                    onChange={e => this.updateInput(e.target.name, e.target.value)} ></input> 
                    <br></br>
                    <button
                     onClick={() => this.editItemName(item.value1,this.state.assetName)}>
                      edit asset name
                   </button>

                   <br></br>
                   <br></br>

                   <input type="text"
                    placeholder="new asset description here"
                    name = "assetDescription"
                    value={this.state.assetDescription}
                    onChange={e => this.updateInput(e.target.name, e.target.value)}
                    style={{width: "400px"}} ></input>
                     <br></br>
                   
                    <button
                     onClick={() => this.editItemDescription(item.value2,this.state.assetDescription)}>
                      edit asset description
                   </button>
                   
                  </CollapsiblePanel>
                );
              })}
            </ul>

          </div>
        </div>
        </div>
      );
    }
  }
  
export default DashboardAssets