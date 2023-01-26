import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";
import { useState } from "react";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks((prevState) => [newLink, ...prevState]);
    setNewLink("");
  }
  function handleAddTag() {
    setTags((prevState) => [newTag, ...prevState]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }
  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("digite o titulo da nota");
    }

    if (newLink) {
      return alert(
        "Você deixou um link no campo para adicionar , mas não clicou em adicionar. Clique para adicionar ou deixe o campo vasio"
      );
    }

    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar , mas não clicou em adicionar. Clique para adicionar ou deixe o campo vasio"
      );
    }
    if (tags.length === 0 && links.length !== 0) {
      return alert("Adicione uma Tag");
    } else if (links.length === 0 && tags.length !== 0) {
      return alert("Adicione um Link");
    } else if (tags.length === 0 && links.length === 0) {
      return alert("Adicione uma Tag e um Link");
    }

    await api.post("/notes", { title, description, links, tags });
    alert("Nota criada com sucesso");
    navigate("/");
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title={"Voltar"} onClick={handleBack} />
          </header>
          <Input
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={index}
                value={link}
                onClick={() => {
                  handleRemoveLink(link);
                }}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
