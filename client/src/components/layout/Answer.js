import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { getThisQuestion } from '../../actions/questions';
import { updateThisQuestion } from '../../actions/questions';
import { deleteThisQuestion } from '../../actions/questions';
import PropTypes from 'prop-types';

import Answers from './Answers';
import NoAnswers from './NoAnswers';
import Modal from 'react-modal';
import { setAlert } from '../../actions/alert'

import AnswerForm from './AnswerForm';
import  { voteThisQuestion } from '../../actions/questions';


// IMPORTING ICONS
import  { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai'

const Answer = (props) => {

    let { questions: { question , loading }, getThisQuestion, updateThisQuestion, voteThisQuestion, deleteThisQuestion, match, auth: {user}, setAlert } = props;

    let [questionModal, setQuestionModal] = useState(false);
    let [editedQuestion, setEditedQuestion] = useState('');

    useEffect(() => {
        getThisQuestion(match.params.id);  
        
    }, [ getThisQuestion, match.params.id ]);

    const onSubmit = (e) => {
        e.preventDefault();
        updateThisQuestion({
            question: editedQuestion,
            qid: question._id
        });
        setQuestionModal(false);
        setAlert('Question updated');
    }

    const deleteQuestion = (id) => {
         deleteThisQuestion(id);
         props.history.push('/questions');
    }

    const vote = (e, qid, voteType) => {      
        voteThisQuestion({ qid, voteType});
    }

    console.log(question)

    return (
        <div className = 'qa-div-container'>{
            !loading && question !== null ? 
            (
                <div className = 'qa-div' >
                <div className = 'asker'>
                    <p className=' mb'> <b>{ question.name }</b></p>
                    <p className=' tag mb'><b>{ question.tags }</b></p>
                </div>
                <div className='question qa-question'>
                    <p>{ question.question }</p>
                </div>
                <hr className = 'hline'/>
                <div className = 'vote'>
                  <AiFillLike size='1.3rem'  className='icon' onClick = {(e) => vote(e, question._id, 'upvote')}/><span className='vote-count'> {question.upvotes.length} </span>
                  <AiFillDislike size='1.3rem' className='icon' onClick = {(e) => vote(e, question._id, 'downvote')}/><span className='vote-count'> {question.downvotes.length} </span>
                  {
                        question.user === user._id ? (
                         <Fragment>
                             <AiFillDelete size='1.3rem' className='private-icon' onClick = {(e) => deleteQuestion(question._id)}/>
                             <AiFillEdit size='1.3rem' className='private-icon' onClick = { () => setQuestionModal(true)}/>    
                         </Fragment>
                     ) : (<Fragment></Fragment>)
                  }
                  <Link to = '/questions' className = 'btn-pri'> Back </Link>                  
                </div>
                <AnswerForm qid = { question._id }/>
                <div className = 'answer-div'> 
                
                  {
                      question.answers.length === 0 ? 
                     <NoAnswers /> :
                     <Answers answers = { question.answers } qid = {question._id}/>
                  }

                <Modal isOpen = { questionModal } onRequestClose = { () => setQuestionModal(false)}>
                   <form onSubmit = { (e) => onSubmit(e)}>
                        <div className = "form-group-2">
                          <label className = "label"> Edit question </label><br/>
                          <input value = {editedQuestion} type = "text" name='question' placeholder = "write question here..." onChange = { (e) => setEditedQuestion( e.target.value )} required/>
                        </div>
                        <div className = "form-group-2">
                          <button type = "submit" className = 'auth-btn-modal'> Save changes </button>
                        </div> 
                   </form>        
                </Modal>

                </div>

                </div> 
            ):(<Fragment></Fragment>)
        }
        </div>
    )
}

Answer.propTypes  = {
    getThisQuestion: PropTypes.func.isRequired,
    updateThisQuestion: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    deleteThisQuestion: PropTypes.func.isRequired,
    voteThisQuestion: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        questions: state.questions,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getThisQuestion, updateThisQuestion, setAlert, deleteThisQuestion, voteThisQuestion })(Answer);
