import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledAlert, Table } from 'reactstrap';

import _ from 'lodash/collection'
import CreatePost from './CreatePost';
import Post from './Post';

const styles = {
  alert: {
    position: 'fixed',
    width: "100%",
    left: 10,
    right: 10,
    top: 10
  }
};
class PostsList extends React.Component {
  constructor(){
    super()
    this.state = {
      posts: [],
      isOpen: false,
      alert: ""
    }
    this.handleData = this.handleData.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  componentDidMount(){
    $.get("admin/posts").then(res => this.handleState(res)) 
  }
  handleData(){
    $.get("admin/posts").then(res => this.handleState(res)) 
  }
  alert(){
    this.setState({isOpen: true, alert: "Post deleted"})
    setTimeout(function(){
      this.setState({isOpen: false})
    }.bind(this), 2000)

  }
  handleRemove(){
    this.handleData()
    this.alert("post deleted")
  }
  handleAdd(){
    this.handleData()
    this.alert("post added")
  }
  handleState(posts){
    this.setState({ posts })
  }
  render () {
    const { posts } = this.state

    console.log(posts)
    return (
      <section className="container">
        <UncontrolledAlert
          style={styles.alert}
          isOpen={this.state.isOpen}
          toggle={this.onDismiss}
          color="primary">
          {this.state.alert}
        </UncontrolledAlert>
        <CreatePost addPost={this.handleAdd}/>
        <h1>All Posts</h1>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <Post removePost={this.handleRemove} key={post._id} post={ post }/>
          ))}
        </tbody>
      </Table>    
    </section>
    )
  }
}

export default PostsList;
