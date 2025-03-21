import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSubmit = async () => {
    if (!nome || !email || !telefone || !endereco) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      //await addContato({ nome, email, telefone, endereco, foto: "#" });
      Alert.alert("Sucesso", "Contato adicionado!");
      //router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o contato.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  contato: { flexDirection: "row", padding: 10, borderBottomWidth: 1 },
  input: { padding: 20, fontSize: 16, color: "black",},
});