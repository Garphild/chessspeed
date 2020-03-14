(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){},11:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(2),r=(a(10),a(3)),i=a.n(r),c=a(4),o=a.n(c);let m="",h=[];class u extends n.a.Component{constructor(){super(),this.game=new o.a,this.gameMoves=[],this.state={currentMove:0,position:"start",currentGame:0,headers:{},paused:!1,movePause:300,pauseAfterGame:5e3,collectionsList:[]},this.loadRemoteGames=e=>{const t="http://".concat(window.location.hostname,"/collections/getFile/").concat(e);fetch(t,{method:"GET",mode:"cors",credentials:"include"}).then(e=>e.text()).then(e=>{m=e,h=m.split(/\n\n\[/g).map(e=>"["===e[0]?e:"[".concat(e))}),this.setState({paused:!1})},this.pause=()=>{clearInterval(this.interval),this.interval=null,this.setState({paused:!0})},this.startAgain=()=>{const{movePause:e}=this.state;this.interval=setInterval(this.intervalFunction,e),this.setState({paused:!1})},this.restartInterval=e=>{clearInterval(this.interval),this.interval=setInterval(this.intervalFunction,e)},this.changeInterval=e=>{const{movePause:t}=this.state,a=t+e;this.restartInterval(a),this.setState({movePause:a})},this.slowly=()=>{this.changeInterval(100)},this.quickly=()=>{const{movePause:e}=this.state;e>100&&this.changeInterval(-100)},this.loadGame=()=>{const{currentGame:e}=this.state,t=h[e];if(void 0!==t){this.game.clear(),this.game.load_pgn(t);const e=this.game.history(),a=this.game.header(),s=a.FEN;this.game.clear(),this.game.load(s||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),this.gameMoves=e.map(e=>(this.game.move(e),this.game.fen())),this.setState({headers:a})}},this.loadNextGame=()=>{const{currentGame:e}=this.state;this.setState({currentMove:0,position:"start",currentGame:e+1})},this.intervalFunction=this.intervalFunction.bind(this)}componentDidMount(){const{movePause:e}=this.state;fetch("http://".concat(window.location.hostname,"/collections"),{method:"GET",mode:"cors",credentials:"include"}).then(e=>e.json()).then(e=>{this.setState({collectionsList:e})}),this.interval=setInterval(this.intervalFunction,e),this.loadGame()}componentDidUpdate(e,t){const{currentGame:a}=this.state;t.currentGame!==a&&this.loadGame()}intervalFunction(){const{currentMove:e,movePause:t,pauseAfterGame:a}=this.state;e<this.gameMoves.length?this.setState({currentMove:e+1,position:this.gameMoves[e]}):(clearInterval(this.interval),setTimeout(()=>{this.loadNextGame(),this.interval=setInterval(this.intervalFunction,t)},a))}render(){let e;const{position:t,headers:a,paused:s,movePause:l,currentGame:r,collectionsList:c}=this.state,o=n.a.createElement(i.a,{width:window.innerHeight-20,position:t,transitionDuration:100,boardStyle:{margin:"5px auto"}});switch(a.Result){case"0-1":e="black-border";break;case"1-0":e="green-border";break;case"1/2-1/2":e="yellow-border";break;default:e="no-border"}return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"leftBoard"},n.a.createElement("div",{className:"legend"},"LEGEND:",n.a.createElement("hr",null),n.a.createElement("span",{className:"color-identy black-border"}," "),n.a.createElement("span",{className:"description"},"Black Wins"),n.a.createElement("hr",null),n.a.createElement("span",{className:"color-identy green-border"}," "),n.a.createElement("span",{className:"description"},"White Wins"),n.a.createElement("hr",null),n.a.createElement("span",{className:"color-identy yellow-border"}," "),n.a.createElement("span",{className:"description"},"Draw")),n.a.createElement("ol",null,c.map((e,t)=>n.a.createElement("li",{key:t},n.a.createElement("button",{type:"button",onClick:()=>this.loadRemoteGames(e.file)},e.name)))),n.a.createElement("div",{className:"controls"},n.a.createElement("button",{type:"button",className:"pauseButton",onClick:()=>s?this.startAgain():this.pause()},s?"Go":"Pause"),n.a.createElement("div",{className:"buttonGroup"},n.a.createElement("button",{type:"button",className:"slowlyButton",onClick:this.slowly},"Slowly"),n.a.createElement("button",{type:"button",className:"quicklyButton",onClick:this.quickly,disabled:l<=100},"Quickly")),n.a.createElement("div",{className:"currentSpeed"},"Pause between moves",n.a.createElement("br",null),(l/1e3).toFixed(1)," sec."))),n.a.createElement("div",{className:"centerBoard ".concat(e)},o),n.a.createElement("div",{className:"rightBoard"},"Game ",r," from ",h.length,n.a.createElement("hr",null),"PLAYERS:",n.a.createElement("hr",null),n.a.createElement("span",{className:"color-identy black-border"}," "),n.a.createElement("span",{className:"description"},a.Black),n.a.createElement("br",null),n.a.createElement("span",{className:"description"},"ELO:",a.BlackElo?a.BlackElo:" - "),n.a.createElement("hr",null),n.a.createElement("span",{className:"color-identy white-border"}," "),n.a.createElement("span",{className:"description"},a.White),n.a.createElement("br",null),n.a.createElement("span",{className:"description"},"ELO:",a.BlackElo?a.WhiteElo:" - "),n.a.createElement("hr",null),n.a.createElement("span",{className:"description"},a.Date),n.a.createElement("br",null),n.a.createElement("span",{className:"description"},a.Site," / "," "," ",a.Event," / Round: ",a.Round)))}}var d=u;Object(l.render)(n.a.createElement(d,null),document.getElementById("root"))},5:function(e,t,a){e.exports=a(11)}},[[5,1,2]]]);