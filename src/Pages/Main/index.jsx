import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, SubmitButton, ButtonClear, MessageError, List, DeleteRepo } from "./styles";
import { FaGithub, FaPlus, FaBroom, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Buscando do localStorage
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos')

        if(repoStorage) {
            setRepositorios(JSON.parse(repoStorage))
        }
    }, [])

    // Salvando no localStorage
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        const submit = async () => {
            setLoading(true)
            setAlert(null)
            // a URL da api está dentro da pasta services 
            // dendro está o axios com essa url
            try {
                if(newRepo === '') {
                    throw new Error('Você precisa indicar um repositório.')
                }

                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo)

                if(hasRepo) {
                    throw new Error('Esse repositório já existe na sua lista.')
                }

                console.log(response.data)
        
                const data = {
                    name: response.data.full_name,
                }

                setRepositorios([...repositorios, data])
                
            }catch(error) {
                console.log(error)
                setAlert(error)
            }finally {
                setLoading(false)
            }
        }

        submit();

    }, [newRepo, repositorios])

    const handleInputChange = (e) => {
        setNewRepo(e.target.value)
        setAlert(null)
    }

    const handleClear = () => {
        setNewRepo('')
        setAlert(null)
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)

        setRepositorios(find);
        
    }, [repositorios])
  
    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input type="text" 
                    placeholder="Adicionar repositório. Exemplo: facebook/react"
                    value={newRepo}
                    onChange={handleInputChange}
                />

                <ButtonClear onClick={handleClear}>
                    <FaBroom size={14} />
                </ButtonClear>

                <SubmitButton loading={loading ? 1 : 0}>
                    {
                        loading ? (
                            <FaSpinner color="#FFF" size={14}/>
                        ):
                        (<FaPlus color="#FFF" size={14} />)
                    }
                </SubmitButton>
            </Form>
            {
                alert && (
                    <MessageError>
                        Tente novamente.
                        {Error}
                        
                    </MessageError>
                )
            }

            <List>
                {
                    repositorios.map(repo => (
                        <li key={repo.name}>
                            <span>
                                <DeleteRepo onClick={() => handleDelete(repo.name)}>
                                    <FaTrash size={14}/>
                                </DeleteRepo>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))
                }
            </List>
        </Container>
    )
}