export class TestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      v: -10
    }

    connector.onEvent((data) => {
      this.setState({v: data});
    })
  }

  render() {
    return <button onClick={() => {
      connector.sendEvent('click');
    }}>
      Hello, {this.state.v}
    </button>;
  }
}
