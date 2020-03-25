import React from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../actions'


class SurveyList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(deleteSurvey)
    this.props.fetchSurveys()
  }

  renderSurveys = () => {

    return this.props.surveys.map(survey => {
      return (
        <div className='card blue darken-1' key={survey._id}>
          <div className='card-content text-white'>
            <span className='card-title'>{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className='right'>
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className='card-action'>
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
            <button onClick={() => this.props.deleteSurvey(survey._id)} className="waves-effect waves-light small btn right">delete</button>
          </div>
        </div>
      )
    })

  }


  render() {

    return (
      <div>
        {
          this.renderSurveys()
        }

      </div>
    )
  }
}

const mapStateToProps = ({ surveys }) =>({
  surveys
})


export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)