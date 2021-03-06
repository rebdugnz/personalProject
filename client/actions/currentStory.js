import request from '../utils/api'

export const addCurrentStory = currentStory => {
    return {
        type: 'ADD_STORY',
        currentStory
    }
}

export const receiveSavedStories = savedStories => {
  return {
    type: 'RECEIVE_SAVED_STORIES',
    savedStories
  }
}
export function getSavedStories () {
  return dispatch => {
    return request('get','/saved')
    .then(res => {
      dispatch(receiveSavedStories(res.body.savedStories))
    })
    .catch(err => {
      console.log('Err in actions get saved', err.message);
    })
  }
}

export function saveStory (currentStory) {
  return dispatch => {
    return request('post', '/saved', currentStory)
    .then(res => {
      dispatch(addCurrentStory(res.body))
    })
    .catch(err => {
      console.log('Err in actions post saved', err.message);
    })
  }
}
