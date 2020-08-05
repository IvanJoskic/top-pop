import React from 'react';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            musicData: [],
            sortOption: 'duration asc.'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            sortOption: event.target.value,
        });

        if(this.state.sortOption === 'duration asc.') {
            this.setState({
                musicData: this.state.musicData.sort((a, b) => {
                    return a.duration - b.duration;
                }),
            });
        } else {
            this.setState({
                musicData: this.state.musicData.sort((a, b) => {
                    return b.duration - a.duration;
                }),
            });
        }
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

    handleClick(itemPosition) {
        alert(this.state.musicData[itemPosition - 1].title);
    }

    render() {
        const dataToDisplay = this.state.musicData;

        const displayList = dataToDisplay.map(item => 
            <li 
                key={item.id}
                onClick={() => { this.handleClick(item.position) }}
            > 
            {item.title} <span style={{fontSize: 0.75 + 'rem'}}>by</span> {item.artist.name}
            </li>
        );

        return (
            <div>
                <label htmlFor="filters">Order by:</label>
                <select name="filters" value={this.state.sortOption} onChange={this.handleChange}>
                    <option value="duration asc.">duration asc.</option>
                    <option value="duration desc.">duration desc.</option>
                </select>
                <ul>{displayList}</ul>
                <div id="modal"></div>
            </div>
        );
    }
}

export default App;