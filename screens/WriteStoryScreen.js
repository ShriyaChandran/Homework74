import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Image, ToastAndroid} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import db from '../config.js';

export default class WriteStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            StoryTitle:'',
            Author:'',
            Story:''
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={Styles.Container}>
                <TextInput 
                style={Styles.TitleInput} placeholder="Title"
                onChangeText={(text)=>{
                    this.setState({
                        StoryTitle:text
                    })
                }}
                value={this.state.StoryTitle}

                >

                </TextInput>
                <TextInput 
                style={Styles.AuthorInput} placeholder="Author"
                onChangeText={(text)=>{
                    this.setState({
                        Author:text
                    })
                }}
                value={this.state.Author}
                >
                    
                </TextInput>
                <TextInput 
                style={Styles.StoryInput} placeholder="Story"
                onChangeText={(text)=>{
                    this.setState({
                        Story:text
                    })
                }}
                value={this.state.Story}
                multiline={true}
                >
                    
                </TextInput>
                <TouchableOpacity style={Styles.SubmitButton}
                onPress={this.UpdateDatabase}
                >
                    <Text style={Styles.ButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

    UpdateDatabase=()=>{
        db.collection('stories').add({
            story_title:this.state.StoryTitle,
            author:this.state.Author,
            story:this.state.Story
        })
        this.setState({
            StoryTitle:'',  
            Author:'',
            Story:''
        })
        ToastAndroid.show('Story submitted successfully', ToastAndroid.SHORT)
    }
}

const Styles= StyleSheet.create({
    TitleInput:{
        align:'center',
        borderWidth:2,
        borderColor:'Black',
        height:40,
        margin:10,
        marginTop:40,
        padding:6
    },
    Container:{
        flex:1,
        backgroundColor:'blue'
    },
    AuthorInput:{
        align:'center',
        borderWidth:2,
        borderColor:'Black',
        height:40,
        margin:10,
        marginTop:40,
        padding:6
    },
    StoryInput:{
        align:'center',
        borderWidth:2,
        borderColor:'Black',
        height:260,
        margin:10,
        marginTop:40,
        padding:6
    },
    SubmitButton:{
        align:'center',
        justifyContent:'center',
        backgroundColor:'pink',
        height:40,
        width:60, 
    },
    ButtonText:{
        fontweight:'bold',
        textAlign:'center',
        color:'black'
    }

})