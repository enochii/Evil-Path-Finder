class Animal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        animationName: ''
      };
    }
    
    clickHdl() {
      let styleSheet = document.styleSheets[0];
   
      let animationName = `animation${Math.round(Math.random() * 100)}`;
      
      let keyframes =
      `@-webkit-keyframes ${animationName} {
          10% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)} 
          90% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
          100% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
      }`;
   
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      
      this.setState({
        animationName: animationName
      });
    }
    
    render () {
      let style = {
        animationName: this.state.animationName,
        animationTimingFunction: 'ease-in-out',
        animationDuration: '0.6s',
        animationDelay: '0.0s',
        animationIterationCount: 1,
        animationDirection: 'normal',
        animationFillMode: 'forwards'
      };
      
      return (
        <div>
          <button type="button" onClick={this.clickHdl.bind(this)}>Animation!</button>
          <div className="box" style={style}></div>
        </div>
  
      );
    }
  }
  
  React.render(<Animal/>, document.body);