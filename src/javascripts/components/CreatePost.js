import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledAlert, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';
// Components

class CreatePost extends React.Component {
  constructor(){
    super()
    this.state = {
      title: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    const { id, value } = event.target
    id === 'title' ? this.setState({ title: value}) : this.setState({ content: value })
  }

  handleSubmit(e){
    console.log(e)
    e.preventDefault()
    const { title, content } = this.state
    $.post("admin/posts", { title, content })
      .then(() => {
        this.props.addPost()
        this.setState({ title: '', content: ''})
        setTimeout(function(){
          this.setState({isOpen: false})
        }.bind(this), 2000)
      })
      .catch(res => {
        this.handleError(true, res.response.data)
      }
      )
  }
  render () {
    const { content, title } = this.state

    return (
      <div>
        <Jumbotron className="py-4">
          <h3>Create a post!</h3>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>

          <Form  className="" onSubmit={this.handleSubmit}>

            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                value={ title }
                onChange={this.handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="Title" />
            </FormGroup>      
            <FormGroup>
              <Label for="content">Content</Label>
              <Input
                value={ content }
                onChange={this.handleChange}
                type="textarea"
                name="content"
                id="content" 
                placeholder="Write something ..." />
            </FormGroup>
            <Button color="primary">Create Post</Button>

          </Form>
        </Jumbotron>
      </div>

    )
  }
}

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default CreatePost;
