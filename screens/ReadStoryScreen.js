import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Image, ScrollView, FlatList} from 'react-native';
import * as Permissions from 'expo-permissions';
import {SearchBar} from 'react-native-elements';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import db from '../config.js';

export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories:[],
            search:'',
            dataSource:[]        }
    }

    componentDidMount(){
       this.RetrieveStories(); 
    }

    RetrieveStories=()=>{
        try{
            var allStories= [],
            var stories= db.collection('stories').get().then((queriesSnapshot)=>
            {
                queriesSnapshot.forEach((doc)=>
                {
                    allStories.push(doc.data())
                })
                this.setState({
                    allStories
                })
            })
            
        }
        catch(error){
            console.log(error)
        }
    }

    UpdateSearch= search=>{
        this.setState({
            search
        })
    }
    SearchFilter(text){
        var NewData= this.state.allStories.filter((item)=>{
            var itemData=item.Title?item.Title.toUpperCase():''.toUpperCase()
            var textData=text.toUpperCase()
            return itemData.indexOf(textData)>-1
        })
        this.setState({
            dataSource:NewData,
            search:text
        })
    }
    render(){
        return(
            <View style={Styles.Container}>
                <View>
                    <SearchBar 
                    placeholder="Search titles" 
                    onChangeText={text=>this.SearchFilter(text)}
                    onClear={text=>this.SearchFilter('')}
                    value={this.state.search}
                    />
                </View>
                <FlatList style={Styles.itemContainer}>
                    data={this.state.search===''?this.state.allStories:this.state.dataSource}
                    renderItem={({item})=>(
                        <View style={Styles.itemContainer}>
                            <Text style={Styles.Title }>
                                Title:{item.Title}
                            </Text>
                            <Text>
                                Author:{item.Author}
                            </Text>


                        </View>
                    )}
                     keyExtractor={(item,index)=>index.toString()}
                </FlatList>
            </View>
        )
    }
}

const Styles= StyleSheet.create({
    itemContainer:{
        flex:1,
        align:'center',
        height:80,
        width:'100%',
        borderWidth:2,
        borderColor:'black',
        justifyContent:'center'
    },
    Container:{
        flex:1,
        align:'center',
        backgroundColor:'green'
    },
    Item:{
        align:'center',
        backgroundColor:'white',
        padding:20,
        marginHorizontal:16,
        marginVertical:8

    },
    Title:{
        align:'center',
        fontSize:26,
        fontWeight:'bold'
    }
})