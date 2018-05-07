import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import {updateQuestion} from "../api/API";
import {createQuestion} from "../api/API";

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
        number: this.props.number,
            questionStr:this.props.data.questionStr,
            answerType:this.props.data.answerType,
            choiceType:this.props.data.choiceType,
            questionType:this.props.data.questionType,
            options:this.props.data.options,
            surveyId:this.props.data.surveyId,
            visualStyle:this.props.data.visualStyle,
            questionId:this.props.data.questionId,
            editMode : false,
        }
    }
    componentDidMount(){

    }
    deleteQuestion = () =>{
        API.deleteQuestion(this.state.questionId)
            .then((res) => {
                document.getElementsByName("mainDiv")[0].style.visibility = 'hidden';
            });
    }
saveQuestion = () =>{
        if(this.state.questionId === null){
            var self = this.state;
            API.createQuestion(this.state)
                .then((res) => {
                    console.log(res)
                    self.questionId = res.questionId;
                    self.questionStr=res.questionStr;
                        self.answerType=res.answerType;
                        self.choiceType=res.choiceType;
                        self.questionType=res.questionType;
                        self.options=res.options;
                        self.surveyId=res.surveyId;
                        self.visualStyle=res.visualStyle;
                        self.questionId=res.questionId;
                    this.setState(self);
                });
        }
        else{
            var self = this.state;
            API.updateQuestion(this.state)
                .then((res) => {
                    self.questionStr=res.questionStr;
                        self.answerType=res.answerType;
                        self.choiceType=res.choiceType;
                        self.questionType=res.questionType;
                        self.options=res.options;
                        self.surveyId=res.surveyId;
                        self.visualStyle=res.visualStyle;
                        self.questionId=res.questionId;
                        this.setState(self);
                });
        }
}
    editQuestion=() =>{
        var self = this.state;
        self.editMode = true;
        this.setState(self);
    }
    renderQuestionTypeSwitch(param) {
        switch(param) {
            case '0':
                return 'Multiple Choice';
            case 1:
                return 'Yes/No';
            case '2':
                return 'Short Answer';
            case '3':
                return 'Date/Time';
            case '4':
                return 'Star Rating';
            default:
                return '';
        }
    }

    renderChoiceSwitch(param) {
        switch(param) {
            case '0':
                return 'Text';
            case "1":
                return 'Image';
            default:
                return '';
        }
    }

    renderVisualTypeSwitch(param) {
        switch(param) {
            case '0':
                return 'Dropdown';
            case "1":
                return 'Radio';
            case '2':
                return 'Checkbox';
            default:
                return '';
        }
    }
    renderAnswerTypeSwitch(param){
        switch(param) {
            case '0':
                return 'Single';
            case "1":
                return 'Multiple';
            default:
                return '';
        }
    }
    render() {
        return (
            <div id="mainDiv" name="mainDiv">
               {
                    (this.state.questionId === null || this.state.editMode)?
                    <div className="row">
                    <div className="col-md-8 margin-70">
                    <form>
                    <div className="form-group resizedTextbox">
                    <div>
                    <span>
                    Question
                    </span>
                    </div>
                    <input type="text" className="form-control surveyape-input" id="questionStr" aria-describedby="questionStr" placeholder="Question"
                    onChange={(event) => {
                    this.setState({
                        questionStr: event.target.value
                    });
                }}
                    />
                    </div>

                    <div className="form-group resizedTextbox">
                    <div>
                    <span>
                    Question Type
                    </span>
                    </div>
                    <select className="form-control surveyape-input" name="cards"  id="questionType" aria-describedby="Question Type" placeholder="Question Type"
                    onChange={(event) => {
                    this.setState({
                        questionType: event.target.value
                    });
                }}
                    >
                    <option value=""> </option>
                    <option value="0">Multiple Choice</option>
                    <option value="1">Yes/No</option>
                    <option value="2">Short Answer</option>
                    <option value="3">Date/Time</option>
                    <option value="4">Star Rating</option>
                    </select>
                    </div>
                    {
                        (this.state.questionType === "0" ) ?
                            <div>
                                <div className="form-group resizedTextbox">
                                    <div>
                                        <span>
                                        Choice type
                                        </span>
                                    </div>
                                    <select className="form-control surveyape-input" name="cards" id="choiceType"
                                            aria-describedby="Choice Type" placeholder="Choice Type"
                                            onChange={(event) => {
                                                this.setState({
                                                    choiceType: event.target.value
                                                });
                                            }}
                                    >
                                        <option value=""></option>
                                        <option value="0">Text</option>
                                        <option value="1">Image</option>
                                    </select>
                                </div>

                                <div className="form-group resizedTextbox">
                                    <div>
                                        <span>
                                        Answer type
                                        </span>
                                    </div>
                                    <select className="form-control surveyape-input" name="cards" id="answerType"
                                            aria-describedby="Answer Type" placeholder="Answer Type"
                                            onChange={(event) => {
                                                this.setState({
                                                    answerType: event.target.value

                                                });
                                            }}
                                    >
                                        <option value=""></option>
                                        <option value="0">Single</option>
                                        <option value="1">Multiple</option>
                                    </select>
                                </div>

                                <div className="form-group resizedTextbox">
                                    <div>
                                                <span>
                                                Visual style
                                                </span>
                                    </div>
                                    <select className="form-control surveyape-input" name="cards" id="visualStyle"
                                            aria-describedby="Visual style" placeholder="Visual style"
                                            onChange={(event) => {
                                                this.setState({
                                                    visualStyle: event.target.value
                                                });
                                            }}
                                    >
                                        <option value="2">Checkbox</option>
                                        {
                                            (this.state.answerType === "0") ?
                                                <option value="0">Dropdown</option>
                                                : null
                                        }
                                        {
                                            (this.state.answerType === "0") ?
                                                <option value="1">Radio</option>
                                                : null
                                        }
                                    </select>
                                </div>

                                {
                                    (this.state.choiceType === 0) ?
                                        <div>
                                            <input type="text" className="form-control surveyape-input" id="options"
                                                   aria-describedby="Options" placeholder="Options"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           options: event.target.value
                                                       });
                                                   }}
                                            />
                                        </div>
                                        :
                                        <div>
                                            <input type="text" className="form-control surveyape-input" id="options"
                                                   aria-describedby="Options" placeholder="Options"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           options: event.target.value
                                                       });
                                                   }}
                                            />
                                        </div>
                                }

                            </div>
                            : null
                    }
                    </form>
                    </div>
                    <div className="col-md-2 margin-70">
                    <button type="button" className="surveyape-button" id = "saveUsrInfo" onClick={() => this.saveQuestion()}>SAVE</button>
                    </div>
                    </div>
                        :
                        <div className="row margin-70">
                            <div className="col-md-8">
                            <div>
                                <span>
                                    Question :
                                </span>
                                <span>
                                    {this.state.questionStr}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Question Type :
                                </span>
                                <span>
                                    {this.renderQuestionTypeSwitch(this.state.questionType)}
                                   </span>
                            </div>
                            {
                                (this.state.choiceType !== null) ?
                                    <div>
                                <span>
                                   Choice type :
                                </span>
                                        <span>
                                            {this.renderChoiceSwitch(this.state.choiceType)}
                                </span>
                                    </div>:
                                    null
                            }
                            {
                                (this.state.answerType !== null)?
                                    <div>
                                <span>
                                    Answer type :
                                </span>
                                <span>
                                    {this.renderAnswerTypeSwitch(this.state.answerType)}
                                </span>
                            </div>:
                                    null
                            }
                            {
                                (this.state.visualStyle !== null)?
                                    <div>
                                    <span>
                                    Visual style :
                                    </span>
                                    <span>
                                        {this.renderVisualTypeSwitch(this.state.visualStyle)}
                                    </span>
                                    </div>
                                    :null
                            }
                        </div>
                            <div className="col-md-8">
                                <button type="button" className="surveyape-button" id = "editQuestion" onClick={() => this.editQuestion()}>EDIT</button>
                                <button type="button" className="surveyape-button" id = "deleteQuestion" onClick={() => this.deleteQuestion()}>DELETE</button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    //.log(state)
    //return {
       // componentActive: state.all.componentActive
    //}
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({GetComponent: GetComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));
