import React from 'react'
import {Link} from 'react-router'
import Photo from './Photo'
import Comments from './Comments'

const Single = React.createClass({
  render() {
    let i = this.props.posts.findIndex((post) => post.code===this.props.params.postId) //loops over all posts? params comes from router
    let comments = this.props.comments[this.props.params.postId] || []
    return (
      <div className='single-photo'>
      <Photo i={i} post={this.props.posts[i]} {...this.props} />
      <Comments postComments={comments} {...this.props}></Comments> 
      </div>
      )
  }
})
                               
export default Single