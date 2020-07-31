import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository(){
        const response = await api.post('/repositories', {
            title:  `Oministack ${Date.now()}`,
            url: "http://gihub.com/mrivereto",
            techs: ["NodeJS", "React"]
        });

        setRepositories([...repositories, response.data]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
            <SafeAreaView style={styles.container}>
            <FlatList
                    data={repositories}
                    keyExtractor={repository => repository.id}
                    renderItem={({item: repository}) => (
                        <Text style={styles.repository}>{repository.title}</Text>
                    )}/>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddRepository}>
                    <Text style={styles.buttonText}>Adicionar repositórios</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },

    repository: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    button: {
      backgroundColor: '#fff',
      margin: 20,
      height: 50,
      borderRadius: 4,
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});