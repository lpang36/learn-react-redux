import React from 'react'
import {Link} from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const Photo = React.createClass({
  render() {
    return (
      <figure className='grid-figure'>
      <div className='grid-photo-wrap'>
      <Link to={`/view/${this.props.post.code}`}>
      <img src={this.props.post.display_src} alt="this.props.post.caption"/>
      </Link>
      <CSSTransitionGroup transitionName='like' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      <span key={this.props.post.likes} className='likes-heart'>{this.props.post.likes}</span>
      </CSSTransitionGroup>
      </div>
      <figcaption>
      <p>{this.props.post.caption}</p>
      <div className='control-buttons'>
      <button onClick={this.props.increment.bind(null,this.props.i)} className='likes'>&hearts; {this.props.post.likes}</button>
      <Link className='button' to={`/view/${this.props.post.code}`}>
      <span className='comment-count'>
      <span className='speech-bubble'></span>
      {this.props.comments[this.props.post.code] ? this.props.comments[this.props.post.code].length : 0}
      </span>
      </Link>
      </div>
      </figcaption>
      </figure>
      )
  }
})
                                
export default Photo;