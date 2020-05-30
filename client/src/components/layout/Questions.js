import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllQuestions } from '../../actions/questions';
import PropTypes from 'prop-types';
import './Questions.css'

// IMPORTING ICONS
// import  { AiFillLike } from 'react-icons/ai';
// import { AiFillDislike } from 'react-icons/ai';

const Questions = ({ getAllQuestions, questions:{ questions, loading } }) => {

    useEffect(() => {
        getAllQuestions();
    }, [  ])
     
    console.log(questions);

    return (
        <div className = 'questions'>
          <div className = 'feeds'>
            {
              !loading && questions !== null ? (
                <Fragment>
                  {
                    questions.map((question, index) => (

                      <div className = 'question-div' key = {index}>
                        <div className = 'asker'>
                          <p className=' mb'> <b>{ question.name }</b></p>
                          <p className=' tag mb'><b>{ question.tags }</b></p>
                        </div>
                        <div className='question'>
                          <p>{ question.question }</p>
                        </div>
                        <div className = 'vote'>
                        <p className = 'ans-count'>
                          {
                            question.answers.length === 1 ?(
                              <Fragment> 1 Answer </Fragment>
                            ):(<Fragment><b> {question.answers.length} Answers </b></Fragment>)
                          }
                        </p>
                        <Link to = {`/questions/${question._id}`} className='discussion'>
                          Discussion
                        </Link>
                        </div>
                      </div>    
                    ))
                  }
                </Fragment>
              )  : (<Fragment></Fragment>)
            }
          </div>  
        </div>
    )
}

Questions.propTypes  = {
  getAllQuestions: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired
}


const mapStateToProps = state => {
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps, { getAllQuestions })(Questions);