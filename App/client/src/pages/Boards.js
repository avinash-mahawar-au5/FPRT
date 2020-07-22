import React, { Component } from "react";
import Navbar from "../components/Navbar";

import Backdrop from "../components/Backdrop";
import { addBoard } from "../actions/boardActions";
import { getAllBoards } from "../actions/listActions";
import "../styles/Boards.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
class Boards extends Component {
  state = {
    newBoardTitle: "",
    isNewBoardTitleInEdit: false,
  };
  onAddBoardHandler = () => {
    this.setState({ isNewBoardTitleInEdit: true });
  };

  onBoardTitleChangeHandler = (e) => {
    this.setState({ newBoardTitle: e.target.value });
  };
  onBoardTitleOutsideClicked = () => {
    this.setState({ isNewBoardTitleInEdit: false });
  };
  onKeyDownAddBoardTitleHandler = (e) => {
    if (e.keyCode === 13) {
      this.onBoardTitleChangeHandler(e);
      this.onBoardTitleOutsideClicked();
      this.props.addBoard(this.state.newBoardTitle, this.props.history);
      this.setState({ newBoardTitle: "" });
    }
  };

  componentDidMount() {
    this.props.getAllBoards();
  }

  boardWrapper = () => {
    if (this.state.isNewBoardTitleInEdit) {
      return (
        <textarea
          ref={this.myRef}
          value={this.state.newBoardTitle}
          placeholder={"add a board title"}
          autoFocus
          onChange={this.onBoardTitleChangeHandler}
          className="add_board__input"
          onKeyDown={this.onKeyDownAddBoardTitleHandler}
        />
      );
    } else {
      return (
        <p className="board__item" onClick={this.onAddBoardHandler}>
          <span className="board__item__title">Add a board</span>
        </p>
      );
    }
  };
  render() {
    const { boards } = this.props;
    let boardList = <p>Not yet retrieved</p>;
    if (boards) {
      if (boards.length > 0) {
        boardList = boards.map((board, index) => (
          <Link
            key={board._id}
            to={`/boards/${board._id}`}
            className="board__item"
          >
            {board.title}
          </Link>
        ));
      } else {
        boardList = (
          <React.Fragment>
            <h3 className="board__empty__title">No boards were created</h3>
          </React.Fragment>
        );
      }
    }
    return (
      <div className="row board m-0">
        <div className="row m-0">
          <div className="col navcol">
            <div className="navbarr row m-0">ger</div>
          </div>
        </div>

        <div className="row m-0">
          <div className="row m-0 board">
            {boardList}
            <Backdrop clickedOutside={this.onBoardTitleOutsideClicked}>
              {this.boardWrapper()}
            </Backdrop>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => {
  console.log(state);
  return {
    boards: state.boards,
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({ addBoard, getAllBoards }, dispatch);
};
export default connect(stateToProps, dispatchToProps)(Boards);
