import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios'

const ChatGPT = () => {
    const [data, setData] = React.useState([])
    const apikey='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'
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions'
    const [textInput, setTextInput] = React.useState('')

    const handleSend = async() => {

        const prompt = textInput
        const response=await axios.post(url,{
            prompt,
            max_tokens: 1024,
            temperature: 0.5,
        },{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        })
       const text=response.data.choices[0].text
         setData([...data, {type:"user","text":textInput}, {type:"bot", "text":text}]) 
         setTextInput('')
    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abhi AI Chat</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
            return (
                <View style={{flexDirection: item.type === 'user' ? 'row-reverse' : 'row', marginBottom: 10}}>

                    <View style={{backgroundColor: item.type === 'user' ? '#fff' : '#000', padding: 7, borderRadius: 7}}>
                        <Text style={{color: item.type === 'user' ? '#000' : '#fff'}}>{item.text}</Text>
                    </View>
                </View>
            )
        }}
      />


      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%',
        alignItems: 'center'
    }}>
      <TextInput
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="Ask me ..."
        style={styles.input}

      />
      <TouchableOpacity onPress={handleSend}>
      <Text
        style={styles.button}
      >Send</Text>
      </TouchableOpacity>
        </View>
             
    </View>
  )
}

export default ChatGPT

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2CDF9',
      alignItems: 'center',
    //   justifyContent: 'center',
    paddingHorizontal: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom:20,
        color: '#FA1E6B',
        
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    button: {
        height: 40,
        backgroundColor: '#FA1E6B',
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
    }
  });
  
  