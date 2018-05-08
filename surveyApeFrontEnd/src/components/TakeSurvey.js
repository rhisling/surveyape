import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import ResponseComponent from "./ResponseComponent";

class TakeSurvey extends Component {
    constructor(props){
        var surveyIdTemp = null;
        var accessCodeTemp = null;
        if(props.location.pathname.indexOf("survey") > 0){
            var loc = props.location.pathname;
            var temp = loc.substr(loc.indexOf("y")+2);
            var a = temp.split("/");
            surveyIdTemp = a[0];
            accessCodeTemp = a[1];
        }
        super(props);
        this.state = {
            surveyDetails:null,
            surveyId:surveyIdTemp,
            accessCode:accessCodeTemp
        }
    }
    componentWillMount(){
        var self = this.state;
        API.getSurvey(this.state.surveyId)
            .then((res) => {
                self.surveyDetails=res;
                this.setState(self);
                if(res.surveyType === 1 && !this.state.accessCode){
                    alert("NO ACCESS RIGHTS")
                    this.props.history.push("/");
                    }
            });
    }

    render() {
        var questionList = [];
        if(this.state.surveyDetails){
        var data = this.state.surveyDetails.questions;
        if(data && data.length > 0) {
            data.map(function (temp, index) {
                temp.surveyId = this.state.surveyId;
                questionList.push(
                    <ResponseComponent data={temp} number={index}/>
                );
            }, this);
        }
        }
        return (
            <div>
                Take Survey {this.state.surveyId} | {this.state.accessCode}
               |  Survey Name:
                {
                    (this.state.surveyDetails)?
                        this.state.surveyDetails.surveyName:null
                }
                <div>
                    {questionList}
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TakeSurvey));
