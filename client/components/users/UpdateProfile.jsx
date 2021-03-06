import React from 'react'
import {connect} from 'react-redux'

import {getUserById, updateUserInfo} from '../../actions/users'

class UpdateProfile extends React.Component {
      constructor (props) {
        super (props)

        this.state = {
          user: {
            username: this.props.users.username,
            email: this.props.users.email,
            avatar: this.props.users.avatar,
            saved_avatar: this.props.users.saved_avatar,
            saved_stories: this.props.users.saved_stories
          },
          userUpdated: false,
        }
        this.submit = this.submit.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }

      submit(e) {
        e.preventDefault()
        let user = this.state.user
        let id = this.props.users.id
        this.props.dispatch(updateUserInfo(id, user))
        this.setState({
          user: {
            username: this.props.users.username,
            email: this.props.users.email,
            avatar: this.props.users.avatar,
            saved_avatar: this.props.users.saved_avatar,
            saved_stories: this.props.users.saved_stories
          },
          userUpdated: true
        })
        this.props.dispatch(getUserById(this.props.users.id))
      }

      updateUser(e) {
        let user = this.state.user
        user[e.target.name] = e.target.value
        this.setState ({
          user
        })
      }

  render() {
  let inputStyle = 'input is-medium'
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head modal-color">
          <h1 className="modal-card-title is-size-1 has-text-link has-text-weight-bold">Let's Update Your Details {this.props.users.username}</h1>
          </header>

          <div className="modal-card-body modal-color">
            <div style={{width: '20vw', height: '20vw', float: 'left'}} className="box">
              <figure className="image is-1by1">
                <img src={this.props.users.saved_avatar ? this.props.users.saved_avatar : this.props.users.avatar}/>
              </figure>
            </div>

            <form className="modal-color" style={{width: '37vw', float: 'right', marginTop: '1.5vw'}} onSubmit={this.submit}>
              <div className="field control">
                <input className={inputStyle} placeholder={this.props.users.username}
                  name="username" onChange={this.updateUser} value={this.state.username} />
              </div>

              <div className="field control">
                <input className={inputStyle} placeholder={this.props.users.email}
                  name="email" onChange={this.updateUser} value={this.state.email} />
              </div>

              <div className="field control">
                <input className={inputStyle} placeholder={this.props.users.avatar}
                  name="avatar" onChange={this.updateUser} value={this.state.avatar} />
              </div>

              <input style={{marginTop: '.5vw'}} className="button is-info is-medium" type="submit" value="Submit"/>
            </form>
          </div>

          <footer className="modal-card-foot">
            <button className="button is-medium is-link is-fullwidth is-rounded" onClick={this.props.hideModal}>
              Back To Profile
            </button>
          </footer>
        </div>
    </div>
  )
 }
}

const mapStateToProps = state => state


export default connect(mapStateToProps)(UpdateProfile)
