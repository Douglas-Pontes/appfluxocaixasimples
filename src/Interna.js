import React, {Component} from 'react';
import{ View, Text, StyleSheet, Button, FlatList } from 'react-native';
import HistoricoItem from './HistoricoItem';
import firebase	from './FirebaseConnection';

export default class Interna extends Component{
	static navigationOptions = {
		title:"Home",
		header:null
}

constructor(props){
	super(props);
	this.state = {
		saldo:0,
		historico:[]
	};
	this.addReceita = this.addReceita.bind(this);
	this.addDespesa	= this.addDespesa.bind(this);
	this.sair = this.sair.bind(this);

	firebase.auth().onAuthStateChanged((user)=>{
		if(user){
			firebase.database().ref('users').child(user.uid).on('value', (snapshot)=>{

				let state = this.state;
				state.saldo = snapshot.val().saldo;
				this.setState(state);

			});

			//Pega os dados de historico do usuario logado e armazena no array historico no state
			firebase.database().ref('historico').child(user.uid).on('value', (snapshot)=>{
				let state = this.state;
				state.historico = [];

				//Pega todos pelo snapshot e da o push no state
				snapshot.forEach((childItem)=>{
					state.historico.push({
						key:childItem.key,
						type:childItem.val().type,
						valor:childItem.val().valor
					});
				});
				this.setState(state);
			});

		}else{
			this.props.navigation.navigate('Home');		}
	});
}
addReceita(){
	this.props.navigation.navigate('addReceita');
}

addDespesa(){
	this.props.navigation.navigate('addDespesa');
}

sair(){
	firebase.auth().signOut();
}
render(){
	return(
	<View style={styles.container}>
		<View style={styles.saldoArea}>
				<Text style={styles.saldo}>Saldo: R$ {this.state.saldo.toFixed(2)}</Text>
		</View>
			<FlatList
			style={styles.historico}
			data={this.state.historico}
			renderItem={({item})=><HistoricoItem data={item} /> }
			/>
			<View style={styles.botoesArea}>
				<Button title="+ Receita" onPress={this.addReceita} />
				<Button title="+ Despesa" onPress={this.addDespesa} />
				<Button title="Sair" onPress={this.sair} />
			</View>
	</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	saldoArea:{
		paddingTop:30,
		paddingBottom:20,
		backgroundColor:'#DDDDDD'
	},
	saldo:{
		textAlign:'center',
		fontSize:25
	},
	historico:{
		flex:1
	},
	botoesArea:{
		flexDirection:'row',
		justifyContent:'space-around',
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#DDDDDD'
	}

})