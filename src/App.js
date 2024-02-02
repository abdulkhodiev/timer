import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import pause from "./pause.png";
import stop from "./stop.png";
import refresh from "./refresh.png";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
            isRunning: false,
        };

        this.intervalId = null;
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    handleInputChange = (event) => {
        const minutes = parseInt(event.target.value, 10);
        this.setState({
            minutes,
            totalSeconds: minutes * 60,
        });
    };

    startTimer = () => {
        if (this.state.totalSeconds > 0 && !this.state.isRunning) {
            this.setState({ isRunning: true });
            this.intervalId = setInterval(this.updateTimer, 1000);
        }
    };

    updateTimer = () => {
        const { totalSeconds } = this.state;
        if (totalSeconds > 0) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            this.setState({
                hours,
                minutes,
                seconds,
                totalSeconds: totalSeconds - 1,
            });
        } else {
            this.clearInterval();
        }
    };

    handlePause = () => {
        this.setState({ isRunning: false });
        this.clearInterval();
    };

    handleStop = () => {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
            isRunning: false,
        });
        this.clearInterval();
    };

    handleRefresh = () => {
        this.setState({
            isRunning: false,
            totalSeconds: this.state.minutes * 60,
        });
        this.clearInterval();
    };

    clearInterval = () => {
        clearInterval(this.intervalId);
    };

    render() {
        const { hours, minutes, seconds, isRunning } = this.state;

        return (
            <div className="container mt-5">
                <div className="row d-flex align-items-center">
                    <div className="col-md-6 offset-md-3 text-center d-flex flex-column align-items-center">
                        <input
                            type="number"
                            placeholder="Enter minutes"
                            className="form-control mb-3"
                            onChange={this.handleInputChange}
                        />
                        <button
                            className="btn btn-dark me-2"
                            onClick={this.startTimer}
                        >
                            Start
                        </button>
                        <div className="timer-display my-4">
                            {String(hours).padStart(2, "0")}:
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </div>
                        <div
                            className="btn-group d-flex gap-4 align-items-center"
                            role="group"
                        >
                            <button
                                className="btn btn-secondary"
                                onClick={this.handlePause}
                                disabled={!isRunning}
                            >
                                <img
                                    src={pause}
                                    alt=""
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={this.handleStop}
                            >
                                <img src={stop} alt="" width={36} height={36} />
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={this.handleRefresh}
                            >
                                <img
                                    src={refresh}
                                    alt=""
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;
