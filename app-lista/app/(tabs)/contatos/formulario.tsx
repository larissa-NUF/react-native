import { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addContato, getContatoById, updateContato } from "../../../api/service/contato";
import { router, useGlobalSearchParams } from "expo-router";
import { Contato } from "@/api/model/contato";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function Formulario() {
  const [id, setId] = useState<string | null>(null);
  const [dados, setDados] = useState<Contato>({
    _id: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    foto: "#",
  });

  const local = useGlobalSearchParams();

  const handleObterDados = async (id: string) => {
    try {
      const data = await getContatoById(id);
      setDados(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encontrar o contato.");
    }
  };

  const handleChange = (field: keyof Contato, value: string) => {
    setDados((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {

    if (!dados.nome || !dados.email || !dados.telefone || !dados.endereco) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      if (id) await updateContato(id, dados);
      else await addContato(dados);
      Alert.alert("Sucesso", "Contato " + id ? "editado" : "adicionado" + " com sucesso.");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível " + id ? "editado" : "adicionado" + " o contato.");
    }
  };

  useEffect(() => {
    if(local.id && typeof local.id == "string") {
      setId(local.id);
      handleObterDados(local.id);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={dados.nome}
        onChangeText={(value) => handleChange("nome", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={dados.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={dados.telefone}
        onChangeText={(value) => handleChange("telefone", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={dados.endereco}
        onChangeText={(value) => handleChange("endereco", value)}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  contato: { flexDirection: "row", padding: 10, borderBottomWidth: 1 },
  input: { padding: 20, fontSize: 16, color: "black" },
});