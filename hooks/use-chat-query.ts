import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "classId";
    paramValue: string;
}

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    console.log( queryKey,
    apiUrl,
    paramKey,
    paramValue, "ceck")
    const {isConnected} = useSocket();

     const fetchMessages = async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, {skipNull: true});

        const res = await fetch(url);
        console.log(res.json, "data")
        return res.json()
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: undefined,
        refetchInterval: isConnected ? false : 1000,
    });
    return {
         data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }
}