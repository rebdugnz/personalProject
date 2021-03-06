import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {newUser} from '../../actions/users'

let baseUser = {
  username: '',
  email: '',
  avatar: '',
  password: ''
}

class Signup extends React.Component {
      constructor (props) {
        super (props)

        this.state = {
          user: {...baseUser},
          userCreated: false
        }
        this.submit = this.submit.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }

      submit(e) {
        e.preventDefault()
        let user = this.state.user
        this.props.dispatch(newUser(user))
        this.setState({
          user: {...baseUser},
          userCreated: true
        })
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
    <div className="hero-body columns">
        <div className="column is-6 is-offset-3">
          <h1 className="is-size-1 has-text-grey-light has-text-weight-bold">Welcome to StoryTime</h1>

          <div style={{width: '50vw', marginTop: '2.5vw'}}>
            <div style={{width: '20vw', float: 'left'}} className="box">
              <figure style={{marginTop: '1.5vw'}} className="image is-3by2">
                <img src="/images/smallbook.jpg"/>
              </figure>
            </div>

            <h2 style={{width: '20vw', float: 'right'}} className="is-size-3 is-spaced has-text-grey-light">Let's get started!</h2>

            <form style={{width: '20vw', float: 'right', marginTop: '1.5vw'}} onSubmit={this.submit}>
              <div className="field control">
                <input className={inputStyle} placeholder="Enter your username"
                  name="username" onChange={this.updateUser} value={this.state.username} />
              </div>

              <div className="field control">
                <input className={inputStyle} placeholder="Enter your email"
                  name="email" onChange={this.updateUser} value={this.state.email} />
              </div>

              <div className="field control">
                <input className={inputStyle} placeholder="Insert Image URL"
                  name="avatar" onChange={this.updateUser} value={this.state.avatar} />
              </div>

              <div className="field control">
                <input className={inputStyle} placeholder="Choose a password"
                  name="password" onChange={this.updateUser} value={this.state.password} />
              </div>

              <input style={{marginTop: '.5vw'}} className="button is-info is-medium" type="submit" value="Create Profile"/>
            </form>
            {this.state.userCreated === true ? <Redirect to='/users'/> : <Redirect to='/signup'/>}
          </div>
        </div>
    </div>
  )
 }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Signup)
