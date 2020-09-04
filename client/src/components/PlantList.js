import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(){
    super();
    this.state = {
      plants: [],
      searchValue: '',
      fullPlants: [],
    }
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount(){
    axios.get('http://localhost:3333/plants')
      .then(response => {
        this.setState({plants: response.data.plantsData, fullPlants: response.data.plantsData});
      })
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.searchValue.toLowerCase() !== prevState.searchValue.toLowerCase()){
      this.setState({plants: this.state.fullPlants
        .filter(plant => plant.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))})
    }
  }
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <>
        <nav>
        <label
            htmlFor='search' 
            style={{width: '100%', margin: '1rem auto', textAlign: 'center'}}
          >
            Search Plants
          </label>
              <input
              type='text'
              id='search'
              value={this.state.searchValue}
              onChange={(e) => this.setState({searchValue: e.target.value})}
              style={{width: '50%', margin: '0.25rem auto'}}
              />
          
          </nav>
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
      </main>
      </>
    );
  }
}
