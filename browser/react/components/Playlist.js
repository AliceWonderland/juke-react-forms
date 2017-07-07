import React, { Component } from 'react';
import Songs from "./Songs";
import axios from 'axios';

export default class Playlist extends Component {
    constructor () {
        super();
        this.state = {
            playlist: {}
        }
    }

    componentDidMount () {

        const playlistId = this.props.match.params.playlistId;

        axios.get(`/api/playlists/${playlistId}`)
            .then(res => res.data)
            .then(playlist => {
                this.setState({ playlist: playlist });
            });

    }

    componentWillReceiveProps (nextProps) {
        console.log("willReceive",nextProps);
        const nextPlaylistId = nextProps.match.params.playlistId;
        const currentPlaylistId = this.props.match.params.playlistId;
        if (nextPlaylistId !== currentPlaylistId) {
            axios.get(`/api/playlists/${nextPlaylistId}`)
                .then(res => res.data)
                .then(playlist => {
                    // playlist.songs = playlist.songs.map(convertSong); // optional, for audio
                    this.setState({ playlist: playlist });
                });
        }
    }

    render(){
        return (
            <div>
                <h3>{ this.state.playlist.name }</h3>
                <Songs songs={this.state.playlist.songs} /> {/** Hooray for reusability! */}
                { this.state.playlist.songs && !this.state.playlist.songs.length && <small>No songs.</small> }
                <hr />
            </div>
        )
    }

}