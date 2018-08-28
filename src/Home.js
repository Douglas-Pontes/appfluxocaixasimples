import React, {Component} from 'react';
import{ View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import firebase from './FirebaseConnection';

export default class Home extends Component{
	static navigationOptions = {
		title:null,
		header:null
}
constructor(props){
	super(props);
	this.state = {
		saldototal:''
	};

	this.cadastrar = this.cadastrar.bind(this);
	this.login = this.login.bind(this);

}

cadastrar(){
	this.props.navigation.navigate('Cadastro');
}
login(){
	this.props.navigation.navigate('Login');
}



render(){
	return(
	<ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg}>
		<View style={styles.container}>
			<Text style={styles.title}>Fluxo de Caixa</Text>
			<View style={styles.buttonArea}>
				<TouchableHighlight style={styles.button} onPress={this.cadastrar}>
					<Text style={styles.btnTxt}>Cadastrar</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.button} onPress={this.login}>
					<Text style={styles.btnTxt}>Login</Text>
				</TouchableHighlight>
			</View>
		</View>
	</ImageBackground>
	);
	
	}
}

const styles = StyleSheet.create({
	bg:{
		flex:1,
		width:null
	},
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	title:{
		fontSize:30,
		backgroundColor:'transparent'
	},
	buttonArea:{
		marginTop:30
	},
	button:{
		backgroundColor:'#bfb300',
		margin:10,
		height:40,
		width:200,
		justifyContent:'center'
	},
	btnTxt:{
		color:'#FFFFFF',
		textAlign:'center'
	}
})