import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types.js'

export const fetchUser = () => dispatch => {
  axios.get('/api/currentUser')
    .then((res) => dispatch({ type: FETCH_USER, payload: res.data}))
    .then(() => {
      axios.get('/api/surveys')
        .then(res => dispatch({ type: FETCH_SURVEYS, payload: res.data}))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  //dispatch({type: FETCH_USER, payload: res.data})

}


export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({type: FETCH_USER, payload: res.data})
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)

  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })

}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')

  dispatch({ type: FETCH_SURVEYS, payload: res.data})

}