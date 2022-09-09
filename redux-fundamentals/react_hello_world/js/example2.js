
class Score extends React.Component {
	constructor(props) {
		// Se está sendo usado o extends de um classe base, nesse caso o React.Component, antes que possa chamar 'this.'
		// em um construtor é necessário chamar a super classe antes.

		// super chama o construtor pai, nesse caso, o pai é React.Component
		// assim que deixa o construtor disponível na classe derivada, nesse caso, na classe filha.
		super(props);
		this.state = { score: 0 };

		// faz 'this' ficar disponível ao clilcar
		this.incrementScore = this.incrementScore.bind(this);
		this.decrementSCore = this.decrementSCore.bind(this);
	}

	// como incrementScore não está disponível, podemos usar um método chamado bind, que está disponível em qualquer função
	// que permita passar o valor de 'this'.
	incrementScore() {
		// o React sabe que precisa renderizar a interface quando usa setState
		this.setState({
			score: this.state.score + 1,
		})
	}

	decrementSCore() {
		this.setState({
			score: this.state.score - 1,
		})
	}

	render() {
		return (
			<div>
				<h2>Score board for the {this.props.teamName}</h2>
				<div>
					Score: {this.state.score} <br/>
					<button onClick={this.incrementScore}>+</button>
					<button onClick={this.decrementSCore}>-</button>
				</div>
			</div>
		);
	}
}


var el = document.getElementById('two');
ReactDOM.render(<Score teamName="Tigers" />, el);
