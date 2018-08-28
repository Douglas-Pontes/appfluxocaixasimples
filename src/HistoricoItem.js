import React, {Component} from 'react';	
import{ View, Text, StyleSheet, Button, TextInput } from 'react-native';
import firebase	from './FirebaseConnection';

export default class HistoricoItem extends Component{
	constructor(props){
		super(props);
		let bg = '#00FF00';
		let text ='#000000';
		if(this.props.data.type == 'Despesa'){
			bg = '#FF0000';
			text = '#FFFFFF'
		}

		this.state = {
			bg:bg,
			text:text
		};
	}
	render(){
		return(
			<View style={[styles.area, {backgroundColor:this.state.bg}]}>
				<Text style={{color:this.state.text}}>{this.props.data.type}</Text>
				<Text style={{color:this.state.text}}>R$ {this.props.data.valor}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	area:{
		height:40,
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		paddingLeft:30,
		paddingRight:30,
		justifyContent:'space-between',
		backgroundColor:'#FFFFFF'
	}
});