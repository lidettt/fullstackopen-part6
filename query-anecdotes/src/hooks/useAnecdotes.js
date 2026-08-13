import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import { useNotification } from "./useNotification";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      setNotification(`You created '${newAnecdote.content}'`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    },
    onError: (error) => {
      setNotification(error.message);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      setNotification(`anecdote '${updatedAnecdote.content}' voted`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    handleVote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
