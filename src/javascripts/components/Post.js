import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
// Components

class Post extends React.Component {
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleChange(event){
  }

  handleDelete(e){
    console.log(this) 
    $.ajax({
      url: 'admin/posts',
      method: 'DELETE',
      data: { _id: this.props.post._id }
    })
      .then(() => {
        this.props.removePost()
      })
      .catch(res => this.handleError(true, res.response.data))
  }

  handleError(snackbar, error) {
    this.setState({snackbar, error})
  }
  render () {
    const post = this.props.post

    return (
      <tr >
        <td> { post.title } </td>
        <td> { post.content } </td>
        <td className="text-right">
          <Button onClick={this.handleDelete} color="danger" size="sm">x</Button>
      </td> 
      </tr>
    )
  }
}


Post.propTypes = {
  removePost: PropTypes.func.isRequired
}
export default Post;

