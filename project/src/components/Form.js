import React from 'react'

class AddItems extends React.Component {

  constructor(){
    super()
    console.log("this is constructor")
    this.state = {
      counter:0
    }
  }
  componentDidMount(){
    console.log("this is component did mount")
  }

  componentDidUpdate(){
    console.log("this is component did update")
  }
  render() {
    
    console.log("this is render");
    return (
      <>
      {this.state.counter}<br/>
      <button onClick={() => this.setState({counter:this.state.counter+1})}>
        click me
      </button>
      </>
    )
  }
}


export default AddItems;
