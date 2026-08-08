import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
