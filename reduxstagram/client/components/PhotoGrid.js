import React from 'react'
import {Link} from 'react-router'
import Photo from './Photo'

//... is spread function, basically copies the whole thing
const PhotoGrid = React.createClass({
  render() {
    return (
      <div className='photo-grid'>
      {this.props.posts.map((post,i) => <Photo key={i} i={i} post={post} {...this.props}/>)}
      </div>
      )
  }
})
                               
export default PhotoGrid
