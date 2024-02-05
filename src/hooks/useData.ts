import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface GetResponse<T> {
    count: number,
    results: T[]
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps? :any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient.get<GetResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
        .then((res) => {
            setData(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
        });

        return () => controller.abort();
    }, deps ? [...deps] : [])

    return {data, loading, error}

}

export default useData;