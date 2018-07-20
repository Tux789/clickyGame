import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Image from "./components/Image";
import imagesJSON from "./images.json";

class App extends Component {
  //state holds copy of score and image object array
  state = {
    score: 0,
    images: imagesJSON,
  }

  //clear state on initialization
  componentDidMount() {
    this.resetGame();
  }


  //reset all clicked images to unclick and reset score to zero
  resetGame = () => {
    console.log("IN RESET");
    console.log("imagesJSON: " + JSON.stringify(imagesJSON));

    let _images = this.state.images;
    _images.forEach(image => image.clicked = false);

    this.setState({
      score: 0,
      images: _images,
    }, this.documentState);

  }

  //helper function to give me an array of non-repeating random numbers between 0 and images.length-1
  generateRenderOrder = () => {
    let renderOrder = [];
    while (renderOrder.length < this.state.images.length) {
      let random = Math.floor(Math.random() * this.state.images.length)
      // console.log("random #: " + random)
      if (renderOrder.indexOf(random) === -1) {
        renderOrder.push(random);
        //console.log("PUSHED renderOrder:" + renderOrder);
      }
    }
    return renderOrder;
  }

  generateImagesInRandomOrder = () => {
    let _images = [];
    let renderOrder = this.generateRenderOrder();
    for (let i = 0; i < renderOrder.length; i++) {

      _images.push(this.state.images.find(element => element.id === renderOrder[i]));

      //console.log("IMAGES: " + JSON.stringify(_images));
    }
    console.log("IN SHUFFLE IMAGES");
    console.log(JSON.stringify(_images));
    this.setState({ images: _images, }, this.documentState);
  }

  documentState() {
    console.log(`Score: ${this.state.score}`);
    console.log(`Images: ${JSON.stringify(this.state.images)}`);
  }

  clickHandler = event => {
    let _images = this.state.images;
    let _score = this.state.score;
    console.log("IN CLICK HANDLER");
    console.log("Target: " + JSON.stringify(this.state.images[event.target.id]));
    console.log("Click Status: " + this.state.images[event.target.id].clicked);
    if (this.state.images[event.target.id].clicked) {
      console.log("IN CLICK HANDLE, RESET GAME");
      this.resetGame();
    }
    else {
      _score += 10;
      _images[event.target.id].clicked = true;
      console.log("IN CLICK HANDLER, CLICK FALSE LOGIC");
      this.setState({
        score: _score,
        images: _images
      }, this.documentState);
    }
    this.generateImagesInRandomOrder();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Clicky-Game</h1>
        </header>
        <p className="App-intro">
          The goal of the game is to click on each image only once<br />
          If you click on the same image more than once, you lose and the game is reset<br />
          The images will be reordered after each click<br />
        </p>
        <h3>Current Score: {this.state.score}</h3>

        {this.state.images.map((image) =>
          <Image id={this.state.images.indexOf(image)} src={image.src} name={image.name} imageid={image.id} clicked={image.clicked.toString()} onClick={this.clickHandler} />
        )}

      </div>
    );
  }
}

export default App;
