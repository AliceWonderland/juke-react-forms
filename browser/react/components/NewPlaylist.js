import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class NewPlaylist extends Component{
    constructor(){
        super();
        this.state={
            inputValue:'',
            dirty:false
        };

        this.handleChange = this.handleChange.bind(this); // don't forget this!
        this.handleSubmit = this.handleSubmit.bind(this); // don't forget this!
        this.checkCharLimit = this.checkCharLimit.bind(this); // don't forget this!
    }

    handleChange(e){
        // console.log("pre",e.target.value);
        this.setState({inputValue:e.target.value,dirty:true});
        // this.setState({dirty:true});
    }

    checkCharLimit(){
        if(this.state.inputValue.length>=1 && this.state.inputValue.length<=16){
            return false;
        }
        else{
            return true;
        }
    }


    handleSubmit(e){
        e.preventDefault();
        console.log("onSubmit",this.state.inputValue);
        this.setState({inputValue:''});
    }

    render(){
        console.log("post",this.state.dirty);

        return (
            <div className="well">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input onChange={this.handleChange} className="form-control" type="text" value={this.state.inputValue} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button onClick={this.handleSubmit} type="submit" className="btn btn-success" disabled={this.checkCharLimit()}>Create Playlist</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                {
                    (this.state.dirty && this.checkCharLimit()) ?
                    <div className="alert alert-warning">Please enter a name</div>
                    :
                    ""
                }

            </div>
        )
    }
}