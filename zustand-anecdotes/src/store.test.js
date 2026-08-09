import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
  useSortedAnecdotes,
} from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdotesActions", () => {
  it("initialize loads anecdotes from backend", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toEqual(mockAnecdotes);
  });
});

describe("useSortedAnecdotes", () => {
  const anecdotes = [
    { id: 1, content: "Low votes", votes: 1 },
    { id: 2, content: "High votes", votes: 10 },
    { id: 3, content: "Medium votes", votes: 5 },
  ];

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes, filter: "" });
  });

  it("returns anecdotes sorted by votes, highest first", () => {
    const { result } = renderHook(() => useSortedAnecdotes());
    expect(result.current.map((a) => a.id)).toEqual([2, 3, 1]);
  });
});

describe("useSortedAnecdotes filtering", () => {
  const anecdotes = [
    { id: 1, content: "Want to finish soon", votes: 5 },
    { id: 2, content: "Learning to test Zustand", votes: 10 },
    { id: 3, content: "Learning Zustand", votes: 1 },
  ];

  it("returns only anecdotes matching the filter", () => {
    useAnecdoteStore.setState({ anecdotes, filter: "learn" });

    const { result } = renderHook(() => useSortedAnecdotes());

    expect(result.current).toHaveLength(2);
    expect(result.current.map((a) => a.id)).toEqual([2, 3]);
  });

  it("returns empty array when nothing matches", () => {
    useAnecdoteStore.setState({ anecdotes, filter: "abc" });

    const { result } = renderHook(() => useSortedAnecdotes());

    expect(result.current).toHaveLength(0);
  });
});
