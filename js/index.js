const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <h1>Hello</h1>
    );
  }
}

ReactDOM.render(
  e(LikeButton),
  document.getElementById('root')
);