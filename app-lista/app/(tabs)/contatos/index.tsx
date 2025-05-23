import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";

import { Link, useNavigation } from "expo-router";
import { deleteContato, getContatos } from "@/api/service/contato";
import { Contato } from "@/api/model/contato";


export default function ListarContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const carregarContatos = async () => {
    try {
      setLoading(true);
      const data = await getContatos();
      setContatos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContato(id);
      setContatos(contatos.filter((c) => c._id !== id));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o contato.");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarContatos);
    carregarContatos();
    return unsubscribe;
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.contato}>
            {item.foto !== "#" ? (
              <Image source={{ uri: item.foto }} style={styles.foto} />
            ) : (
              <View style={styles.semFoto}>
                <Text>Sem Foto</Text>
              </View>
            )}
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.email}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.endereco}</Text>
              <Button title="Excluir" onPress={() => handleDelete(item._id)} />
              <Button title="Detalhes" onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('detalhes', {id: item._id});
              }} />
              <Button title="Editar" onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('formulario', {id: item._id});
              }} />
            </View>
          </View>
        )}
      />
      <Link href="/contatos/formulario" style={styles.botaoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Contato</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  contato: { flexDirection: "row", padding: 10, borderBottomWidth: 1 },
  foto: { width: 50, height: 50, borderRadius: 25 },
  semFoto: { width: 50, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#ddd", borderRadius: 25 },
  info: { marginLeft: 10 },
  nome: { fontWeight: "bold" },
  botaoAdicionar: { backgroundColor: "blue", padding: 10, marginTop: 20, borderRadius: 5, alignItems: "center" },
  textoBotao: { color: "white", fontSize: 16 },
});
