import React, { useEffect, useState } from "react";
import { Container, Owner, Loading, IssuesList, PageActions, FilterList, NavigateBack } from "./styles";
import { FaAngleRight, FaAngleLeft, FaCircleNotch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Repositorio() {

    const [novoRepositorio, setNovoRepositorio] = useState();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false}
    ]);
    const [filterIndex, setFilterIndex] = useState(0);

    const navigate = useNavigate();

    const { repositorio } = useParams();

    useEffect(() => {
        const load = async () => {
            const nomeRepo = repositorio;
            const [repositoriosData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ]);

            setNovoRepositorio(repositoriosData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }
        load();

    }, [repositorio]);

    useEffect(() => {
        const loadIssue = async () => {
            const nomeRepo = repositorio;

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5
                }
            })

            setLoadPage(false)
            setIssues(response.data)
        }
        loadIssue()
        setLoadPage(true)
    }, [novoRepositorio, page, filters, filterIndex])

    const handlePage = (action) => {
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    const handleFilter = (index) => {
        setFilterIndex(index)
    }

    if(loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <Owner>
                <img src={novoRepositorio.owner.avatar_url} alt={novoRepositorio.owner.login} />
                <h1>{novoRepositorio.name}</h1>
                <p>{novoRepositorio.description}</p>
            </Owner>
            <NavigateBack type="button" onClick={() => navigate(-1)}>
                <FaAngleLeft size={25} color="#fff" />
                Home
            </NavigateBack>
            <FilterList active={filterIndex}>
                {
                    filters.map((filter, index) => (
                        <button
                            type="button"
                            key={filter.label}
                            onClick={() => {handleFilter(index)}}
                        >
                            {filter.label}
                        </button>
                    ))
                }
            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <strong>
                                <a href={issue.html_url} target="_blank" rel="noopener">{issue.title}</a>
                                {
                                    issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))
                                }
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>
            <PageActions>
                <button 
                    type="button" 
                    onClick={() => handlePage('back')}
                    disabled={page < 2}
                >
                    <FaAngleLeft />
                   {' '} Voltar
                </button>
                <button type="button" onClick={() => handlePage('next')}>
                    Próximo{' '}
                    {loadPage ? <FaCircleNotch className="loading-circle" />: <FaAngleRight />}
                </button>
            </PageActions>
        </Container>    
    )
}