import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPages} from '../../actions/stories'
import {getAssociations} from '../../actions/associations'

import EmotionButtons from '../popuplayers/EmotionButtons'
import StoryEnd from './StoryEnd'

class StoriesPage extends React.Component {
  constructor (props){
    super (props)

    this.state = {
      pages: [],
      answers: [],
      questions: [],
      emotions: [],
      buttonsVisible: false,
      pageTracker: 0,
      selectorVisible: true
    }
    this.showAnswerOptions = this.showAnswerOptions.bind(this)
    this.showEmotionButtons = this.showEmotionButtons.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(getPages()),
    this.props.dispatch(getAssociations())
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      pages: nextProps.pages,
      emotions: nextProps.associations
    })
  }

  showAnswerOptions () {
    this.setState({
      optionsVisible: true,
      selectorVisible: false
    })
  }

  showEmotionButtons () {
    let emotionState = this.state.buttonsVisible ? false : true
    this.setState ({
      buttonsVisible: emotionState
    })
  }

  handleClick(e) {
  let currentPageUpdate = this.state.pageTracker
  if (e.currentTarget.value == 'one') {
    this.setState ({
      pageTracker: currentPageUpdate + 1,
      answers: [...this.state.answers, this.state.pages[this.state.pageTracker].optionOne],
      questions: [...this.state.questions, this.state.pages[this.state.pageTracker].pageText]
    })
  } else {
    this.setState ({
      pageTracker: currentPageUpdate + 2,
      answers: [...this.state.answers, this.state.pages[this.state.pageTracker].optionTwo],
      questions: [...this.state.questions, this.state.pages[this.state.pageTracker].pageText]
    })
  }
}

  render() {
    let currentStoryInFull = {
      user_id: this.props.auth.user.id,
      story_id: Number(this.props.match.params.id),
      title: this.props.stories.title,
      questions: this.state.questions,
      emotions: this.state.emotions,
      answers: this.state.answers
    }
    return (
      <div className="columns is-two-thirds">
        {(this.state.pageTracker >= this.state.pages.length) && <StoryEnd storyUpdate={currentStoryInFull} />}
        <div className="column is-2">
          <Link className="button is-medium" to={`#`} onClick={this.showEmotionButtons}>How are you feeling?</Link>
          <hr />
          {this.state.buttonsVisible && <EmotionButtons page={this.state.pages} tracker={this.state.pageTracker}/>}
        </div>

        {(this.state.pages.length > 0 && this.state.pageTracker < this.state.pages.length) && <div className="column is-10 box">
          <h1 className="has-text-centered is-size-2">{this.state.pages[this.state.pageTracker].title}</h1>
          <img className="background-img" src={this.state.pages[this.state.pageTracker].background}/>
          <img className="population-img" src={this.state.pages[this.state.pageTracker].population} alt="people"/>

          <div className="textarea box">
            <p className="has-text-centered is-size-4">
              {this.state.pages[this.state.pageTracker].pageText}
              {this.state.selectorVisible && <Link className="button is-medium is-pulled-right" to={`#`} onClick={this.showAnswerOptions}>
              Click to answer &nbsp;
              <span className="icon"><i className="far fa-arrow-alt-circle-right"></i></span>
            </Link>}
          </p>
            {this.state.optionsVisible && <div>
              <button className="button has-text-centered is-rounded is-medium is-size-4 is-info is-pulled-left" onClick={(e) => this.handleClick(e)} value="one">
                {this.state.pages[this.state.pageTracker].optionOne}
              </button>
              <button className="button has-text-centered is-rounded is-medium is-size-4 is-info is-pulled-right" onClick={(e) => this.handleClick(e)} value="two">
                {this.state.pages[this.state.pageTracker].optionTwo}
              </button>
            </div>}
        </div>
      </div>}
    </div>
  )
}
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(StoriesPage)
