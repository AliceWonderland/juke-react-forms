import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class NewPlaylist extends Component{
    constructor(){
        super();
        this.state={
            inputValue:''
        };

        this.handleChange = this.handleChange.bind(this); // don't forget this!
        this.handleSubmit = this.handleSubmit.bind(this); // don't forget this!
    }

    handleChange(e){
        this.setState({inputValue:e.target.value});
    }


    handleSubmit(e){
        e.preventDefault();
        console.log("onSubmit",this.state.inputValue);
    }


    render(){
        return (
            <div className="well">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input onChange={this.handleChange} className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-success">Create Playlist</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}