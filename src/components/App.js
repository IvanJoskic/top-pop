import React from 'react';
import SongDetails from './SongDetails';
import './Modal.css';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            musicData: [],
            sortOption: '',
            show: false,
            data: {},
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

        // ovo je jednako sljedecem:
        this.setState({
            sortOption,
            musicData
        });
        // jednako ka i ovo gore
        // this.setState({
        //     sortOption: sortOption,
        //     musicData: musicData
        // });
        // al npr da sam varijablu nazva drugacije, onda nebi moga ovako skraceno nego bi mora ovako ka sta je donji primjer.
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart')
        .then(response => response.json())
        .then(response => {
            this.setState({
                musicData: response.tracks.data
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

    hideModal() {
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
            {item.title} <span style={{fontSize: 0.75 + 'rem'}}>by</span> {item.artist.name} - {item.duration}
            </li>
        );

        return (
            <div>
                <h1>Most Popular Songs</h1>
                <p>On Deezer</p>
                <hr />
                <form id="form">
                    <label htmlFor="filters">Order by:</label>
                    <select name="filters" value={this.state.sortOption} onChange={this.handleChange}>
                        <option value="">Please select...</option>
                        <option value="duration asc.">duration asc.</option>
                        <option value="duration desc.">duration desc.</option>
                        <option value="position asc.">position asc.</option>
                    </select>
                </form>
                <ul>{displayList}</ul>
                <SongDetails handleClose={this.hideModal} show={this.state.show} data={this.state.data}/>
            </div>
        );
    }
}

export default App;