import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { View } from '@/components/Themed';

function MonthYear({ fetchData, setRefreshing }: any) {
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  return (
    <View style={styles.container2}>
      <TextInput
        style={[styles.input]}
        placeholder="Selecione o Mês"
        value={mes}
        onChangeText={setMes}
        cursorColor={'red'}
        maxLength={2}
        keyboardType="numeric"
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.input2]}
        placeholder="Selecione o Ano"
        value={ano}
        onChangeText={setAno}
        cursorColor={'red'}
        maxLength={4}
        keyboardType="numeric"
        placeholderTextColor="white"
      />
      <Pressable
        onPress={() => {
          setRefreshing(true);
          fetchData(ano, mes);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#5cacf7' : '#2196F3',
          },
          styles.button,
        ]}
      >
        <Text style={{ color: 'white' }}>Pesquisar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#100C2A',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 90,
    paddingVertical: 8,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 1,
    borderColor: 'black',
    marginLeft: 7,
  },
  input: {
    marginLeft: '1%',
    width: 140,
    paddingLeft: 14,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 100,
    color: 'white',
  },
  input2: {
    marginLeft: '1%',
    width: 140,
    paddingLeft: 14,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 100,
    color: 'white',
  },
});
export default MonthYear;
