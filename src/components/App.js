import React from 'react';
import SongDetails from './SongDetails';
import './Modal.css';
import './Loading.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            musicData: [],
            sortOption: '',
            show: false,
            data: {},
            loading: 'show-loading',
        };

        this.handleChange = this.handleChange.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleChange(event) {
        console.log('On change', event.target.value);

        let {musicData} = this.state;
        const sortOption = event.target.value;

        if (sortOption === 'duration asc.') {
            musicData.sort((a, b) => {
                return a.duration - b.duration;
            });
        } else if (sortOption === 'duration desc.') {
            musicData.sort((a, b) => {
                return b.duration - a.duration;
            });
        } else if (sortOption === 'position asc.') {
            console.log('Inside position sort');
            musicData.sort((a, b) => {
                return a.position - b.position;
            });
        } else {
            // do nothing.
        }

        this.setState({
            sortOption,
            musicData
        });
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart')
        .then(response => response.json())
        .then(response => {
            this.setState({
                musicData: response.tracks.data,
                loading: 'hide-loading',
            });
            console.log(response.tracks.data);

        })
        .catch(err => {console.log(err)});

    }

    handleClick(itemId) {
        
        const dataForModal = this.state.musicData.find(element => element.id === itemId);

        const data = {
            position: dataForModal.position,
            title: dataForModal.title,
            artistName: dataForModal.artist.name,
            duration: dataForModal.duration
        };
        const show = true;

        this.setState({
            show,
            data
        });
    }

    hideModal(event) {
        this.setState({
            show: false,
        });
    }

    render() {
        const dataToDisplay = this.state.musicData;

        const displayList = dataToDisplay.map(item => 
            <li 
                title="Click to see more details."
                key={item.id}
                onClick={() => { this.handleClick(item.id) }}
            > 
            {item.title} <span style={{fontSize: 0.75 + 'rem'}}>by</span> {item.artist.name}
            </li>
        );

        const ShowLoading = (props) => (<div className={props.loading}><div className="loading-center lds-dual-ring"></div></div>);

        return (
            <div className="my-container">
                <h1 className="header title-font">Most Popular Songs</h1>
                <div className="main-content">
                    <span className="subtitle-font">As determined by Deezer users</span>
                    <div className="ui divider"></div>
                    <div className="nav">
                        <span>Showing Top 10</span>
                        <div className="float-right">
                            <label htmlFor="filters">Order by: </label>
                            <select name="filters" value={this.state.sortOption} onChange={this.handleChange}>
                                <option value="">Please select...</option>
                                <option value="duration asc.">duration asc.</option>
                                <option value="duration desc.">duration desc.</option>
                                <option value="position asc.">position asc.</option>
                            </select>
                        </div>
                    </div>
                    <ShowLoading loading={this.state.loading}/>
                    <ol className="list">{displayList}</ol>
                    <SongDetails handleClose={this.hideModal} show={this.state.show} data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default App;