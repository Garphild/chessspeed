import Chessboard from 'chessboardjsx';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class AutomaticBoard extends React.Component {
  render() {
    const { position } = this.props;
    const Board = (props) => <Chessboard position={props.position} />;
    return (
      <Board
        position={position}
      />
    );
  }
}

AutomaticBoard.defaultProps = {
  position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq e3 0 1',
};


AutomaticBoard.propTypes = {
  position: PropTypes.string,
};

export default AutomaticBoard;
