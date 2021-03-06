import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Header, RepositoryInfo, Issues } from "./styles";
import api from "../../services/api";

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    };
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {
        api.get(`repos/${params.repository}`).then((response) => {
            setRepository(response.data);
        });

        api.get(`repos/${params.repository}/issues`).then((response) => {
            setIssues(response.data);
        });

        /*
         Dessa forma os dois serão executados ao mesmo tempo
        async function loadData(): Promise<void> {
            const [repository, issues] = await Promise.all([
                api.get(`repos/${params.repository}`),
                api.get(`repos/${params.repository}/issues`),
            ]);
        }

        loadData();

         Dessa forma os dois são executados juntos
           Se utilizar o await api.get(`repos/${params.repository}`) essa requisição precisará terminar
           para a próxima iniciar
        api.get(`repos/${params.repository}`).then((response) => {
            console.log(response.data);
        });

        api.get(`repos/${params.repository}/issues`).then((response) => {
            console.log(response.data);
        }); */
    }, [params.repository]);

    return (
        <>
            <Header>
                <h1>Icone</h1>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues Abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map((issue) => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
