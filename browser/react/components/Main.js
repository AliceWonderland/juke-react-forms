import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import Playlist from './Playlist';

export default class Main extends Component {
  constructor(){
    super();
    this.state={playlists:[]};

      this.addPlaylist = this.addPlaylist.bind(this);
      this.fetchPlaylistByid = this.fetchPlaylistByid.bind(this);
  }

  componentDidMount(){
      axios.get('/api/playlists')
          .then(res=>{
            return res.data;
          })
          .then(playlists=>{
              this.setState({playlists:playlists});
          });

      // this.fetchPlaylistById(playlistId);
  }




  addPlaylist (playlistName) {
      axios.post('/api/playlists', { name: playlistName })
          .then(res => res.data)
          .then(playlist => {
              this.setState({
                  playlists: [...this.state.playlists, playlist]
              });
          });
  }

  fetchPlaylistByid (playlistId) {
      axios.get(`/api/playlists/${playlistId}`)
          .then(res => res.data)
          .then(playlist => {
              playlist.songs = playlist.songs.map(convertSong); // optional
              this.setState({ playlist: playlist });
          });
  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={this.addPlaylist}/>} />
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
