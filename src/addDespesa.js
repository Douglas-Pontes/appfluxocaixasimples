import React, {Component} from 'react';	
import{ View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import HistoricoItem from './HistoricoItem';
import firebase	from './FirebaseConnection';

export default class addDespesa extends Component{
	static navigationOptions = {
		title:"Adicionar Despesa",
		
}

constructor(props){
	super(props);
	this.state = {
		valor:''
	};
	this.retirar = this.retirar.bind(this);
}

retirar(){
	if(this.state.valor != ''){
		//Pegando uid
		let uid = firebase.auth().currentUser.uid;
		
		let user = firebase.database().ref('users').child(uid);
		//Adicionando no histórico uma chave
		let key = firebase.database().ref('historico').child(uid).push().key;
		//Pegando a chave e setando a receita a ela
		firebase.database().ref('historico').child(uid).child(key).set({
			type:'Despesa',
			valor:this.state.valor
		});
		//Pega o valor em usuário e altera o saldo
		user.once('value')
		.then((snapshot)=>{
			let saldo = parseFloat(snapshot.val().saldo);
			saldo -= parseFloat(this.state.valor);

			user.set({
				saldo:saldo
			});
			this.props.navigation.goBack();
		});
	}

}

render(){
	return(
	<View style={styles.container}>
		<Text>Quanto você deseja retirar?</Text>
		<TextInput
			style={styles.input}
			keyboardType="numeric"
			value={this.state.valor}
			onChangeText={(valor)=>this.setState({valor})}
			autoFocus={true}
		/>
		<Button title="Retirar" onPress={this.retirar} />
	</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:10
	},
	input:{
		height:40,
		marginTop:20
	}

})