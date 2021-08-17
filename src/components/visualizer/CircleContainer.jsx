import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle} from 'react-konva';
import Konva from 'konva';

class ColoredCircle extends Component {
  state = {
    color: 'pink',
    //x: this.props.x,
    //y: this.props.y,
  };

  render() {
    return(
      <Circle
        x={this.props.x}
        y={this.props.y}
        radius={15}
        fill={this.state.color}
        stroke={'black'}
        strokeWidth={2}
      />

    );
  }
}

class CircleText extends Component {
  render(){
    return(
      <Text
        x={this.props.x}
        y={this.props.y}
        text={this.props.value}
        fontSize={10}
        fontFamily={'Calibri'}
        //align={'center'}
      />
    );
  }
}

const array = [1];

class JosephRing extends Component {
  state = {
    n: 1,
    radius: 250,
  };
  render(){
    return(
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
      {this.props.array.map((value, i) => {
        var width = (this.state.radius*2)+50;
        var angle = ((this.props.value-1) / (this.state.n/2)) * Math.PI; // Calculate the angle at which the element will be placed.
        var x = (this.state.radius*Math.cos(angle))+(width/2)+(400-this.state.radius);
        var y = (this.state.radius*Math.sin(angle))+(width/2)+(400-this.state.radius);
        <div>
          <ColoredCircle 
            x={x}
            y={y}
          />
          <CircleText 
            x={x}
            y={y}
            text={value}
          />
        </div>
        })}
        </Layer>
      </Stage>
    );
  }
}
/*
export class CircleContainer extends Component {
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <JosephRing array={array}/>
    );
  }
}
*/
export function CircleContainer(){
  return(<JosephRing array={array}/>);
}