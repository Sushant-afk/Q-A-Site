import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { postThisQuestion } from '../../actions/questions';
import PropTypes from 'prop-types';
import './dashboard.css';
import  { createProfile } from '../../actions/profile';
import Modal from 'react-modal';

const Home = (props) => {

    let { getCurrentProfile, postThisQuestion, createProfile, auth: { user }, profile: { profile, loading }, questAdded } = props;

    const [profileModal, setProfileModal] = useState(false);
    const [questionModal, setQuestionModal] = useState(false);

    const [ profileData, setProfileData ] = useState({
        education: '',
        location: '',
        knowsAbout: '',
        status: '',
        bio: ''
    });

    const { education, location, knowsAbout, status, bio } = profileData;

    const [ questionData, setQuestionData ] = useState({
        question: '',
        tags: ''
    });

    const { question, tags } = questionData;


    const onChangeProfile = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value})
     }
     const onChangeQuestion = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value})
     } 

     const submitProfileData = (e) => {
          e.preventDefault();

          if(education.trim() && location.trim() && knowsAbout.trim() && status.trim() && bio.trim())
          {
              //console.log(profileData, user._id)
              createProfile( profileData, user._id )
              setProfileModal(false)
          }
          else {
            alert('Please enter every field! we will not share anything! ')
          }
     }

     const submitNewQuestion = (e) => {
         e.preventDefault();

         if( question.trim() && tags.trim() )
         {
           
            postThisQuestion(questionData);
            //console.log(id);
            setQuestionModal(false);
            console.log('questAdded', questAdded);
            props.history.push(`/questions/${questAdded}`);
         }
         else {
            alert('Please enter every field! we will not share anything! ')
         }
     }


    useEffect(() => {
        console.log('getting profile');
        getCurrentProfile();
    }, [ getCurrentProfile, loading ]);

   
    return (
        <Fragment>
         {
            !loading && user !== null ? (
                <div className = "home">
                <div className = 'profile'>
                    <p className = 'greeting'> <b className = 'welcome'>Welcome </b> { user.name} </p><br/>
                    <button className = 'update-btn' onClick = { () => setProfileModal(true)}> Update Profile </button>
                    <button className = 'update-btn' onClick = { () => setQuestionModal(true)}> Ask Question </button>
                    {
                    profile && (
                    <Fragment>
                        <p className = 'pro'> { profile.location } </p><br/>
                        <p className = 'pro'> { profile.status } </p><br/>
                        
                        <p className='pro'><b>Education: </b>{ profile.education }</p><br />
                        <p className='pro'><b> Topic of intrest:  </b>
                        {
                            profile.knowsAbout.join(" | ")
                        }
                        </p><br/>
                        <hr/><br/>
                        <p className='pro'><b>About Me  </b> <br/><br/>{ profile.bio }</p><br />

                    </Fragment>
                    )
                    }
                </div>
                    <Modal isOpen = { profileModal } onRequestClose = { () => setProfileModal(false)} >
                        <h2> Create Profile </h2>
                        <form onSubmit = {(e) => submitProfileData(e)}>
                        <div className = "form-group-2">
                            <label className = "label"> Education </label><br/>
                            <input type = "text" value = {education} name='education' placeholder = "college, degree type etc..." onChange = { (e) => onChangeProfile(e)} required/>
                        </div>
                        <div className = "form-group-2">
                            <label className = "label"> Add Topic of Intrest: </label><br/>
                            <input type = "text" value = {knowsAbout} name='knowsAbout' placeholder = "Topic of Intrest..." onChange = { (e) => onChangeProfile(e)} required/>
                            <p className = 'msg-2'><small> PLEASE SEPERATE SKILLS BY COMMAS </small></p>
                        </div>
                        <div className = "form-group-2">
                            <label className = "label"> Address: </label><br/>
                            <input type = "text" value = {location} name='location' placeholder = "Address..." onChange = { (e) => onChangeProfile(e)} required/>
                        </div>
                        <div className = "form-group-2">
                            <label className = "label"> status: </label><br/>
                            <input type = "text" value = {status} name='status' placeholder = "status..." onChange = { (e) => onChangeProfile(e)} required/>
                        </div>
                        <div className = "form-group-2">
                            <label className = "label"> About you: </label><br/>
                            <input type = "text" value = {bio} name='bio' placeholder = "About you..." onChange = { (e) => onChangeProfile(e)} required/>
                        </div>
                        <div className = "form-group-2">
                            <button type = "submit" className = 'auth-btn-modal'> Submit </button>
                        </div>  
                        </form>
                   </Modal> 
                   <Modal isOpen = { questionModal } onRequestClose = { () => setQuestionModal(false)}>
                        <h2> Ask Question </h2>
                        <form onSubmit = { (e) => submitNewQuestion(e)}>
                        <div className = "form-group-2">
                          <label className = "label"> Question </label><br/>
                          <input value = {question} type = "text" name='question' placeholder = "write question here..." onChange = { (e) => onChangeQuestion(e)} required/>
                        </div>
                        <div className = "form-group-2">
                          <label className = "label"> Add Topic: </label><br/>
                          <input value = {tags} type = "text" name='tags' placeholder = "Topic..." onChange = { (e) => onChangeQuestion(e)} required/>
                        </div>
                        <div className = "form-group-2">
                          <button type = "submit" className = 'auth-btn-modal'> Submit </button>
                        </div> 
                        </form>
                   </Modal> 
                </div>
            ): <Spinner/>
         }
        </Fragment>
    )
}

Home.protoTypes = {
    auth:PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    console.log('questionId');
    return {
        auth: state.auth,
        profile: state.profile,
        questAdded: state.questions.question
    }
}

export default connect(mapStateToProps, { getCurrentProfile, createProfile, postThisQuestion })(Home);
