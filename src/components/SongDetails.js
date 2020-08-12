import React from 'react';

class SongDetails extends React.Component {

    calculateDuration = (duration) => {
        const mins = Math.floor(duration / 60);
        const sec = duration % 60;

        return ('' + mins + ':' + (sec < 10 ? ('0' + sec) : sec));
    };

    handleBackgroundClose = (event) => {
        const modal = document.getElementById('myModal');
        if (event.target === modal) {
            this.props.handleClose();
        }
    };

    render() {

        const { handleClose, show, data } = this.props;
        const showHideClassName = show ? 'show-modal' : 'hide-modal';

        return (
            <div className={showHideClassName}>
                <div id="myModal" className="modal" onClick={this.handleBackgroundClose}>
                    <div className="modal-content">
                        <span className="close"  onClick={handleClose}>&times;</span>
                        <h1 className="title-font">Song's Details</h1>
                        <div>
                            <div>
                                <p>Position: {data.position}</p>
                                <p>Title: {data.title}</p>
                                <p>Artist: {data.artistName}</p>
                                <p>Duration: {this.calculateDuration(data.duration)}</p>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        );
    }
}

export default SongDetails;